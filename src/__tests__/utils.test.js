'use strict'

import utils from '../utils'

describe('Funções genéricas da utils', () => {

  test('Formata número inteiro para real. Ex: 100 -> 110,00', () => {
    expect(utils.formatToReal(110)).toBe('110,00')
  })

  test('Formata número decimal para real. Ex: 105.5 -> 105,50', () => {
    expect(utils.formatToReal('105.5')).toBe('105,50')
  })
})
