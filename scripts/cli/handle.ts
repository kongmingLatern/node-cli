import { v4 as uuidv4 } from "uuid";
import { Dependency } from "../utils/Dependency";
export function handleDependency(packageData: Record<string, string>) {
  function mergeDependencies() {
    const { dependencies = {}, devDependencies = {} } = packageData;
    return { ...dependencies, ...devDependencies } as Record<string, string>;
  }
  function getDependencies() {
    const allPackages = mergeDependencies();
    return Object.keys(allPackages)
      .map((item) => {
        if (!isTSDeclareDependency(item)) {
          return new Dependency(item, allPackages[item], [], uuidv4());
        }
      })
      .filter((b) => Boolean(b)) as Array<Dependency>;
  }

  return {
    getDependencies,
  };
}

function isTSDeclareDependency(item: string) {
  return new RegExp("@types/").test(item);
}
