'use strict'

import { sum } from './utils'

test('função sum tem que retornar 2 para a soma 1 + 1', () => {
  expect(sum(1, 1)).toBe(2)
})
