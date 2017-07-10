require('../../node_modules/whatwg-fetch/fetch.js');

/**
* The Utilities object is is a module containing reusable static methods
*
* @class Utilities
*/
const Utilities = {

  /**
  * Returns a promise resolving with JSON when supplied with a valid URL
  *
  * @method getPromiseJSON
  * @param {String} sUrl Required URL to make request
  * @throws {Error} invalid api string
  */
  getPromiseJSON(sUrl) {
    if (typeof sUrl === 'string') {
      return new Promise((resolve, reject) => {
        fetch(sUrl, {
          mode: 'no-cors',
        }).then((response) => {
          response.json().then((data) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    }
    throw new Error('No valid data API string provided.');
  },

  /**
  * Truncates a string and adds ellipsis.
  *
  * @method truncateString
  * @param {String} sString string to be truncated
  * @param {Integer} iMaxLength max length of string before truncation
  */
  truncateString(sString, iMaxLength) {
    if (sString.length > iMaxLength) {
      return `${sString.slice(0, iMaxLength - 3)}[...]`;
    }
    return sString;
  },

  /**
  * Generates a random integer within a range.
  *
  * @method generateRandomInteger
  * @param {Integer} iMin minimum random value
  * @param {Integer} iMax max random value
  * @param {Integer} iOmit optional excempt integer
  */
  generateRandomInteger(iMin, iMax, iOmit) {
    let iInt = Math.floor(Math.random() * (iMin - iMax - 1)) + iMax + 1;
    while (iInt === iOmit) {
      iInt = this.fnGntRandInt(iMin, iMax);
    }
    return iInt;
  },

  /**
  * Returns a sample selection from an array.
  *
  * @method sliceSampleData
  * @param {Array} aData the complete data set
  * @param {Integer} iMaxLength max length of sample
  */
  sliceSampleData(aData, iMaxLength = 50) {
    const iStart = this.generateRandomInteger(0, aData.length - iMaxLength);
    const iEnd = iStart + this.generateRandomInteger(1, iMaxLength);
    return aData.slice(iStart, iEnd);
  },

};

module.exports = Utilities;
