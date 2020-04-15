# yarnv2-react-test

Notable points to pay attention :

- This is a structure called "monorepo".
- It uses [`plugin-node-modules`](https://github.com/yarnpkg/berry/tree/master/packages/plugin-node-modules) to turn back yarn v2 from pnp `.zip` files into oldschool `node_modules` since it is friendlier to the code editor. (Go to definition, light bulb suggestions, etc.) Still better as you get hoisting at top instead of multiple `node_modules` in each packages.
- Top package make `main-project` and `sub` a nested workspace folder, with their own `package.json`.
- `main-project` is a `create-react-app` that we need the hooks to be testable separately of visual elements. That is, the new workspace should depends on `react` but not `react-dom` and has no `.tsx` files.
- New `workspace:` syntax in the dependency from yarn that will go to the hoisted `node_modules` at the root then follow the symlink back down to destination, added on normal `yarn add` command inside the nested workspace. There is a problem on VSCode lightbulb that [can't figure out how to follow a symlink](https://github.com/microsoft/TypeScript/issues/37414).
- @ scoping the name is important, as if you name your workspace just `sub`, `yarn add sub` will install an actual package named `sub` instead of your monorepo`s local package.
- (VSCode) workspace folders allow you to spawn a terminal in any (yarn) workspace. Anyways, `yarn workspace` command allows you to warp to that workspace and execute commands as well.
- Ideally we should move up Jest and friends to more top level so that if we spawn more workspaces for more kind of hooks to test separately, they use the same test tools. But CRA will also see that and complain that you are trying to compromise their design and ask you to remove it. Even now that Jest is in the inner level, because of hoisting, CRA bubble up and see newer Jest and complains anyway. (So you cannot `yarn start` the main CRA project) You can fix by installing the same Jest (or other deps) version that CRA is using instead in your separated workspace for test.
- `sub` workspace contains extended `tsconfig.json`. This is because VSCode look at the config and get smart according to it. We must have a `test` folder in compilation to allow all the smartness. At the same time when we actually build the package we don't want to compile test. So this `tsconfig.json` is for VSCode to see, when we build with `tsc`, we then use an option flag to target `tsconfig.build.json` instead.
- Because of extend rule that overwrite rather than merge, the base `build` file use `rootDirs` with an `s` even if I want only one folder. This is so the extended file could use more folders.
- In `src` of `sub` workspace, because of settings in `tsconfig.json` we can go to `helper` from virtual root starting at `src` from anywhere without relative path `..` hell.
- The custom hooks presented in this example is intentionally weird and output a hard to use object, just so I have some reasons to test them because you feel uneasy if it would perform well or not.
- Jest test file could use `describe` and friends without even an `import` statement bringing them in. This is because Jest runner has their own rule separated from TypeScript. The TypeScript we use here is smart in VSCode thanks to `tsconfig.json` but when actually running it, the file goes to Babel and Jest. There is a setup in `jest.config.js` that provide module resolution so it works the same way as TypeScript module resolution. (Look into `src` nearby, so we can immediately start at `hooks/...` instead of having to `..` back from `test` folder into `src`.
- The `main-project` package is using this `sub` package in a simple way, that is using TypeScript to drill down into `src` folder. To get it neater, you should build into `dist` properly and create an easier to use entry point.
- Test hook in isolation of visual element using https://react-hooks-testing-library.com/ Pay attention to how to must rerender manually when you change props to emulate the browser. Therefore it is recommended to test only one hook at a time and to not spawn multiple hooks and try to connect them. Though the `useBothHooks` file demonstrate that while it is possible, it is getting harder to test.
- There is a command `yarn test` usable in the `sub` folder to run test.
- A `launch.json` is also setup according to Jest docs to allow breakpoint and code stepping while running the test. Though, if you follow Jest docs the path in `launch.json` cannot resolve to Jest executable again due to yarn v2 hoisting. I don't know how to fix so I just use `..` until I arrive at the hoisted `node_modules`.
- When installing yarn v2 for some reason yarn path in `.yarnrc.yml` [is not portable](https://github.com/yarnpkg/berry/issues/921) and I could not get it to be portable according to this thread. So maybe you can try deleting it and install yarn v2 from scratch or wait until release candidate status disappear.