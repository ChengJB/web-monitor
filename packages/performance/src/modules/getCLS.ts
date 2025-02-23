import { Callback } from '@web-monitor/types'
export function getCLS(callback: Callback): void {
	let clsValue = 0
	// let clsEntries = [];

	let sessionValue = 0
	let sessionEntries: any[] = []

	const entryHandler = (entryList: any) => {
		for (const entry of entryList.getEntries()) {
			// 确保只计算那些没有与用户输入相关联的布局偏移。这是因为如果一个布局偏移与用户输入相关（例如点击按钮），它不应当计入 CLS，因为这种情况不影响用户体验的流畅度
			if (!entry.hadRecentInput) {
				const firstSessionEntry = sessionEntries[0]
				const lastSessionEntry = sessionEntries[sessionEntries.length - 1]
				// 如果条目与上一条目的相隔时间小于 1 秒且
				// 与会话中第一个条目的相隔时间小于 5 秒，那么将条目
				// 包含在当前会话中。否则，开始一个新会话
				if (
					sessionValue &&
					entry.startTime - lastSessionEntry.startTime < 1000 &&
					entry.startTime - firstSessionEntry.startTime < 5000
				) {
					sessionValue += entry.value
					sessionEntries.push(entry)
				} else {
					sessionValue = entry.value
					sessionEntries = [entry]
				}

				// 如果当前会话值大于当前 CLS 值，
				// 那么更新 CLS 及其相关条目。
				if (sessionValue > clsValue) {
					clsValue = sessionValue
					// clsEntries = sessionEntries;
					observer.disconnect()

					callback({
						name: 'CLS',
						value: clsValue,
						rating: clsValue > 2500 ? 'poor' : 'good'
					})
				}
			}
		}
	}

	const observer = new PerformanceObserver(entryHandler)
	observer.observe({ type: 'layout-shift', buffered: true })
}
