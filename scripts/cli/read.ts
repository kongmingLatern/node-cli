import * as fse from "fs-extra";
import { handleDependency } from "./handle";
import { Dependency } from "../utils";

function readPackageJson(paths: string) {
  return fse.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function readPackageDependency(paths: string) {
  const packageData = readPackageJson(paths);
  const { getDependencies } = handleDependency(packageData);
  return getDependencies();
}

export function getModuleJSON(
  dependencies: Array<Dependency>
): Set<Dependency> {
  const dependency: Array<Dependency> = [];
  const target: Record<string, string> = {};
  const localModulesPath = process.cwd() + "/node_modules/";
  dependencies.forEach((item) => {
    item.addDependency(dependency, localModulesPath);
    item.setDependencyPid(dependency, target);
  });
  return new Set([...dependencies, ...dependency]);
}
