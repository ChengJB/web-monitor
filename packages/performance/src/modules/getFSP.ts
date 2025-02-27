import { Callback } from '@web-monitor/types'
import { _global } from '@web-monitor/utils'
// firstScreenPaint为首屏加载时间
let firstScreenPaint = 0
// 页面是否渲染完成
let isOnLoaded = false
let timer: number
let observer: MutationObserver
let entries: any[] = []

// 定时器循环监听dom的变化，当document.readyState === 'complete'时，停止监听
function checkDOMChange(callback: Callback) {
	cancelAnimationFrame(timer)
	timer = requestAnimationFrame(() => {
		if (document.readyState === 'complete') {
			isOnLoaded = true
		}
		if (isOnLoaded) {
			// 取消监听
			observer && observer.disconnect()
			// document.readyState === 'complete'时，计算首屏渲染时间
			firstScreenPaint = getRenderTime()
			entries = []
			callback && callback(firstScreenPaint)
		} else {
			checkDOMChange(callback)
		}
	})
}
function getRenderTime(): number {
	let startTime = 0
	entries.forEach((entry) => {
		if (entry.startTime > startTime) {
			startTime = entry.startTime
		}
	})
	// performance.timing.navigationStart 页面的起始时间
	return startTime - performance.timing.navigationStart
}
const viewportWidth = _global.innerWidth
const viewportHeight = _global.innerHeight
// dom 对象是否在屏幕内
function isInScreen(dom: HTMLElement): boolean {
	const rectInfo = dom.getBoundingClientRect()
	if (rectInfo.left < viewportWidth && rectInfo.top < viewportHeight) {
		return true
	}
	return false
}

// 外部通过callback 拿到首屏加载时间
export function observeFirstScreenPaint(callback: Callback): void {
	const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK']
	observer = new MutationObserver((mutationList: any) => {
		checkDOMChange(callback)
		const entry = { children: [], startTime: 0 }
		for (const mutation of mutationList) {
			if (mutation.addedNodes.length && isInScreen(mutation.target)) {
				for (const node of mutation.addedNodes) {
					// 忽略掉以上标签的变化
					if (node.nodeType === 1 && !ignoreDOMList.includes(node.tagName) && isInScreen(node)) {
						entry.children.push(node as never)
					}
				}
			}
		}

		if (entry.children.length) {
			entries.push(entry)
			entry.startTime = new Date().getTime()
		}
	})
	observer.observe(document, {
		childList: true, // 监听添加或删除子节点
		subtree: true, // 监听整个子树
		characterData: true, // 监听元素的文本是否变化
		attributes: true // 监听元素的属性是否变化
	})
}

export function getFirstScreenPaint(callback: Callback) {
	if ('requestIdleCallback' in _global) {
		requestIdleCallback((deadline) => {
			// timeRemaining：表示当前空闲时间的剩余时间
			if (deadline.timeRemaining() > 0) {
				observeFirstScreenPaint(callback)
			}
		})
	} else {
		observeFirstScreenPaint(callback)
	}
}
