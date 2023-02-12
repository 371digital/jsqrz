import { fonetik, mors } from '_constants'

class CallSignModel {
  constructor(props) {
    const rawData = props.QRZDatabase.Callsign[0]
    
    this.fullName = `${rawData["fname"]} ${rawData["name"]}`;
    this.address = rawData["addr2"];
    this.state = rawData["state"] ? rawData["state"] : "";
    this.country = rawData["country"];
    this.callSign = rawData["call"][0];
    this.morsCall = this.getFonetikAndMorsCall(this.callSign).mors;
    this.fonetikCall = this.getFonetikAndMorsCall(this.callSign).fonetik;
  }

  getFullAddress = () =>
    `${this.address} ${this.state} / ${this.country}`;

  getFonetikAndMorsCall(callSign) {
    const morsResult = [];
    const fonetikResult = [];
    callSign.split("").forEach((i) => {
      morsResult.push(mors[i.toUpperCase()]);
      fonetikResult.push(fonetik[i.toUpperCase()]);
    });
    return {
      mors: morsResult.join("  "),
      fonetik: fonetikResult.join(" - "),
    };
  }
}

export default CallSignModel;
