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
}
