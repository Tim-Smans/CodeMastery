import * as users from './userActions'
import * as exercises from './exerciseActions'
import * as session from './sessionActions'
import * as categories from './categoryActions'
import * as roles from './roleActions'
import * as testcases from './testCaseActions'

/**
 * Om het aantal import statements te beperken en de code overzichtelijk te houden, groeperen we alle acties in dit
 * bestand.
 * We exporteren alle named exports opnieuw zodat we iets als `import {signInOrRegister} from '@actions'`
 * kunnen gebruiken.
 * Let op, hiervoor moet de '@actions' alias wel correct geconfigureerd zijn in tsconfig.json.
 */
export * from './userActions'
export * from './exerciseActions'
export * from './sessionActions'
export * from './categoryActions'
export * from './roleActions'
export * from './testCaseActions'

/**
 * We voorzien hier een default export met alle actions in de volledige applicatie.
 * Aangezien we op verschillende plaatsen in de applicatie gebruik maken van functies met dezelfde naam, is het handig
 * als we die functies niet altijd moeten importen met naam, maar wel als een object dat alle functies in één laag
 * groepeert.
 */
export default {
  ...users,
  ...exercises,
  ...session,
  ...categories,
  ...roles,
  ...testcases,
}
