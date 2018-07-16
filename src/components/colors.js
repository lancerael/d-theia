import { rgb } from 'd3-color';
import Utilities from './Utilities';

/**
* The Colors object is is a class containing reusable static methods
*
* @class Colors
* @static
*/
export default class Colors {

  /**
  * Returns a random color (D3 object)
  *
  * @method getRandomColor
  * @static
  * @param {String} sBackground the type of background light/dark to filter for contrast
  * @param {Integer} iBoundary the brightness value to filter
  * @return {Object} randomly generated RGB object
  */
  static getRandomColor(sBackground = 'light', iBoundary = 170) {
    const iRGB = () => Utilities.getRandomInteger(0, 255);
    let aValues = [];
    while (!aValues.length || !this.colorFilter(sBackground, iBoundary, aValues)) {
      aValues = [iRGB(), iRGB(), iRGB()];
    }
    return rgb(aValues[0], aValues[1], aValues[2]);
  }

  /**
  * Used to filter random colour values and ensure high contrast against background
  *
  * @method colorFilter
  * @static
  * @param {String} sBackground the type of background light/dark to filter for contrast
  * @param {Integer} iBoundary the brightness value to filter
  * @param {Array} aValues array of RGB values
  * @return {Boolean} specify whether the values pass or fail
  */
  static colorFilter(sBackground, iBoundary, aValues) {
    let bPass = false;
    if (!aValues.length) {
      bPass = false;
    } else if (!sBackground) {
      bPass = true
    } else {
      const iBrightness = ((aValues[0] * 299) + (aValues[1] * 587) + (aValues[2] * 114)) / 1000;
      if (sBackground === 'light') {
        bPass = iBrightness < iBoundary;
      } else if (sBackground === 'dark') {
        bPass = iBrightness > iBoundary;
      }
    }
    return bPass;
  }

  /**
  * Converts a HEX string to an RGB value
  *
  * @method convertHexToRgb
  * @static
  * @param {String} sColor the HEX colour
  * @return {Object} RGB color object
  */
  static convertHexToRgb(sColor) {
    return rgb(sColor);
  }

  /**
  * Returns a random color palette
  *
  * @method getRandomPalette
  * @static
  * @param {Integer} iLength the size of the palette
  * @return {Array} list of randomly generated RGB objects
  */
  static getRandomPalette(iLength = 10) {
    let iCount = iLength;
    const aPalette = [];
    while (iCount--) {
      aPalette.push(this.getRandomColor());
    }
    return aPalette;
  }

  /**
  * Returns a darker version of a color
  *
  * @method getDarkerColor
  * @static
  * @param {Object} oColor RGB object
  * @return {Object} darker RGB object
  */
  static getDarkerColor(oColor) {
    return oColor.darker(0.5);
  }

}
