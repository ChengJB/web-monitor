import { Callback } from '@web-monitor/types'
/**
 * 添加事件监听器
 * ../export
 * ../param {{ addEventListener: Function }} target
 * ../param {keyof TotalEventName} eventName
 * ../param {Function} handler
 * ../param {(boolean | Object)} opitons
 * ../returns
 */
export function on(target: any, eventName: string, handler: Callback, opitons = false) {
	target.addEventListener(eventName, handler, opitons)
}
