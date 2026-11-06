/**
 * `getFocusRingStyle` reads the core or a component's focusRing tokens.
 */

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getFocusRingStyle, getToken } from '../src/index.js'

test('core focus ring reads the focusRing tokens', () => {
  assert.equal(
    getFocusRingStyle(),
    `outline: ${getToken('focusRing', 'width')} solid ${getToken('focusRing', 'color')}; outline-offset: ${getToken('focusRing', 'offset')};`
  )
})

test('component focus ring reads that component’s focusRing tokens', () => {
  assert.equal(
    getFocusRingStyle('button'),
    `outline: ${getToken('button.focusRing.width:base')} solid ${getToken('button.focusRing.color:base')}; outline-offset: ${getToken('button.focusRing.offset:base')};`
  )
})
