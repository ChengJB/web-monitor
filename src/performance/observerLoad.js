//方式1
// export default function observerLoad() {
//   window.addEventListener('pageshow', (event) => {
//     requestAnimationFrame(()=>{
//       ['load'].forEach((type) => {
//         const _reportData={
//           type:'performance',
//           subType:type,
//           pageUrl:window.location.href,
//           startTime:performance.now()-event.timeStamp
//         }
//       })
//     },true)
//   })
// }

//方式2
export default function observerLoad() {
	// 统一上报函数
	const sendToMonitor = (data) => {
		const url = 'https://your-monitor-api.com/collect'
		const body = JSON.stringify(data)
		// 优先使用 Beacon API
		navigator.sendBeacon?.(url, body) ||
			fetch(url, {
				body,
				method: 'POST',
				keepalive: true
			})
	}

	// 监听 load 事件（直接获取加载时间）
	window.addEventListener('load', () => {
		// 优先使用 PerformanceNavigationTiming
		const navigationEntry = performance.getEntriesByType('navigation')
		let loadTime
		if (navigationEntry) {
			loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime
		} else {
			// 兼容旧版 performance.timing
			loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
		}

		// 上报数据
		sendToMonitor({
			type: 'performance',
			subType: 'load',
			pageUrl: window.location.href,
			startTime: loadTime, // 直接使用计算好的 load 时间
			timestamp: Date.now()
		})
	})

	// 处理 BFCache（前进/后退缓存恢复）
	window.addEventListener('pageshow', (event) => {
		if (event.persisted) {
			// 从缓存恢复时，重新上报关键指标（如 FCP、LCP 等）
			sendToMonitor({
				type: 'performance',
				subType: 'bfcache_restore',
				pageUrl: window.location.href,
				timestamp: Date.now()
			})
		}
	})
}
