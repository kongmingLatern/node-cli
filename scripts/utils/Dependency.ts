import { getKey, hasKey } from ".";
import { readPackageDependency } from "../cli";

export class Dependency {
  name: string;
  version: string;
  pid: string[];
  id: string;

  constructor(name: string, version: string, pid: string[], id: string) {
    this.name = name;
    this.version = version;
    this.pid = pid;
    this.id = id;
  }

  addDependency(dependency: Dependency[], path: string) {
    dependency.push(...readPackageDependency(path + this.name));
  }

  addDependencyPid(id: string) {
    this.pid.push(id);
  }

  setDependencyPid(dependencies: Dependency[], target: Record<string, string>) {
    const map = new Map();
    for (const it of dependencies) {
      const key = getKey(it);
      if (!hasKey(target, key)) {
        target[key] = it.id;
        map.set(key, it);
        this.addDependencyPid(it.id);
      } else {
        if (!this.hasTargetDependency(target, key)) {
          this.addDependencyPid(target[key]);
        }
      }
    }
    dependencies.push(...map.values());
  }

  hasTargetDependency(target: Record<string, string>, key: string) {
    return this.pid.indexOf(target[key]) === -1;
  }
}
