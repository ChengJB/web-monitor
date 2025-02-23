import { Callback } from '@web-monitor/types'
export function getLCP(callback: Callback): void {
	// 定义一个函数entryHandler，参数为list
	const entryHandler = (list: any) => {
		// 遍历list中的所有entry
		for (const entry of list.getEntries()) {
			if (entry.entryType === 'largest-contentful-paint') {
				observer.disconnect()
				callback({
					name: 'LCP',
					value: entry.startTime,
					rating: entry.startTime > 2500 ? 'poor' : 'good'
				})
			}
		}
	}
	const observer = new PerformanceObserver(entryHandler)
	//buffered: true 表示将所有的性能条目都收集起来，然后一次性处理
	observer.observe({ type: 'largest-contentful-paint', buffered: true })
}
