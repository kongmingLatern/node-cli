import * as fse from "fs-extra";
import { handleDependency } from "./handle";
import { Dependency, getKey, hasKey } from "../utils";

function readPackageJson(paths: string) {
  return fse.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function analysisPackage(paths: string) {
  const packageData = readPackageJson(paths);
  const { getDependencies } = handleDependency(packageData);
  return getDependencies();
}

export function getModuleJSON(dependencies: Array<Dependency>) {
  let result: Array<Dependency> = [];
  const target: Record<string, string> = {};
  const localModulesPath = process.cwd() + "/node_modules/";
  dependencies.forEach((item) => {
    const map = new Map();
    result.push(...analysisPackage(localModulesPath + item.name));
    for (const it of result) {
      const filterkey = getKey(it);
      if (!hasKey(target, filterkey)) {
        target[filterkey] = it.id;
        item.pid.push(it.id);
        map.set(filterkey, it);
      } else {
        item.pid.indexOf(target[filterkey]) === -1
          ? item.pid.push(target[filterkey])
          : "";
      }
    }
    result = [...map.values()];
  });

  return [...dependencies, ...result];
}
