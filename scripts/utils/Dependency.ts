import { getKey, hasKey } from ".";
import { analysisPackage } from "../cli";

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
    dependency.push(...analysisPackage(path + this.name));
  }

  addDependencyPid(id: string) {
    this.pid.push(id);
  }

  setDependencyPid(dependencies: Dependency[], target: Record<string, string>) {
    const map = new Map();
    for (const it of dependencies) {
      const filterkey = getKey(it);
      if (!hasKey(target, filterkey)) {
        target[filterkey] = it.id;
        map.set(filterkey, it);
        this.addDependencyPid(it.id);
      } else {
        if (!this.hasTargetDependency(target, filterkey)) {
          this.addDependencyPid(target[filterkey]);
        }
      }
    }
    dependencies.push(...map.values());
  }

  hasTargetDependency(target: Record<string, string>, filterkey: string) {
    return this.pid.indexOf(target[filterkey]) === -1;
  }
}
