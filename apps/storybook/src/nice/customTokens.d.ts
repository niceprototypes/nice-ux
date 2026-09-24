/**
 * Custom token groups storybook registers through `setTokens` in `./tokens.ts`.
 *
 * `getToken` is typed from the nice-styles token sources, so a group those sources
 * do not declare is a compile error until it is declared on `CustomTokenVariants`.
 * Keep this in sync with the new groups in `AppTokenMap`. Extra variants on core
 * groups (`backgroundColor.dark`, `fontFamily.demo`) cannot be declared here.
 */
declare module "nice-styles" {
  interface CustomTokenVariants {
    contentMaxWidth: "base"
  }
}

export {}
