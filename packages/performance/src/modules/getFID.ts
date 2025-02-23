import { Callback } from '@web-monitor/types'
export function getFID(callback: Callback): void {
	const entryHandler = (entryList: any) => {
		for (const entry of entryList.getEntries()) {
			observer.disconnect()
			const value = entry.processingStart - entry.startTime
			callback({
				name: 'FID',
				value,
				rating: value > 100 ? 'poor' : 'good'
			})
		}
	}
	const observer = new PerformanceObserver(entryHandler)
	observer.observe({ type: 'first-input', buffered: true })
}
