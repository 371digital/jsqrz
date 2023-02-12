import xml2js from "xml2js";
import { BaseCommand, request, localStorage } from "services";
import CallSignModel from "model";
import inquirer from "inquirer";

class CallSign extends BaseCommand {
  constructor(props) {
    super(props);
    this.callsign = this.callsign.bind(this);

    this.create({
      command: "callsign",
      builder: {},
      describe: "Query the QRZ Database",
    });

    this.handler(this.callsign);
  }

  async query(callSign) {
    const parser = new xml2js.Parser();
    const sessionKey = localStorage.getItem("sessionKey");
    return await request
      .get(`?s=${sessionKey}&callsign=${callSign}`)
      .then((response) => {
        return parser
          .parseStringPromise(response.data)
          .then((result) => {
            if (result.QRZDatabase.Session[0].Error)
              return this.clearSpinnerWithError(
                result.QRZDatabase.Session[0].Error[0],
                false
              );

            return new CallSignModel(result);
          })
          .catch((error) => {
            this.clearSpinnerWithError(error);
          });
      })
      .catch((error) => {
        this.clearSpinnerWithError(error);
      });
  }

  async callsign() {
    await this.validateAuth();

    while (true) {
      const { callSign } = await inquirer.prompt([
        {
          name: "callSign",
          message: "Enter callsign: ",
          type: "input",
        },
      ]);

      await this.query(callSign).then((data) => {
        if (data)
          this.log([
            "--".repeat(22),
            `Ad Soyad: ${data.fullName}\n`,
            `Adres: ${data.getFullAddress()}\n`,
            `Çağrı İşareti: ${data.callSign}\n`,
            `${data.fonetikCall}`,
            `${data.morsCall}`,
            "--".repeat(22),
          ]);
      });
    }
  }
}

export default new CallSign();
