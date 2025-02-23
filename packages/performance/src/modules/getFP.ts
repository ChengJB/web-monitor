import { Callback } from '@web-monitor/types'
export function getFP(callback: Callback): void {
	// 定义一个函数entryHandler，参数为list
	const entryHandler = (list: any) => {
		// 遍历list中的所有entry
		for (const entry of list.getEntries()) {
			// 如果entry的name为'first-contentful-paint'
			if (entry.name === 'first-paint') {
				// 断开observer
				observer.disconnect()
				// 调用callback函数，传入参数为一个对象，包含name、value和rating
				callback({
					name: 'FCP',
					value: entry.startTime,
					rating: entry.startTime > 2500 ? 'poor' : 'good'
				})
			}
		}
	}
	const observer = new PerformanceObserver(entryHandler)
	//buffered: true 表示将所有的性能条目都收集起来，然后一次性处理
	observer.observe({ type: 'paint', buffered: true })
}
