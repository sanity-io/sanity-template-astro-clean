import { exec } from "node:child_process";
import path from "node:path";
import { cwd } from "node:process";

const appPath = path.join(cwd(), "/app");
const studioPath = path.join(cwd(), "/studio");

// remove typescript
const filesToRemove = ["tsconfig.*", "*.ts"];
const packagesToRemove = ["typescript", "ora"];

function removeTypeScript(path) {
  // run typescript compiler, to remove typescript
  const install = exec("npm install && npm run tsc", {
    cwd: path,
  });

  install.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  // remove files
  const removeFiles = exec("rimraf *.ts", {
    cwd: path,
  });

  // remove packages
  const remove = exec("npm uninstall " + packagesToRemove.join(" "), {
    cwd: path,
  });
}

removeTypeScript(studioPath);
