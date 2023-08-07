import { v4 as uuidv4 } from "uuid";
import { Dependency } from "../utils/Dependency";
export function handleDependency(packageData: Record<string, string>) {
  function getDependencies() {
    const { dependencies = {}, devDependencies = {} } = packageData;
    return [
      ...handleType(dependencies, "dependencies"),
      ...handleType(devDependencies, "devDependencies"),
    ].filter(Boolean) as Array<Dependency>;
  }

  return {
    getDependencies,
  };
}

function handleType(
  dependencies: Record<string, string>,
  type: "dependencies" | "devDependencies"
) {
  return Object.keys({ ...dependencies }).map((item) => {
    if (!isTSDeclareDependency(item) || !isSpecialDependency(item)) {
      return new Dependency(item, dependencies[item], [], uuidv4(), type);
    }
  });
}

function isTSDeclareDependency(item: string) {
  return new RegExp("@types/").test(item);
}

function isSpecialDependency(item: string) {
  return new RegExp(/^./g).test(item);
}
