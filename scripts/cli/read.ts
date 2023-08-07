import * as fs from "fs-extra";
import { handleDependency } from "./handle";
import { Dependency } from "../utils";

function readPackageJson(paths: string) {
  return fs.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function getPackageDependency(paths: string) {
  try {
    const packageData = readPackageJson(paths);
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
    // if (item.getDependenciesByPath(localModulesPath).length === 0) {
    //   // 查找 pnpm 目录下

    //   dependencies.push(
    //     ...getModuleJSON(
    //       readPackageDependency(
    //         process.cwd() +
    //           "/.pnpm/" +
    //           item.name +
    //           item.version.replace(/\^/g, "@")
    //       ),
    //       localModulesPath + item.name
    //     )
    //   );
    // }
    dependencies.push(...item.getDependenciesByPath(localModulesPath));
    item.setDependencyCid(dependencies, target);
  });
  return new Set([...packageDependencies, ...dependencies]);
}
