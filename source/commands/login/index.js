import { BaseCommand, request, localStorage } from "services";
import inquirer from "inquirer";
import xml2js from "xml2js";

class Login extends BaseCommand {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.create({
      command: "login",
      builder: {},
      describe: "Login the QRZ Database",
    });

    this.handler(this.login);
  }

  async login() {
    const parser = new xml2js.Parser();
    const { userName, password } = await inquirer.prompt([
      {
        name: "userName",
        message: "Enter your username: ",
        type: "input",
      },
      {
        name: "password",
        message: "Enter your password: ",
        type: "password",
      },
    ]);
    this.startSpinner("Logging On...");

    await request
      .get(`?username=${userName};password=${password}`)
      .then((response) => {
        parser
          .parseStringPromise(response.data)
          .then(async (result) => {
            const sessionResult = result.QRZDatabase.Session[0];
            if (sessionResult.Error)
              this.clearSpinnerWithError(sessionResult.Error[0]);

            await localStorage.setItem("sessionKey", sessionResult.Key[0]);
            this.clearSpinner("Login is success");
          })
          .catch((error) => {
            this.clearSpinnerWithError(error);
          });
      })
      .catch((error) => {
        this.clearSpinnerWithError(error);
      });
  }
}

export default new Login();
