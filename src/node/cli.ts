#!/usr/bin/env node
/*
 *	- 需要封装为 node 命令行工具；
		- 支持 xx-cli analyze 命令，用于分析从当前目录 package.json 开始递归查找到的全量依赖关系(包名 & 版本号)，分析完成后自动打开网页，并渲染依赖关系图；
 		- 注意处理好循环依赖问题，避免陷入死循环；
 		- 支持 --depth=n 参数，限制向下递归分析的层次深度；
  	- 支持 --json=[file-path] 参数，传入后不再打开网页，只是将依赖关系以 JSON 形式存储到用户指定的文件；
    - 在打开的页面中，除了渲染依赖关系图外，期望对依赖关系做出初步分析，例如：
  	- 是否包含循环依赖；
  	- 同一个 package 是否包含多个版本实例；
 *
 */
import { cac } from "cac";
import { OpenWindow, readPackage, getModules } from "../../scripts/cli";
import { resolve } from "path";

const packagePath = resolve(process.cwd(), "./package.json");

const version = require(packagePath).version;

const cli = cac("node-cli").version(version).help();

cli
  .command("analyze", "analyze dependencies")
  .option("--depth <depth>", "Limit depth", {
    default: null,
  })
  .option("--json <json>", "Limit depth", {
    default: null,
  })
  .action(async ({ depth, json }) => {
    // node-cli analyze --depth=3 --json 2
    if (depth) {
      const arrPackage = readPackage(process.cwd());
      const arrPackages = getModules(arrPackage);
      console.log(arrPackages);
    }
    if (json) {
      console.log("json", json); // Output: json 2
    }
    if (!depth && !json) {
      await OpenWindow("https://www.baidu.com");
      console.log("1", 1);
    }
  });

cli.parse();

export { cli };
