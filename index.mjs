import { exec } from "node:child_process";
import path from "node:path";
import { cwd } from "node:process";
import util from "node:util";

const appPath = path.join(cwd(), "/app");
const studioPath = path.join(cwd(), "/studio");

// remove typescript
const filesToRemove = ["tsconfig.*", "*.ts", "env.d.ts"];

const execPromise = util.promisify(exec);

async function removeTypeScript(folderPath) {
  console.log("Running.");

  try {
    // installs
    await execPromise("npm install && npm run remove-typescript", {
      cwd: folderPath,
    });

    // remove files
    await execPromise(
      `npx rimraf -g ${filesToRemove.join(
        " "
      )} && npx rimraf -g "!(node_modules)**/**/*.ts" && npm uninstall rimraf typescript`,
      {
        cwd: folderPath,
      }
    );

    // remove scripts from package.json
  } catch (error) {
    console.log(error);
  }
}

await removeTypeScript(appPath);
