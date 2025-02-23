import { on, _global } from '@web-monitor/utils'
import { Callback } from '@web-monitor/types'
export function getTTFB(callback: Callback): void {
	on(_global, 'load', function () {
		const { responseStart, navigationStart } = _global.performance.timing
		const value = responseStart - navigationStart
		callback({
			name: 'TTFB',
			value,
			rating: value > 100 ? 'poor' : 'good'
		})
	})
}
