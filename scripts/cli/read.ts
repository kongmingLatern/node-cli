import { ObjType, PackageType } from "../../src/types";
import * as fse from "fs-extra";
import { v4 as uuidv4 } from "uuid";
function readPackageJson(paths: string) {
  return fse.readJSONSync(paths + "/package.json");
}

function findAllDependencies(allPackages: { [x: string]: string }) {
  return Object.keys(allPackages)
    .map((item) => {
      if (!isTSDeclareDependency(item)) {
        return {
          name: item,
          version: allPackages[item],
          id: uuidv4(),
          pid: [],
        };
      }
    })
    .filter((b) => Boolean(b)) as Array<PackageType>;
}

function combineAllDependency(
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>
) {
  return { ...dependencies, ...devDependencies };
}

// 解析 package.json
export function analysisPackage(paths: string) {
  // 获取依赖包
  const packageData = readPackageJson(paths);
  const { dependencies = {}, devDependencies = {} } = packageData;
  const allPackages = combineAllDependency(dependencies, devDependencies);
  return findAllDependencies(allPackages);
}

function isTSDeclareDependency(item: string) {
  return new RegExp("@types/").test(item);
}

export function getModuleJSON(arr: Array<PackageType>) {
  let arrs: Array<PackageType> = [];
  const hasObj: ObjType = {};
  arr.forEach((item) => {
    arrs = [
      ...arrs,
      ...analysisPackage(process.cwd() + "/node_modules/" + item.name),
    ].filter((i) => Boolean(i));
    //使用map ,进行过滤
    const map = new Map();
    console.log("arr", arrs);
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
