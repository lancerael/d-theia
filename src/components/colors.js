import { rgb } from 'd3';
import Utilities from './utilities';

/**
* The Colors object is is a class containing reusable static methods
*
* @class Colors
*/
class Colors {

  /**
  * Returns a random color
  *
  * @method getRandomColor
  * @return {RGB object} randomly generated RGB object
  */
  static getRandomColor() {
    const iRGB = () => Utilities.getRandomInteger(0, 255);
    return rgb(iRGB(), iRGB(), iRGB());
  }

  /**
  * Returns a random color palette
  *
  * @method getRandomPalette
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
  * @param {RGB object} oColor RGB object
  * @return {RGB object} darker RGB object
  */
  static getDarkerColor(oColor) {
    return oColor.darker(0.5);
  }

}

module.exports = Colors;
