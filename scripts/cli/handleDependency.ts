import { v4 as uuidv4 } from "uuid";
import { Dependency } from "../utils/Dependency";
export function handleDependency(
  packageData: Record<string, string>,
  filePath?: string
) {
  function getDependencies() {
    const { dependencies = {}, devDependencies = {} } = packageData;
    return [
      ...initDependency(dependencies, "dependencies", filePath),
      ...initDependency(devDependencies, "devDependencies", filePath),
    ].filter(Boolean) as Array<Dependency>;
  }

  return {
    getDependencies,
  };
}

function initDependency(
  dependencies: Record<string, string>,
  type: "dependencies" | "devDependencies",
  path?: string
) {
  return Object.keys({ ...dependencies }).map((item) => {
    if (!isTSDeclareDependency(item) || !isSpecialDependency(item)) {
      return new Dependency(item, dependencies[item], [], uuidv4(), path, type);
    }
  });
}

function isTSDeclareDependency(item: string) {
  return new RegExp("@types/").test(item);
}

function isSpecialDependency(item: string) {
  return new RegExp(/^./g).test(item);
}
