import Utilities from '../Utilities'
import Colors from '../Colors'

/**
 * The DataOps object is is a class containing reusable static methods to be operated on data
 *
 * @class DataOps
 * @static
 */
export default class DataOps {
  /**
   * Returns a sample selection from an array (minmum length 3).
   *
   * @method sliceSampleData
   * @static
   * @param {Array} aData the complete data set
   * @param {Integer} iMaxLength max length of sample
   * @return {Array} sliced section of data
   */
  static sliceSampleData(aData: any, iMaxLength = 50) {
    const iStart = Utilities.getRandomInteger(0, aData.length - iMaxLength)
    const iEnd = iStart + Utilities.getRandomInteger(3, iMaxLength)
    return aData.slice(iStart, iEnd)
  }

  /**
   * Returns random data and config for demo purposes.
   *
   * @method getRandomData
   * @static
   * @return {JSON} JSON compatible data structure
   */
  static getRandomData(iDefaultLength?: number, iDefaultWidth?: number) {
    const iLength = iDefaultLength || Utilities.getRandomInteger(3, 10)
    const iGroupSize = iDefaultWidth || Utilities.getRandomInteger(1, 4)
    const iRangeLow = Utilities.getRandomInteger(1, 50)
    const iRangeHigh = Utilities.getRandomInteger(iRangeLow, 200)
    const jChart: any = {}
    jChart.jConfig = {
      sTitle: 'Random Chart Data',
      aAxisLabels: ['Y Axis', 'X Axis'],
      aValues: (() => {
        const aValues = []
        let iCounter = iGroupSize
        while (iCounter--) {
          aValues.push({ sName: `Type ${iGroupSize - iCounter}` })
        }
        return aValues
      })(),
      bTrim: true,
    }
    jChart.jConfig.aValues = DataOps.addColoursToConfig(
      jChart.jConfig.aValues,
      false
    )
    jChart.aData = []
    let iCounter = iLength
    while (iCounter--) {
      jChart.aData.push({
        sLabel: `Item ${iLength - iCounter}`,
        aValues: (() => {
          const aValues = []
          let iSubCounter = iGroupSize
          while (iSubCounter--) {
            aValues.push(Utilities.getRandomInteger(iRangeLow, iRangeHigh))
          }
          return aValues
        })(),
      })
    }
    return jChart
  }

  /**
   * Returns empty data and config for demo purposes.
   *
   * @method getEmptyData
   * @static
   * @return {JSON} JSON conpatible data structure
   */
  static getEmptyData() {
    const jChart: any = {}
    jChart.jConfig = {
      sTitle: '',
      aAxisLabels: ['', ''],
      aValues: [],
      bTrim: true,
    }
    jChart.aData = [{ sLabel: 'Item 1', aValues: [] }]
    return jChart
  }

  /**
   * Maps custom data keys into standard structure.
   *
   * @method transformDataKeys
   * @static
   * @param {JSON} jConfig the JSON style config object
   * @param {Array} aData the chart data to be transformed
   */
  static transformDataKeys(jConfig: any, aData: any) {
    return aData.map((hItem: any) => {
      if (jConfig.aValues && !hItem.aValues) {
        hItem.aValues = jConfig.aValues.map((jValue: any) =>
          parseInt(hItem[jValue.sKey])
        )
      }
      if (hItem.aValues) {
        hItem.aValues = hItem.aValues.map((iValue: any) => {
          const iSanitisedValue = parseInt(iValue)
          return isNaN(iSanitisedValue) ? 0 : iSanitisedValue
        })
      }
      if (jConfig.aAxisKeys && !hItem.sLabel) {
        hItem.sLabel = hItem[jConfig.aAxisKeys[0]]
      }
      return hItem
    })
  }

  /**
   * Adds colour values to the config array of key values
   *
   * @method addColoursToConfig
   * @static
   * @param {Array} aValues the config values needing colours
   * @param {Boolean} bAddRgb add RGB object or not?
   * @return {Array} A modified version of aValues containing colours
   */
  static addColoursToConfig(aValues: any, bAddRgb = true) {
    return aValues.map((jValue: any) => {
      if (!jValue.sColor) {
        jValue.sColor = Colors.getRandomColor().hex()
      }
      if (bAddRgb) {
        jValue.oColor = Colors.convertHexToRgb(jValue.sColor)
      }
      return jValue
    })
  }
}
