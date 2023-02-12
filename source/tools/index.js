import fs from "fs";
import ora from "ora";
import xml2js from "xml2js";
import { localStorage, request } from "services";

class Tools {
  log = (logArray) => console.log(logArray.join("\n"));

  startSpinner(text) {
    this.spinner = ora(text).start();
  }

  clearSpinner(message) {
    this.spinner.succeed(message);
  }

  clearSpinnerWithError(message, exit = true) {
    this.spinner.fail(message);
    if (exit) process.exit(-1);
  }

  async validateAuth() {
    this.startSpinner("Login check started!");
    const sessionKey = localStorage.getItem("sessionKey");
    if (!sessionKey) {
      return this.clearSpinnerWithError("Login required, please login!");
    }
    const parser = new xml2js.Parser();
    await request.get(`?s=${sessionKey}`)
    .then((response) => {
      parser.parseStringPromise(response.data)
      .then((result) => {
        if (result.QRZDatabase.Session[0].Error) return this.clearSpinnerWithError("Login required, please login!");
        this.clearSpinner("Login check success!");
      });
    });
  }

  async writeFile(filePath, content) {
    return await new Promise(async (resolve) => {
      fs.writeFile(filePath, content, (error) => {
        if (error) {
          this.clearSpinnerWithError(error);
        }
        resolve(true);
      });
    });
  }

  readJsonFile(path) {
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  }
}
export default Tools;
