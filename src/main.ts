//@ts-nocheck

import Theia, { getRandomData, sliceSampleData } from './'
import Config from '../demo/config/config'

import cycleData from '../demo/data/cycles.json'
import racingData from '../demo/data/formula1.json'

let jTest = getRandomData()

// console.log(jTest)

// Display dummy bar chart
const barChart = Theia.chart('container-bar-test', 'bar', jTest)
