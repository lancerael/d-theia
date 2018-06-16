import { json } from 'd3';

/**
* The Utilities object is is a class containing reusable static methods
*
* @class Utilities
*/
class Utilities {

  /**
  * Returns a promise resolving with JSON when supplied with a valid URL
  *
  * @method getPromiseJSON
  * @param {String} sUrl Required URL to make request
  * @throws {Error} invalid api string
  */
  static getPromiseJSON(sUrl) {
    if (typeof sUrl === 'string') {
      return json(sUrl);
    }
    throw new Error('No valid data API string provided.');
  }

  /**
  * Truncates a string and adds ellipsis.
  *
  * @method truncateString
  * @param {String} sString string to be truncated
  * @param {Integer} iMaxLength max length of string before truncation
  * @return {String} truncated string
  */
  static truncateString(sString, iMaxLength) {
    if (sString.length > iMaxLength) {
      return `${sString.slice(0, iMaxLength - 3)}[...]`;
    }
    return sString;
  }

  /**
  * Generates a random integer within a range.
  *
  * @method getRandomInteger
  * @param {Integer} iMin minimum random value
  * @param {Integer} iMax max random value
  * @param {Integer} iOmit optional excempt integer
  * @return {Integer} new random integer
  */
  static getRandomInteger(iMin, iMax, iOmit) {
    let iInt = Math.floor(Math.random() * (iMin - iMax - 1)) + iMax + 1;
    while (iInt === iOmit) {
      iInt = this.getRandomInteger(iMin, iMax);
    }
    return iInt;
  }

  /**
  * Returns a sample selection from an array (minmum length 3).
  *
  * @method sliceSampleData
  * @param {Array} aData the complete data set
  * @param {Integer} iMaxLength max length of sample
  * @return {Array} sliced section of data
  */
  static sliceSampleData(aData, iMaxLength = 50) {
    const iStart = this.getRandomInteger(0, aData.length - iMaxLength);
    const iEnd = iStart + this.getRandomInteger(3, iMaxLength);
    return aData.slice(iStart, iEnd);
  }

  /**
  * Returns random data and config for demo purposes.
  *
  * @method getRandomChart
  * @return {JSON} JSON style data structure
  */
  static getRandomData() {
    const iLength = this.getRandomInteger(3, 10);
    const iGroupSize = this.getRandomInteger(1, 4);
    const iRangeLow = this.getRandomInteger(1, 50);
    const iRangeHigh = this.getRandomInteger(iRangeLow, 200);
    const jChart = {};
    jChart.jConfig = {
      sTitle: 'Random Chart Data',
      aAxisLabels: ['Y Axis', 'X Axis'],
      aValues: (() => {
        const aValues = [];
        let iCounter = iGroupSize;
        while (iCounter--) {
          aValues.push({ sName: `Type ${iGroupSize - iCounter}` });
        }
        return aValues;
      })()
    };
    jChart.aData = (() => {
      const aData = [];
      let iCounter = iLength;
      while (iCounter--) {
        aData.push({
          sLabel: `Item ${iLength - iCounter}`,
          aValues: (() => {
            const aValues = [];
            let iSubCounter = iGroupSize;
            while (iSubCounter--) {
              aValues.push(this.getRandomInteger(iRangeLow, iRangeHigh))
            }
            return aValues;
          })()
        });
      }
      return aData;
    })();
    return jChart;
  }

}

module.exports = Utilities;
