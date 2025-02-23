// 判断资源是否来自缓存
export function isCache(entry: PerformanceResourceTiming): boolean {
	return entry.transferSize === 0 || (entry.transferSize !== 0 && entry.encodedBodySize === 0)
}
// TODO: 是否需要判断页面全部加载完毕后获取资源
export function getResource(): PerformanceResourceTiming[] {
	const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
	// 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon
	let resourceList = entries.filter((entry) => {
		return ['fetch', 'xmlhttprequest', 'beacon'].indexOf(entry.initiatorType) === -1
	})

	if (resourceList.length) {
		resourceList = JSON.parse(JSON.stringify(resourceList))
		resourceList.forEach((entry: any) => {
			entry.isCache = isCache(entry)
		})
	}
	return resourceList
}
