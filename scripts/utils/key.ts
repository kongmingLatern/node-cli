import { Dependency } from "./Dependency";

export function getKey(it: Dependency) {
  return it.name + it.version;
}
export function hasKey(obj: Record<string, string>, filterkey: string) {
  return Object.prototype.hasOwnProperty.call(obj, filterkey);
}
