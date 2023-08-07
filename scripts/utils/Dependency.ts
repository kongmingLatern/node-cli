import { getKey, hasKey } from ".";
import { readPackageDependency } from "../cli";

export class Dependency {
  name: string;
  version: string;
  cid: string[];
  id: string;

  constructor(name: string, version: string, cid: string[], id: string) {
    this.name = name;
    this.version = version;
    this.cid = cid;
    this.id = id;
  }

  getDependenciesByPath(path: string) {
    return readPackageDependency(path + this.name);
  }

  addDependencyCid(id: string) {
    this.cid.push(id);
  }

  setDependencyCid(dependencies: Dependency[], target: Record<string, string>) {
    const map = new Map();
    for (const it of dependencies) {
      const key = getKey(it);
      if (!hasKey(target, key)) {
        target[key] = it.id;
        map.set(key, it);
        this.addDependencyCid(it.id);
      } else {
        if (!this.hasTargetDependency(target, key)) {
          this.addDependencyCid(target[key]);
        }
      }
    }
    dependencies.push(...map.values());
  }

  hasTargetDependency(target: Record<string, string>, key: string) {
    return this.cid.indexOf(target[key]) === -1;
  }
}
