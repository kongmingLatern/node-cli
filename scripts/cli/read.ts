import { ObjType, PackageType } from "../../src/types";
import * as fse from "fs-extra";
import { v4 as uuidv4 } from "uuid";

//读取package.json
export function readPackage(paths: string) {
  // 获取依赖包
  const arr: Array<PackageType> = [];
  const packageData = fse.readJSONSync(paths + "/package.json");
  const dependencies = packageData.dependencies || {};
  const devDependencies = packageData.devDependencies || {};
  const allPackages = { ...dependencies, ...devDependencies };
  Object.keys(allPackages).map((item) => {
    if (!new RegExp("@types/").test(item)) {
      arr.push({
        name: item,
        version: allPackages[item],
        id: uuidv4(),
        pid: [],
      });
    }
  });
  return arr;
}

export function getModules(arr: Array<PackageType>) {
  let arrs: Array<PackageType> = [];
  const hasObj: ObjType = {};
  arr.forEach((item) => {
    arrs = [
      ...arrs,
      ...readPackage(process.cwd() + "/node_modules/" + item.name),
    ];
    //使用map ,进行过滤
    const map = new Map();
    for (const it of arrs) {
      const filterkey = it.name + it.version;
      if (hasObj[filterkey] === undefined) {
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
