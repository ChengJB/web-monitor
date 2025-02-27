import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals'
import { Callback } from '@web-monitor/types'
import { getCLS } from './getCLS'
import { getFID } from './getFID'
import { getFCP } from './getFCP'
import { getLCP } from './getLCP'
import { getTTFB } from './getTTFB'
import { getFirstScreenPaint } from './getFSP'
// 导出一个函数，用于判断当前浏览器是否为Safari
export function isSafari(): boolean {
	// 使用正则表达式判断用户代理字符串中是否包含"Safari"，并且不包含"Chrome"
	return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}

export function getWebVitals(callback: Callback): void {
	// web-vitals 不兼容safari浏览器
	if (isSafari()) {
		getFID((res) => {
			callback(res)
		})
		getFCP((res) => {
			callback(res)
		})
		getLCP((res) => {
			callback(res)
		})
		getCLS((res) => {
			callback(res)
		})
		getTTFB((res) => {
			callback(res)
		})
	} else {
		onLCP((res) => {
			callback(res)
		})
		onFID((res) => {
			callback(res)
		})
		onCLS((res) => {
			callback(res)
		})
		onFCP((res) => {
			callback(res)
		})
		onTTFB((res) => {
			callback(res)
		})
	}

	// 首屏加载时间
	getFirstScreenPaint((res) => {
		const data = {
			name: 'FSP',
			value: res,
			rating: res > 2500 ? 'poor' : 'good'
		}
		callback(data)
	})
}
