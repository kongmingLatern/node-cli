import * as fs from "fs-extra";
import * as path from "path";
import { handleDependency } from "./handle";
import { Dependency } from "../utils";

export function readPackageJson(paths: string) {
  return fs.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function getPackageDependency(
  packageData: Record<string, string>,
  filePath?: string
) {
  try {
    const { getDependencies } = handleDependency(packageData, filePath);
    return getDependencies();
  } catch (e) {
    // 如果没有找到文件,说明可能是本地磁盘已经有,存放在 .pnpm 下
    return [];
  }
}
export function getModuleJSON(
  packageDependencies: Array<Dependency>,
  path?: string
): Set<Dependency> {
  const dependencies: Array<Dependency> = [];
  const target: Record<string, string> = {};
  const localModulesPath = path || process.cwd() + "/node_modules/";
  packageDependencies.forEach((item) => {
    dependencies.push(...item.getDependenciesByPath(localModulesPath));
    item.setDependencyCid(dependencies, target);
  });
  return new Set([...packageDependencies, ...dependencies]);
}
const result: Dependency[] = [];
export function readPackageJsonFiles(directory: string) {
  const files = fs
    .readdirSync(directory)
    .filter((i) => !isEntryModule(i) && !isPluginModule(i));

  for (const file of files) {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      // 如果是文件夹，则递归进入
      // console.log("path", filePath);

      readPackageJsonFiles(filePath);
    } else if (file === "package.json") {
      // 如果是 package.json 文件，则读取内容
      try {
        const packageJsonContent = fs.readJSONSync(filePath, "utf-8");
        const dependencies = getPackageDependency(packageJsonContent, filePath);

        result.push(...dependencies);
      } catch (error) {
        return;
      }
    }
  }
  return new Set(result);
}
function isEntryModule(i: string) {
  return i.startsWith(".");
}

function isPluginModule(i: string): unknown {
  return i.startsWith("@");
}
