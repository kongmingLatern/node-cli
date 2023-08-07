import * as fs from "fs-extra";
import { handleDependency } from "./handle";
import { Dependency } from "../utils";
import * as path from "path";

export function readPackageJson(paths: string) {
  return fs.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function getPackageDependency(packageData: Record<string, string>) {
  try {
    // const packageData = readPackageJson(paths);
    const { getDependencies } = handleDependency(packageData);
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
function readPackageJsonFiles(directory: string) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      // 如果是文件夹，则递归进入
      readPackageJsonFiles(filePath);
    } else if (file === "package.json") {
      // 如果是 package.json 文件，则读取内容
      try {
        const packageJsonContent = fs.readFileSync(filePath, "utf-8");
        const packageJson = JSON.parse(packageJsonContent);
        console.log(`Found package.json in ${filePath}:`, packageJson.name);
        // return getModuleJSON(getPackageDependency(process.cwd(), )
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
      }
    }
  }
}

// 开始遍历
// readPackageJsonFiles(process.cwd() + "/node_modules/");
