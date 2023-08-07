import { v4 as uuidv4 } from "uuid";
import { Dependency } from "../utils/Dependency";
export function handleDependency(packageData: Record<string, string>) {
  function mergeDependencies() {
    const { dependencies = {}, devDependencies = {} } = packageData;
    return { ...dependencies, ...devDependencies } as Record<string, string>;
  }
  function getDependencies() {
    const allPackages = mergeDependencies();
    const { dependencies = {}, devDependencies = {} } = packageData;
    return [
      ...handleType(dependencies, allPackages, "dependencies"),
      ...handleType(devDependencies, allPackages, "devDependencies"),
    ].filter(Boolean) as Array<Dependency>;
  }

  return {
    getDependencies,
  };
}

function handleType(
  dependencies: Record<string, string>,
  allPackages: Record<string, string>,
  type: "dependencies" | "devDependencies"
) {
  return Object.keys({ ...dependencies }).map((item) => {
    if (!isTSDeclareDependency(item)) {
      return new Dependency(item, allPackages[item], [], uuidv4(), type);
    }
  });
}

function isTSDeclareDependency(item: string) {
  return new RegExp("@types/").test(item);
}
