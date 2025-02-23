// 获取全局变量
export function getGlobal(): Window {
	return window as unknown as Window
}
const _global = getGlobal()

export { _global }
