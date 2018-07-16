import { json } from 'd3-fetch';

/**
* The Utilities object is is a class containing reusable static methods
*
* @class Utilities
* @static
*/
export default class Utilities {

  /**
  * Returns a promise resolving with JSON when supplied with a valid URL
  *
  * @method getPromiseJSON
  * @static
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
  * @static
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
  * @static
  * @param {Integer} iMin minimum random value
  * @param {Integer} iMax max random value
  * @param {Integer} iOmit specify a value to omit from results
  * @return {Integer} new random integer
  */
  static getRandomInteger(iMin, iMax, iOmit) {
    let iInt = Math.floor(Math.random() * (iMin - iMax - 1)) + iMax + 1;
    if (iOmit) {
      while (iInt === iOmit) {
        iInt = this.getRandomInteger(iMin, iMax);
      }
    }
    return iInt;
  }

}
