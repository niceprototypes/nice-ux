import 'styled-components'
import { ButtonTheme } from './types'

declare module 'styled-components' {
  export interface DefaultTheme extends ButtonTheme {}
}