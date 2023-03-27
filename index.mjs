import { exec } from "node:child_process";
import fs from "fs/promises";
import path from "node:path";
import { cwd } from "node:process";
import util from "node:util";

const appPath = path.join(cwd(), "/app");
const studioPath = path.join(cwd(), "/studio");

// remove typescript
const filesToRemove = ["tsconfig.*", "*.ts", "env.d.ts"];

const execPromise = util.promisify(exec);

async function removeTypeScript(folderPath) {
  console.log("Initiated TS removal");

  try {
    // installs
    await execPromise("npm install && npm run remove-typescript", {
      cwd: folderPath,
    });

    // remove files
    await execPromise(
      `npx rimraf -g ${filesToRemove.join(
        " "
      )} && npx rimraf -g "!(node_modules)**/**/*.ts" && npm uninstall rimraf typescript @sanity/types @portabletext/types`,
      {
        cwd: folderPath,
      }
    );

    // remove scripts from package.json
    const packageJsonPath = path.resolve(folderPath, "package.json");
    const pkg = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
    delete pkg.scripts["remove-typescript"];
    await fs.writeFile(packageJsonPath, JSON.stringify(pkg, null, 2));

    console.log("Finished");
  } catch (error) {
    console.log(error);
  }
}

await removeTypeScript(studioPath);
