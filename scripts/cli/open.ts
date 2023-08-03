const opn = require('opn')

export async function OpenWindow(url: string) {
	await opn(url)
}
