### helpers/
- Functions only used within the project and not exported for consumption
- Each function has a separate file
- index.ts file imports all helpers and exports as a namespace

### services/
- Functions which may be used within the project
- Are always exported as resources within the project namespace
- Each function has a separate file
- index.ts file imports all helpers and exports as a namespace

### tokens/
#### {Component}TokenMap.ts
- Exports an object
- Serves as a layer for `getToken` (nice-styles) values so that they may be overridden
- May include static values

#### get{Component}Token.ts
- Uses `createComponentToken` (nice-styles) to make component tokens accessible

### constants.ts
- All static values used throughout the project
- index.ts file imports all helpers and exports as a namespace

### styles.ts
- All styled-components declarations

### types.ts
- All nice-styles types declared as `{Component}{Type}` to create a component layer for types
- All types included in `{Component}Props` interface
- At the end of the file, export default `{Component}Types` namespace, which includes all types + props interface