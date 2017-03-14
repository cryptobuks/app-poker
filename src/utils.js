'use strict'

const utils = {

  /**
   * Converte número int e float para real
   * @param {number} number
   */
  formatToReal: (number) => {
    return parseFloat(number).toFixed(2).replace('.', ',')
  }
}

export default utils
