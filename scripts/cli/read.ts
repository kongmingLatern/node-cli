import * as fs from "fs-extra";
import { handleDependency } from "./handle";
import { Dependency } from "../utils";

function readPackageJson(paths: string) {
  return fs.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function readPackageDependency(paths: string) {
  const packageData = readPackageJson(paths);
  const { getDependencies } = handleDependency(packageData);
  return getDependencies();
}

export function getModuleJSON(
  packageDependencies: Array<Dependency>
): Set<Dependency> {
  const dependencies: Array<Dependency> = [];
  const target: Record<string, string> = {};
  const localModulesPath = process.cwd() + "/node_modules/";
  packageDependencies.forEach((item) => {
    dependencies.push(...item.getDependenciesByPath(localModulesPath));
    item.setDependencyCid(dependencies, target);
  });
  return new Set([...packageDependencies, ...dependencies]);
}
