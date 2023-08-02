import { cac } from 'cac'

const version = require('../package.json').version

const cli = cac('node-cli').version(version).help()

// NOTE: analyze 用于分析从当前目录 package.json 开始递归查找到的全量依赖关系(包名 & 版本号)，分析完成后自动打开网页，并渲染依赖关系图；

cli
	.command('analyze', 'analyze dependencies')
	.action(async () => {
		console.log('analyze')
	})

cli.parse()
