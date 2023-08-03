import * as fs from "fs";
export const getPackagePaths = (dir: string, filelist: string[] = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filepath = dir + "/" + file;
    const stats = fs.statSync(filepath);

    if (stats.isDirectory()) {
      filelist = getPackagePaths(filepath, filelist);
    } else if (file === "package.json") {
      filelist.push(filepath);
    }
  });

  return filelist;
};
