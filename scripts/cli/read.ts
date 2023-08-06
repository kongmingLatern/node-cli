import * as fse from "fs-extra";
import { PackageType, ObjType } from "../utils/types";
import { handleDependency } from "./handle";

function readPackageJson(paths: string) {
  return fse.readJSONSync(paths + "/package.json");
}

// 解析 package.json
export function analysisPackage(paths: string) {
  const packageData = readPackageJson(paths);
  const { getDependencies } = handleDependency(packageData);
  return getDependencies();
}

export function getModuleJSON(arr: Array<PackageType>) {
  let arrs: Array<PackageType> = [];
  const hasObj: ObjType = {};
  arr.forEach((item) => {
    arrs.push(...analysisPackage(process.cwd() + "/node_modules/" + item.name));
    //使用map ,进行过滤
    const map = new Map();
    for (const it of arrs) {
      const filterkey = it.name + it.version;
      if (!hasObj[filterkey]) {
        hasObj[filterkey] = it.id;
        item.pid.push(it.id);
        map.set(filterkey, it);
      } else {
        item.pid.indexOf(hasObj[filterkey]) === -1
          ? item.pid.push(hasObj[filterkey])
          : "";
      }
    }
    arrs = [...map.values()];
  });

  return [...arr, ...arrs];
}
