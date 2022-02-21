function ConvertHandler() {
  this.getNum = function(input) {
    let lowCaseInput = input.toLowerCase()

    if (lowCaseInput === 'gal' || lowCaseInput === 'l' || lowCaseInput === 'mi' || lowCaseInput === 'km' || lowCaseInput === 'lbs' || lowCaseInput === 'kg') { return 1 } else {

      let result = input.match(/^(\d+\.?\d*|\d+\.?\d*\/?\d+\.?\d*)(?=[a-zA-Z]+$)/); //before regex: /^[0-9/.]+(?=[a-zA-Z]+$)/
      return !result ? null : eval(result[0]);
    }
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    switch (result[0].toLowerCase()) {
      case 'gal':
        return 'gal';
        break;
      case 'l':
        return 'L';
        break;
      case 'mi':
        return 'mi';
        break;
      case 'km':
        return 'km';
        break;
      case 'lbs':
        return 'lbs';
        break;
      case 'kg':
        return 'kg';
        break;
      default:
        return null
    }
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
        break;
      case "L":
        return "gal";
        break;
      case "mi":
        return "km";
        break;
      case "km":
        return "mi";
        break;
      case "lbs":
        return "kg";
        break;
      case "kg":
        return "lbs";
        break;
      default:
        return null;
        break;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case "gal":
        return "gallons";
        break;
      case "L":
        return "liters";
        break;
      case 'l':
        return 'liters';
        break;
      case "mi":
        return "miles";
        break;
      case "km":
        return "kilometers";
        break;
      case "lbs":
        return "pounds";
        break;
      case "kg":
        return "kilograms";
        break;
      default:
        return null;
        break;
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return initNum * galToL;
        break;
      case "L":
        return initNum / galToL;
        break;
      case "mi":
        return initNum * miToKm;
        break;
      case "km":
        return initNum / miToKm;
        break;
      case "lbs":
        return initNum * lbsToKg;
        break;
      case "kg":
        return initNum / lbsToKg;
        break;
      default:
        return null;
        break;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };
}

module.exports = ConvertHandler;
