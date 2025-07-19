---
inclusion: always
---

# Nuxt 4 Development Guidelines

## Core Principles

- Use Nuxt 4's file-based routing and auto-imports
- Leverage server-side rendering (SSR) by default
- Follow Vue 3 Composition API patterns with `<script setup>`
- Utilize TypeScript for type safety

## Event System

Use Nuxt's event system for decoupled application communication:

```ts
// Creating event listeners
const nuxtApp = useNuxtApp();
nuxtApp.hook("app:user:registered", (payload) => {
  console.log("A new user has registered!", payload);
});

// Emitting events
await nuxtApp.callHook("app:user:registered", {
  id: 1,
  name: "John Doe",
});
```

## State Management

- Use `useState()` for reactive, SSR-friendly shared state
- Prefer composables over global state stores when possible
- Use `callOnce()` for initialization logic that should run only once

```ts
// Reactive state
const counter = useState("counter", () => 0);

// Initialization
await callOnce(async () => {
  const config = await $fetch("/api/config");
  useState("config").value = config;
});
```

# Experimental Features

> Enable Nuxt experimental features to unlock new possibilities.

Nuxt includes experimental features that you can enable in your configuration file.

Internally, Nuxt uses `@nuxt/schema` to define these experimental features. You can refer to the [API documentation](/docs/4.x/api/configuration/nuxt-config#experimental) or the [source code](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/experimental.ts) for more information.

<note>

Note that these features are experimental and could be removed or modified in the future.

</note>

## asyncContext

Enable native async context to be accessible for nested composables in Nuxt and in Nitro. This opens the possibility to use composables inside async composables and reduce the chance to get the `Nuxt instance is unavailable` error.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    asyncContext: true,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/20918" icon="i-simple-icons-github" target="_blank">

See full explanation on the GitHub pull-request.

</read-more>

## asyncEntry

Enables generation of an async entry point for the Vue bundle, aiding module federation support.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    asyncEntry: true,
  },
});
```

## externalVue

Externalizes `vue`, `@vue/*` and `vue-router` when building.

_Enabled by default._

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    externalVue: true,
  },
});
```

<warning>

This feature will likely be removed in a near future.

</warning>

## emitRouteChunkError

Emits `app:chunkError` hook when there is an error loading vite/webpack chunks. Default behavior is to perform a reload of the new route on navigation to a new route when a chunk fails to load.

If you set this to `'automatic-immediate'` Nuxt will reload the current route immediately, instead of waiting for a navigation. This is useful for chunk errors that are not triggered by navigation, e.g., when your Nuxt app fails to load a [lazy component](/docs/4.x/guide/directory-structure/components#dynamic-imports). A potential downside of this behavior is undesired reloads, e.g., when your app does not need the chunk that caused the error.

You can disable automatic handling by setting this to `false`, or handle chunk errors manually by setting it to `manual`.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    emitRouteChunkError: "automatic", // or 'automatic-immediate', 'manual' or false
  },
});
```

## restoreState

Allows Nuxt app state to be restored from `sessionStorage` when reloading the page after a chunk error or manual [`reloadNuxtApp()`](/docs/4.x/api/utils/reload-nuxt-app) call.

To avoid hydration errors, it will be applied only after the Vue app has been mounted, meaning there may be a flicker on initial load.

<important>

Consider carefully before enabling this as it can cause unexpected behavior,
and consider providing explicit keys to [`useState`](/docs/4.x/api/composables/use-state) as auto-generated keys may not match across builds.

</important>

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    restoreState: true,
  },
});
```

## inlineRouteRules

Define route rules at the page level using [`defineRouteRules`](/docs/4.x/api/utils/define-route-rules).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    inlineRouteRules: true,
  },
});
```

Matching route rules will be created, based on the page's `path`.

<read-more to="/docs/api/utils/define-route-rules" icon="i-lucide-square-function">

Read more in `defineRouteRules` utility.

</read-more>

<read-more to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal">

</read-more>

## renderJsonPayloads

Allows rendering of JSON payloads with support for revivifying complex types.

_Enabled by default._

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    renderJsonPayloads: true,
  },
});
```

## noVueServer

Disables Vue server renderer endpoint within Nitro.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    noVueServer: true,
  },
});
```

## payloadExtraction

Enables extraction of payloads of pages generated with `nuxt generate`.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: true,
  },
});
```

## clientFallback

Enables the experimental [`<NuxtClientFallback>`](/docs/4.x/api/components/nuxt-client-fallback) component for rendering content on the client if there's an error in SSR.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    clientFallback: true,
  },
});
```

## crossOriginPrefetch

Enables cross-origin prefetch using the Speculation Rules API.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    crossOriginPrefetch: true,
  },
});
```

<read-more to="https://wicg.github.io/nav-speculation/prefetch.html" icon="i-simple-icons-w3c" target="_blank">

Read more about the **Speculation Rules API**.

</read-more>

## viewTransition

Enables View Transition API integration with client-side router.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
});
```

<link-example target="_blank" to="https://stackblitz.com/edit/nuxt-view-transitions?file=app.vue">

</link-example>

<read-more to="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" icon="i-simple-icons-mdnwebdocs" target="_blank">

Read more about the **View Transition API**.

</read-more>

## writeEarlyHints

Enables writing of early hints when using node server.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    writeEarlyHints: true,
  },
});
```

## componentIslands

Enables experimental component islands support with [`<NuxtIsland>`](/docs/4.x/api/components/nuxt-island) and `.island.vue` files.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    componentIslands: true, // false or 'local+remote'
  },
});
```

<read-more to="/docs/guide/directory-structure/components#server-components">

</read-more>

<read-more to="https://github.com/nuxt/nuxt/issues/19772" icon="i-simple-icons-github" target="_blank">

You can follow the server components roadmap on GitHub.

</read-more>

## localLayerAliases

Resolve `~`, `~~`, `@` and `@@` aliases located within layers with respect to their layer source and root directories.

_Enabled by default._

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    localLayerAliases: true,
  },
});
```

## typedPages

Enable the new experimental typed router using [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    typedPages: true,
  },
});
```

Out of the box, this will enable typed usage of [`navigateTo`](/docs/4.x/api/utils/navigate-to), [`<NuxtLink>`](/docs/4.x/api/components/nuxt-link), [`router.push()`](/docs/4.x/api/composables/use-router) and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`.

<important>

If you use `pnpm` without `shamefully-hoist=true`, you will need to have `unplugin-vue-router` installed as a devDependency in order for this feature to work.

</important>

<video-accordion title="Watch a video from Daniel Roe explaining type-safe routing in Nuxt" video-id="SXk-L19gTZk">

</video-accordion>

## watcher

Set an alternative watcher that will be used as the watching service for Nuxt.

Nuxt uses `chokidar-granular` by default, which will ignore top-level directories
(like `node_modules` and `.git`) that are excluded from watching.

You can set this instead to `parcel` to use `@parcel/watcher`, which may improve
performance in large projects or on Windows platforms.

You can also set this to `chokidar` to watch all files in your source directory.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    watcher: "chokidar-granular", // 'chokidar' or 'parcel' are also options
  },
});
```

## sharedPrerenderData

Nuxt automatically shares payload _data_ between pages that are prerendered. This can result in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and fetch the same data in different pages.

You can disable this feature if needed.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    sharedPrerenderData: false,
  },
});
```

<video-accordion title="Watch a video from Alexander Lichter about the experimental sharedPrerenderData" video-id="1jUupYHVvrU">

</video-accordion>

It is particularly important when enabling this feature to make sure that any unique key of your data
is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch
data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch`
should do this automatically for you.)

```ts
// This would be unsafe in a dynamic page (e.g. `[slug].vue`) because the route slug makes a difference
// to the data fetched, but Nuxt can't know that because it's not reflected in the key.
const route = useRoute();
const { data } = await useAsyncData(async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`);
});
// Instead, you should use a key that uniquely identifies the data fetched.
const { data } = await useAsyncData(route.params.slug, async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`);
});
```

## clientNodeCompat

With this feature, Nuxt will automatically polyfill Node.js imports in the client build using [`unenv`](https://github.com/unjs/unenv).

<note>

To make globals like `Buffer` work in the browser, you need to manually inject them.

```ts
import { Buffer } from "node:buffer";

globalThis.Buffer = globalThis.Buffer || Buffer;
```

</note>

## scanPageMeta

Nuxt exposing some route metadata defined in `definePageMeta` at build-time to modules (specifically `alias`, `name`, `path`, `redirect`, `props` and `middleware`).

This only works with static or strings/arrays rather than variables or conditional assignment. See [original issue](https://github.com/nuxt/nuxt/issues/24770) for more information and context.

By default page metadata is only scanned after all routes have been registered in `pages:extend`. Then another hook, `pages:resolved` will be called.

You can disable this feature if it causes issues in your project.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    scanPageMeta: false,
  },
});
```

## cookieStore

Enables CookieStore support to listen for cookie updates (if supported by the browser) and refresh `useCookie` ref values.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    cookieStore: true,
  },
});
```

<read-more to="https://developer.mozilla.org/en-US/docs/Web/API/CookieStore" icon="i-simple-icons-mdnwebdocs" target="_blank">

Read more about the **CookieStore**.

</read-more>

## buildCache

Caches Nuxt build artifacts based on a hash of the configuration and source files.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    buildCache: true,
  },
});
```

When enabled, changes to the following files will trigger a full rebuild:

```bash [Directory structure]
.nuxtrc
.npmrc
package.json
package-lock.json
yarn.lock
pnpm-lock.yaml
tsconfig.json
bun.lock
bun.lockb
```

In addition, any changes to files within `srcDir` will trigger a rebuild of the Vue client/server bundle. Nitro will always be rebuilt (though work is in progress to allow Nitro to announce its cacheable artifacts and their hashes).

<note>

A maximum of 10 cache tarballs are kept.

</note>

## extraPageMetaExtractionKeys

The `definePageMeta()` macro is a useful way to collect build-time meta about pages. Nuxt itself provides a set list of supported keys which is used to power some of the internal features such as redirects, page aliases and custom paths.

This option allows passing additional keys to extract from the page metadata when using `scanPageMeta`.

```vue
<script lang="ts" setup>
definePageMeta({
  foo: "bar",
});
</script>
```

```ts
export default defineNuxtConfig({
  experimental: {
    extraPageMetaExtractionKeys: ["foo"],
  },
  hooks: {
    "pages:resolved"(ctx) {
      // ✅ foo is available
    },
  },
});
```

This allows modules to access additional metadata from the page metadata in the build context. If you are using this within a module, it's recommended also to [augment the `NuxtPage` types with your keys](/docs/4.x/guide/directory-structure/pages#typing-custom-metadata).

## normalizeComponentNames

Nuxt updates auto-generated Vue component names to match the full component name you would use to auto-import the component.

If you encounter issues, you can disable this feature.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    normalizeComponentNames: false,
  },
});
```

By default, if you haven't set it manually, Vue will assign a component name that matches
the filename of the component.

```bash [Directory structure]
├─ components/
├─── SomeFolder/
├───── MyComponent.vue
```

In this case, the component name would be `MyComponent`, as far as Vue is concerned. If you wanted to use `<KeepAlive>` with it, or identify it in the Vue DevTools, you would need to use this component.

But in order to auto-import it, you would need to use `SomeFolderMyComponent`.

By setting `experimental.normalizeComponentNames`, these two values match, and Vue will generate a component name that matches the Nuxt pattern for component naming.

## spaLoadingTemplateLocation

When rendering a client-only page (with `ssr: false`), we optionally render a loading screen (from `~/spa-loading-template.html`).

It can be set to `within`, which will render it like this:

```html
<div id="__nuxt">
  <!-- spa loading template -->
</div>
```

Alternatively, you can render the template alongside the Nuxt app root by setting it to `body`:

```html
<div id="__nuxt"></div>
<!-- spa loading template -->
```

This avoids a white flash when hydrating a client-only page.

## browserDevtoolsTiming

Enables performance markers for Nuxt hooks in browser devtools. This adds performance markers that you can track in the Performance tab of Chromium-based browsers, which is useful for debugging and optimizing performance.

This is enabled by default in development mode. If you need to disable this feature, it is possible to do so:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    browserDevtoolsTiming: false,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/29922" icon="i-simple-icons-github" target="_blank" color="gray">

See PR #29922 for implementation details.

</read-more>

<read-more to="https://developer.chrome.com/docs/devtools/performance/extension#tracks" icon="i-simple-icons-googlechrome" target="_blank" color="gray">

Learn more about Chrome DevTools Performance API.

</read-more>

## debugModuleMutation

Records mutations to `nuxt.options` in module context, helping to debug configuration changes made by modules during the Nuxt initialization phase.

This is enabled by default when `debug` mode is enabled. If you need to disable this feature, it is possible to do so:

To enable it explicitly:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    debugModuleMutation: true,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/30555" icon="i-simple-icons-github" target="_blank" color="gray">

See PR #30555 for implementation details.

</read-more>

## lazyHydration

This enables hydration strategies for `<Lazy>` components, which improves performance by deferring hydration of components until they're needed.

Lazy hydration is enabled by default, but you can disable this feature:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    lazyHydration: false,
  },
});
```

<read-more to="/docs/guide/directory-structure/components#delayed-or-lazy-hydration" icon="i-simple-icons-github" color="gray">

Read more about lazy hydration.

</read-more>

## templateImportResolution

Controls how imports in Nuxt templates are resolved. By default, Nuxt attempts to resolve imports in templates relative to the module that added them.

This is enabled by default, so if you're experiencing resolution conflicts in certain environments, you can disable this behavior:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    templateImportResolution: false,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/31175" icon="i-simple-icons-github" target="_blank" color="gray">

See PR #31175 for implementation details.

</read-more>

## decorators

This option enables enabling decorator syntax across your entire Nuxt/Nitro app, powered by [esbuild](https://github.com/evanw/esbuild/releases/tag/v0.21.3).

For a long time, TypeScript has had support for decorators via `compilerOptions.experimentalDecorators`. This implementation predated the TC39 standardization process. Now, decorators are a [Stage 3 Proposal](https://github.com/tc39/proposal-decorators), and supported without special configuration in TS 5.0+ (see [https://github.com/microsoft/TypeScript/pull/52582](https://github.com/microsoft/TypeScript/pull/52582) and [https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators)).

Enabling `experimental.decorators` enables support for the TC39 proposal, **NOT** for TypeScript's previous `compilerOptions.experimentalDecorators` implementation.

<warning>

Note that there may be changes before this finally lands in the JS standard.

</warning>

### Usage

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    decorators: true,
  },
});
```

```ts [app.vue]
function something(_method: () => unknown) {
  return () => "decorated";
}

class SomeClass {
  @something
  public someMethod() {
    return "initial";
  }
}

const value = new SomeClass().someMethod();
// this will return 'decorated'
```

## purgeCachedData

Nuxt will automatically purge cached data from `useAsyncData` and `nuxtApp.static.data`. This helps prevent memory leaks
and ensures fresh data is loaded when needed, but it is possible to disable it:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    purgeCachedData: false,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/31379" icon="i-simple-icons-github" target="_blank" color="gray">

See PR #31379 for implementation details.

</read-more>

## granularCachedData

Whether to call and use the result from `getCachedData` when refreshing data for `useAsyncData` and `useFetch` (whether by `watch`, `refreshNuxtData()`, or a manual `refresh()` call.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    granularCachedData: true,
  },
});
```

<read-more to="https://github.com/nuxt/nuxt/pull/31373" icon="i-simple-icons-github" target="_blank" color="gray">

See PR #31373 for implementation details.

</read-more>

## pendingWhenIdle

If set to `false`, the `pending` object returned from `useAsyncData`, `useFetch`, `useLazyAsyncData` and `useLazyFetch` will be a computed property that is `true` only when `status` is also pending.

That means that when `immediate: false` is passed, `pending` will be `false` until the first request is made.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    pendingWhenIdle: false,
  },
});
```

# Features

> Enable or disable optional Nuxt features to unlock new possibilities.

Some features of Nuxt are available on an opt-in basis, or can be disabled based on your needs.

## `features`

### inlineStyles

Inlines styles when rendering HTML. This is currently available only when using Vite.

You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  features: {
    inlineStyles: false, // or a function to determine inlining
  },
});
```

### noScripts

Disables rendering of Nuxt scripts and JS resource hints. Can also be configured granularly within `routeRules`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  features: {
    noScripts: true,
  },
});
```

## `future`

There is also a `future` namespace for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### compatibilityVersion

This is used for enabling early access to Nuxt features or flags.

It is not configurable yet in Nuxt 4, but once we begin merging breaking changes for v5, it will be possible to enable it.

### typescriptBundlerResolution

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting
for frameworks like Nuxt and [Vite](https://vite.dev/guide/performance.html#reduce-resolve-operations).

It improves type support when using modern libraries with `exports`.

See [the original TypeScript pull request](https://github.com/microsoft/TypeScript/pull/51669).

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  future: {
    typescriptBundlerResolution: true,
  },
});
```

# How Nuxt Works?

> Nuxt is a minimal but highly customizable framework to build web applications.

This guide helps you better understand Nuxt internals to develop new solutions and module integrations on top of Nuxt.

## The Nuxt Interface

When you start Nuxt in development mode with [`nuxt dev`](/docs/4.x/api/commands/dev) or building a production application with [`nuxt build`](/docs/4.x/api/commands/build),
a common context will be created, referred to as `nuxt` internally. It holds normalized options merged with `nuxt.config` file,
some internal state, and a powerful [hooking system](/docs/4.x/api/advanced/hooks) powered by [unjs/hookable](https://github.com/unjs/hookable)
allowing different components to communicate with each other. You can think of it as **Builder Core**.

This context is globally available to be used with [Nuxt Kit](/docs/4.x/guide/going-further/kit) composables.
Therefore only one instance of Nuxt is allowed to run per process.

To extend the Nuxt interface and hook into different stages of the build process, we can use [Nuxt Modules](/docs/4.x/guide/going-further/modules).

For more details, check out [the source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/core/nuxt.ts).

## The NuxtApp Interface

When rendering a page in the browser or on the server, a shared context will be created, referred to as `nuxtApp`.
This context keeps vue instance, runtime hooks, and internal states like ssrContext and payload for hydration.
You can think of it as **Runtime Core**.

This context can be accessed using [`useNuxtApp()`](/docs/4.x/api/composables/use-nuxt-app) composable within Nuxt plugins and `<script setup>` and vue composables.
Global usage is possible for the browser but not on the server, to avoid sharing context between users.

Since [`useNuxtApp`](/docs/4.x/api/composables/use-nuxt-app) throws an exception if context is currently unavailable, if your composable does not always require `nuxtApp`, you can use [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp) instead, which will return `null` instead of throwing an exception.

To extend the `nuxtApp` interface and hook into different stages or access contexts, we can use [Nuxt Plugins](/docs/4.x/guide/directory-structure/plugins).

Check [Nuxt App](/docs/4.x/api/composables/use-nuxt-app) for more information about this interface.

`nuxtApp` has the following properties:

```js
const nuxtApp = {
  vueApp, // the global Vue application: https://vuejs.org/api/application.html#application-api

  versions, // an object containing Nuxt and Vue versions

  // These let you call and add runtime NuxtApp hooks
  // https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts#L18
  hooks,
  hook,
  callHook,

  // Only accessible on server-side
  ssrContext: {
    url,
    req,
    res,
    runtimeConfig,
    noSSR,
  },

  // This will be stringified and passed from server to client
  payload: {
    serverRendered: true,
    data: {},
    state: {}
  }

  provide: (name: string, value: any) => void
}
```

For more details, check out [the source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts).

## Runtime Context vs. Build Context

Nuxt builds and bundles project using Node.js but also has a runtime side.

While both areas can be extended, that runtime context is isolated from build-time. Therefore, they are not supposed to share state, code, or context other than runtime configuration!

`nuxt.config` and [Nuxt Modules](/docs/4.x/guide/going-further/modules) can be used to extend the build context, and [Nuxt Plugins](/docs/4.x/guide/directory-structure/plugins) can be used to extend runtime.

When building an application for production, `nuxt build` will generate a standalone build in the `.output` directory, independent of `nuxt.config` and [Nuxt modules](/docs/4.x/guide/going-further/modules).

# Runtime Config

> Nuxt provides a runtime config API to expose configuration and secrets within your application.

## Exposing

To expose config and environment variables to the rest of your app, you will need to define runtime configuration in your [`nuxt.config`](/docs/4.x/guide/directory-structure/nuxt-config) file, using the [`runtimeConfig`](/docs/4.x/api/nuxt-config#runtimeconfig) option.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: "/api",
    },
  },
});
```

When adding `apiBase` to the `runtimeConfig.public`, Nuxt adds it to each page payload. We can universally access `apiBase` in both server and browser.

```ts
const runtimeConfig = useRuntimeConfig();

console.log(runtimeConfig.apiSecret);
console.log(runtimeConfig.public.apiBase);
```

<tip>

Public runtime config is accessible in Vue templates with `$config.public`.

</tip>

### Serialization

Your runtime config will be serialized before being passed to Nitro. This means that anything that cannot be serialized and then deserialized (such as functions, Sets, Maps, and so on), should not be set in your `nuxt.config`.

Instead of passing non-serializable objects or functions into your application from your `nuxt.config`, you can place this code in a Nuxt or Nitro plugin or middleware.

### Environment Variables

The most common way to provide configuration is by using [Environment Variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa).

<note>

The Nuxt CLI has built-in support for reading your `.env` file in development, build and generate. But when you run your built server, **your .env file will not be read**.

<read-more to="/docs/guide/directory-structure/env">

</read-more>
</note>

Runtime config values are **automatically replaced by matching environment variables at runtime**.

There are two key requirements:

1. Your desired variables must be defined in your `nuxt.config`. This ensures that arbitrary environment variables are not exposed to your application code.
2. Only a specially-named environment variable can override a runtime config property. That is, an uppercase environment variable starting with `NUXT_` which uses `_` to separate keys and case changes.

<warning>

Setting the default of `runtimeConfig` values to _differently named environment variables_ (for example setting `myVar` to `process.env.OTHER_VARIABLE`) will only work during build-time and will break on runtime.
It is advised to use environment variables that match the structure of your `runtimeConfig` object.

</warning>

<tip icon="i-lucide-video" target="_blank" to="https://youtu.be/_FYV5WfiWvs">

Watch a video from Alexander Lichter showcasing the top mistake developers make using runtimeConfig.

</tip>

#### Example

```ini [.env]
NUXT_API_SECRET=api_secret_token
NUXT_PUBLIC_API_BASE=https://nuxtjs.org
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: "", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});
```

## Reading

### Vue App

Within the Vue part of your Nuxt app, you will need to call [`useRuntimeConfig()`](/docs/4.x/api/composables/use-runtime-config) to access the runtime config.

<important>

The behavior is different between the client-side and server-side:

- On client-side, only keys in `runtimeConfig.public` and `runtimeConfig.app` (which is used by Nuxt internally) are available, and the object is both writable and reactive.
- On server-side, the entire runtime config is available, but it is read-only to avoid context sharing.

</important>

```vue [pages/index.vue]
<script setup lang="ts">
const config = useRuntimeConfig();

console.log("Runtime config:", config);
if (import.meta.server) {
  console.log("API secret:", config.apiSecret);
}
</script>

<template>
  <div>
    <div>Check developer console!</div>
  </div>
</template>
```

<caution>

**Security note:** Be careful not to expose runtime config keys to the client-side by either rendering them or passing them to `useState`.

</caution>

### Plugins

If you want to use the runtime config within any (custom) plugin, you can use [`useRuntimeConfig()`](/docs/4.x/api/composables/use-runtime-config) inside of your `defineNuxtPlugin` function.

```ts [plugins/config.ts]
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  console.log("API base URL:", config.public.apiBase);
});
```

### Server Routes

You can access runtime config within the server routes as well using `useRuntimeConfig`.

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const { apiSecret } = useRuntimeConfig(event);
  const result = await $fetch("https://my.api.com/test", {
    headers: {
      Authorization: `Bearer ${apiSecret}`,
    },
  });
  return result;
});
```

<note>

Giving the `event` as argument to `useRuntimeConfig` is optional, but it is recommended to pass it to get the runtime config overwritten by [environment variables](/docs/4.x/guide/going-further/runtime-config#environment-variables) at runtime for server routes.

</note>

## Typing Runtime Config

Nuxt tries to automatically generate a typescript interface from provided runtime config using [unjs/untyped](https://github.com/unjs/untyped).

But it is also possible to type your runtime config manually:

```ts [index.d.ts]
declare module "nuxt/schema" {
  interface RuntimeConfig {
    apiSecret: string;
  }
  interface PublicRuntimeConfig {
    apiBase: string;
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {};
```

<note>

`nuxt/schema` is provided as a convenience for end-users to access the version of the schema used by Nuxt in their project. Module authors should instead augment `@nuxt/schema`.

</note>
# Lifecycle Hooks

> Nuxt provides a powerful hooking system to expand almost every aspect using hooks.

<tip>

The hooking system is powered by [unjs/hookable](https://github.com/unjs/hookable).

</tip>

## Nuxt Hooks (Build Time)

These hooks are available for [Nuxt Modules](/docs/4.x/guide/going-further/modules) and build context.

### Within `nuxt.config.ts`

```js [nuxt.config.ts]
export default defineNuxtConfig({
  hooks: {
    close: () => {},
  },
});
```

### Within Nuxt Modules

```js
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("close", async () => {});
  },
});
```

<read-more to="/docs/api/advanced/hooks#nuxt-hooks-build-time">

Explore all available Nuxt hooks.

</read-more>

## App Hooks (Runtime)

App hooks can be mainly used by [Nuxt Plugins](/docs/4.x/guide/directory-structure/plugins) to hook into rendering lifecycle but could also be used in Vue composables.

```js [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:start", () => {
    /* your code goes here */
  });
});
```

<read-more to="/docs/api/advanced/hooks#app-hooks-runtime">

Explore all available App hooks.

</read-more>

## Server Hooks (Runtime)

These hooks are available for [server plugins](/docs/4.x/guide/directory-structure/server#server-plugins) to hook into Nitro's runtime behavior.

```js [~/server/plugins/test.ts]
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    console.log("render:html", html);
    html.bodyAppend.push("<hr>Appended by custom plugin");
  });

  nitroApp.hooks.hook("render:response", (response, { event }) => {
    console.log("render:response", response);
  });
});
```

<read-more to="/docs/api/advanced/hooks#nitro-app-hooks-runtime-server-side">

Learn more about available Nitro lifecycle hooks.

</read-more>

## Adding Custom Hooks

You can define your own custom hooks support by extending Nuxt's hook interfaces.

```ts
import { HookResult } from "@nuxt/schema";

declare module "#app" {
  interface RuntimeNuxtHooks {
    "your-nuxt-runtime-hook": () => HookResult;
  }
  interface NuxtHooks {
    "your-nuxt-hook": () => HookResult;
  }
}

declare module "nitropack/types" {
  interface NitroRuntimeHooks {
    "your-nitro-hook": () => void;
  }
}
```

# Nuxt Kit

> @nuxt/kit provides features for module authors.

Nuxt Kit provides composable utilities to make interacting with [Nuxt Hooks](/docs/4.x/api/advanced/hooks), the [Nuxt Interface](/docs/4.x/guide/going-further/internals#the-nuxt-interface) and developing [Nuxt Modules](/docs/4.x/guide/going-further/modules) super easy.

<read-more to="/docs/api/kit">

Discover all Nuxt Kit utilities.

</read-more>

## Usage

### Install Dependency

You can install the latest Nuxt Kit by adding it to the `dependencies` section of your `package.json`. However, please consider always explicitly installing the `@nuxt/kit` package even if it is already installed by Nuxt.

<note>

`@nuxt/kit` and `@nuxt/schema` are key dependencies for Nuxt. If you are installing it separately, make sure that the versions of `@nuxt/kit` and `@nuxt/schema` are equal to or greater than your `nuxt` version to avoid any unexpected behavior.

</note>

```json [package.json]
{
  "dependencies": {
    "@nuxt/kit": "npm:@nuxt/kit-nightly@latest"
  }
}
```

### Import Kit Utilities

```js [test.mjs]
import { useNuxt } from "@nuxt/kit";
```

<read-more to="/docs/api/kit">

</read-more>

<note>

Nuxt Kit utilities are only available for modules and not meant to be imported in runtime (components, Vue composables, pages, plugins, or server routes).

</note>

Nuxt Kit is an [esm-only package](/docs/4.x/guide/concepts/esm) meaning that you **cannot** `require('@nuxt/kit')`. As a workaround, use dynamic import in the CommonJS context:

```js [test.cjs]
// This does NOT work!
// const kit = require('@nuxt/kit')
async function main() {
  const kit = await import("@nuxt/kit");
}
main();
```

# NuxtApp

> In Nuxt, you can access runtime app context within composables, components and plugins.

In Nuxt, you can access runtime app context within composables, components and plugins.

<read-more to="https://v2.nuxt.com/docs/internals-glossary/context#the-context" target="_blank">

In Nuxt 2, this was referred to as **Nuxt context**.

</read-more>

## Nuxt App Interface

<read-more to="/docs/guide/going-further/internals#the-nuxtapp-interface">

Jump over the `NuxtApp` interface documentation.

</read-more>

## The Nuxt Context

Many composables and utilities, both built-in and user-made, may require access to the Nuxt instance. This doesn't exist everywhere on your application, because a fresh instance is created on every request.

Currently, the Nuxt context is only accessible in [plugins](/docs/4.x/guide/directory-structure/plugins), [Nuxt hooks](/docs/4.x/guide/going-further/hooks), [Nuxt middleware](/docs/4.x/guide/directory-structure/middleware) (if wrapped in `defineNuxtRouteMiddleware`), and [setup functions](https://vuejs.org/api/composition-api-setup.html) (in pages and components).

If a composable is called without access to the context, you may get an error stating that 'A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function.' In that case, you can also explicitly call functions within this context by using [`nuxtApp.runWithContext`](/docs/4.x/api/composables/use-nuxt-app#runwithcontext).

## Accessing NuxtApp

Within composables, plugins and components you can access `nuxtApp` with [`useNuxtApp()`](/docs/4.x/api/composables/use-nuxt-app):

```ts [composables/useMyComposable.ts]
export function useMyComposable() {
  const nuxtApp = useNuxtApp();
  // access runtime nuxt app instance
}
```

If your composable does not always need `nuxtApp` or you simply want to check if it is present or not, since [`useNuxtApp`](/docs/4.x/api/composables/use-nuxt-app) throws an exception, you can use [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp) instead.

Plugins also receive `nuxtApp` as the first argument for convenience.

<read-more to="/docs/guide/directory-structure/plugins">

</read-more>

## Providing Helpers

You can provide helpers to be usable across all composables and application. This usually happens within a Nuxt plugin.

```ts
const nuxtApp = useNuxtApp();
nuxtApp.provide("hello", (name) => `Hello ${name}!`);

console.log(nuxtApp.$hello("name")); // Prints "Hello name!"
```

<read-more to="/docs/guide/directory-structure/plugins#providing-helpers">

It is possible to inject helpers by returning an object with a `provide` key in plugins.

</read-more>

<read-more to="https://v2.nuxt.com/docs/directory-structure/plugins#inject-in-root--context" target="_blank">

In Nuxt 2 plugins, this was referred to as **inject function**.

</read-more>
# Authoring Nuxt Layers

> Nuxt provides a powerful system that allows you to extend the default files, configs, and much more.

Nuxt layers are a powerful feature that you can use to share and reuse partial Nuxt applications within a monorepo, or from a git repository or npm package. The layers structure is almost identical to a standard Nuxt application, which makes them easy to author and maintain.

<read-more to="/docs/getting-started/layers">

</read-more>

A minimal Nuxt layer directory should contain a [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) file to indicate it is a layer.

```ts [base/nuxt.config.ts]
export default defineNuxtConfig({});
```

Additionally, certain other files in the layer directory will be auto-scanned and used by Nuxt for the project extending this layer.

- [`components/*`](/docs/4.x/guide/directory-structure/components) - Extend the default components
- [`composables/*`](/docs/4.x/guide/directory-structure/composables) - Extend the default composables
- [`layouts/*`](/docs/4.x/guide/directory-structure/layouts) - Extend the default layouts
- [`pages/*`](/docs/4.x/guide/directory-structure/pages) - Extend the default pages
- [`plugins/*`](/docs/4.x/guide/directory-structure/plugins) - Extend the default plugins
- [`server/*`](/docs/4.x/guide/directory-structure/server) - Extend the default server endpoints & middleware
- [`utils/*`](/docs/4.x/guide/directory-structure/utils) - Extend the default utils
- [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config)- Extend the default nuxt config
- [`app.config.ts`](/docs/4.x/guide/directory-structure/app-config) - Extend the default app config

## Basic Example

<code-group>

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ["./base"],
});
```

```vue [app.vue]
<template>
  <BaseComponent />
</template>
```

```ts [base/nuxt.config.ts]
export default defineNuxtConfig({
  // Extending from base nuxt.config.ts!
  app: {
    head: {
      title: "Extending Configs is Fun!",
      meta: [
        {
          name: "description",
          content: "I am using the extends feature in Nuxt!",
        },
      ],
    },
  },
});
```

```vue [base/components/BaseComponent.vue]
<template>
  <h1>Extending Components is Fun!</h1>
</template>
```

</code-group>

## Starter Template

To get started you can initialize a layer with the [nuxt/starter/layer template](https://github.com/nuxt/starter/tree/layer). This will create a basic structure you can build upon. Execute this command within the terminal to get started:

```bash [Terminal]
npm create nuxt -- --template layer nuxt-layer
```

Follow up on the README instructions for the next steps.

## Publishing Layers

You can publish and share layers by either using a remote source or an npm package.

### Git Repository

You can use a git repository to share your Nuxt layer. Some examples:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    "github:username/repoName", // GitHub Remote Source
    "github:username/repoName/base", // GitHub Remote Source within /base directory
    "github:username/repoName#dev", // GitHub Remote Source from dev branch
    "github:username/repoName#v1.0.0", // GitHub Remote Source from v1.0.0 tag
    "gitlab:username/repoName", // GitLab Remote Source example
    "bitbucket:username/repoName", // Bitbucket Remote Source example
  ],
});
```

<tip>

If you want to extend a private remote source, you need to add the environment variable `GIGET_AUTH=<token>` to provide a token.

</tip>

<tip>

If you want to extend a remote source from a self-hosted GitHub or GitLab instance, you need to supply its URL with the `GIGET_GITHUB_URL=<url>` or `GIGET_GITLAB_URL=<url>` environment variable - or directly configure it with [the `auth` option](https://github.com/unjs/c12#extending-config-layer-from-remote-sources) in your `nuxt.config`.

</tip>

<warning>

Bear in mind that if you are extending a remote source as a layer, you will not be able to access its dependencies outside of Nuxt. For example, if the remote layer depends on an eslint plugin, this will not be usable in your eslint config. That is because these dependencies will be located in a special location (`node_modules/.c12/layer_name/node_modules/`) that is not accessible to your package manager.

</warning>

<note>

When using git remote sources, if a layer has npm dependencies and you wish to install them, you can do so by specifying `install: true` in your layer options.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [["github:username/repoName", { install: true }]],
});
```

</note>

### npm Package

You can publish Nuxt layers as an npm package that contains the files and dependencies you want to extend. This allows you to share your config with others, use it in multiple projects or use it privately.

To extend from an npm package, you need to make sure that the module is published to npm and installed in the user's project as a devDependency. Then you can use the module name to extend the current nuxt config:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    // Node Module with scope
    "@scope/moduleName",
    // or just the module name
    "moduleName",
  ],
});
```

To publish a layer directory as an npm package, you want to make sure that the `package.json` has the correct properties filled out. This will make sure that the files are included when the package is published.

```json [package.json]
{
  "name": "my-theme",
  "version": "1.0.0",
  "type": "module",
  "main": "./nuxt.config.ts",
  "dependencies": {},
  "devDependencies": {
    "nuxt": "^3.0.0"
  }
}
```

<important>

Make sure any dependency imported in the layer is **explicitly added** to the `dependencies`. The `nuxt` dependency, and anything only used for testing the layer before publishing, should remain in the `devDependencies` field.

</important>

Now you can proceed to publish the module to npm, either publicly or privately.

<important>

When publishing the layer as a private npm package, you need to make sure you log in, to authenticate with npm to download the node module.

</important>

## Tips

### Named Layer Aliases

Auto-scanned layers (from your `~~/layers` directory) automatically create aliases. For example, you can access your `~~/layers/test` layer via `#layers/test`.

If you want to create named layer aliases for other layers, you can specify a name in the configuration of the layer.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  $meta: {
    name: "example",
  },
});
```

This will produce an alias of `#layers/example` which points to your layer.

### Relative Paths and Aliases

When importing using global aliases (such as `~/` and `@/`) in a layer components and composables, note that these aliases are resolved relative to the user's project paths. As a workaround, you can **use relative paths** to import them, or use named layer aliases.

Also when using relative paths in `nuxt.config` file of a layer, (with exception of nested `extends`) they are resolved relative to user's project instead of the layer. As a workaround, use full resolved paths in `nuxt.config`:

```js [nuxt.config.ts]
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  css: [join(currentDir, "./assets/main.css")],
});
```

## Multi-Layer Support for Nuxt Modules

You can use the internal array `nuxt.options._layers` to support custom multi-layer handling for your modules.

```ts [modules/my-module.ts]
export default defineNuxtModule({
  setup(_options, nuxt) {
    for (const layer of nuxt.options._layers) {
      // You can check for a custom directory existence to extend for each layer
      console.log("Custom extension for", layer.cwd, layer.config);
    }
  },
});
```

**Notes:**

- Earlier items in the `_layers` array have higher priority and override later ones
- The user's project is the first item in the `_layers` array

## Going Deeper

Configuration loading and extends support is handled by [unjs/c12](https://github.com/unjs/c12), merged using [unjs/defu](https://github.com/unjs/defu) and remote git sources are supported using [unjs/giget](https://github.com/unjs/giget). Check the docs and source code to learn more.

<read-more to="https://github.com/nuxt/nuxt/issues/13367" icon="i-simple-icons-github" target="_blank">

Checkout our ongoing development to bring more improvements for layers support on GitHub.

</read-more>
# Debugging

> In Nuxt, you can get started with debugging your application directly in the browser as well as in your IDE.

## Sourcemaps

Sourcemaps are enabled for your server build by default, and for the client build in dev mode, but you can enable them more specifically in your configuration.

```ts
export default defineNuxtConfig({
  // or sourcemap: true
  sourcemap: {
    server: true,
    client: true,
  },
});
```

## Debugging with Node Inspector

You can use [Node inspector](https://nodejs.org/en/learn/getting-started/debugging) to debug Nuxt server-side.

```bash
nuxt dev --inspect
```

This will start Nuxt in `dev` mode with debugger active. If everything is working correctly a Node.js icon will appear on your Chrome DevTools and you can attach to the debugger.

<important>

Note that the Node.js and Chrome processes need to be run on the same platform. This doesn't work inside of Docker.

</important>

## Debugging in Your IDE

It is possible to debug your Nuxt app in your IDE while you are developing it.

### Example VS Code Debug Configuration

You may need to update the config below with a path to your web browser. For more information, visit the [VS Code documentation about debug configuration](https://go.microsoft.com/fwlink/?linkid=830387).

```json5
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  version: "0.2.0",
  configurations: [
    {
      type: "chrome",
      request: "launch",
      name: "client: chrome",
      url: "http://localhost:3000",
      webRoot: "${workspaceFolder}",
    },
    {
      type: "node",
      request: "launch",
      name: "server: nuxt",
      outputCapture: "std",
      program: "${workspaceFolder}/node_modules/nuxt/bin/nuxt.mjs",
      args: ["dev"],
    },
  ],
  compounds: [
    {
      name: "fullstack: nuxt",
      configurations: ["server: nuxt", "client: chrome"],
    },
  ],
}
```

If you prefer your usual browser extensions, add this to the _chrome_ configuration above:

```json5
"userDataDir": false,
```

### Example JetBrains IDEs Debug Configuration

You can also debug your Nuxt app in JetBrains IDEs such as IntelliJ IDEA, WebStorm, or PhpStorm.

1. Create a new file in your project root directory and name it `nuxt.run.xml`.
2. Open the `nuxt.run.xml` file and paste the following debug configuration:

```html
<component name="ProjectRunConfigurationManager">
  <configuration
    default="false"
    name="client: chrome"
    type="JavascriptDebugType"
    uri="http://localhost:3000"
    useFirstLineBreakpoints="true"
  >
    <method v="2" />
  </configuration>

  <configuration
    default="false"
    name="server: nuxt"
    type="NodeJSConfigurationType"
    application-parameters="dev"
    path-to-js-file="$PROJECT_DIR$/node_modules/nuxt/bin/nuxt.mjs"
    working-dir="$PROJECT_DIR$"
  >
    <method v="2" />
  </configuration>

  <configuration
    default="false"
    name="fullstack: nuxt"
    type="CompoundRunConfigurationType"
  >
    <toRun name="client: chrome" type="JavascriptDebugType" />
    <toRun name="server: nuxt" type="NodeJSConfigurationType" />
    <method v="2" />
  </configuration>
</component>
```

### Other IDEs

If you have another IDE and would like to contribute sample configuration, feel free to [open a PR](https://github.com/nuxt/nuxt/edit/main/docs/2.guide/3.going-further/9.debugging.md)!

# assets

> The assets/ directory is used to add all the website's assets that the build tool will process.

The directory usually contains the following types of files:

- Stylesheets (CSS, SASS, etc.)
- Fonts
- Images that won't be served from the [`public/`](/docs/4.x/guide/directory-structure/public) directory.

If you want to serve assets from the server, we recommend taking a look at the [`public/`](/docs/4.x/guide/directory-structure/public) directory.

<read-more to="/docs/getting-started/assets">

</read-more>
# components

> The components/ directory is where you put all your Vue components.

Nuxt automatically imports any components in this directory (along with components that are registered by any modules you may be using).

```bash [Directory Structure]
-| components/
---| AppHeader.vue
---| AppFooter.vue
```

```html [app.vue]
<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
```

## Component Names

If you have a component in nested directories such as:

```bash [Directory Structure]
-| components/
---| base/
-----| foo/
-------| Button.vue
```

... then the component's name will be based on its own path directory and filename, with duplicate segments being removed. Therefore, the component's name will be:

```html
<BaseFooButton />
```

<note>

For clarity, we recommend that the component's filename matches its name. So, in the example above, you could rename `Button.vue` to be `BaseFooButton.vue`.

</note>

If you want to auto-import components based only on its name, not path, then you need to set `pathPrefix` option to `false` using extended form of the configuration object:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false, // [!code ++]
    },
  ],
});
```

This registers the components using the same strategy as used in Nuxt 2. For example, `~/components/Some/MyComponent.vue` will be usable as `<MyComponent>` and not `<SomeMyComponent>`.

## Dynamic Components

If you want to use the Vue `<component :is="someComputedComponent">` syntax, you need to use the `resolveComponent` helper provided by Vue or import the component directly from `#components` and pass it into `is` prop.

For example:

```vue [pages/index.vue]
<script setup lang="ts">
import { SomeComponent } from "#components";

const MyButton = resolveComponent("MyButton");
</script>

<template>
  <component :is="clickable ? MyButton : 'div'" />
  <component :is="SomeComponent" />
</template>
```

<important>

If you are using `resolveComponent` to handle dynamic components, make sure not to insert anything but the name of the component, which must be a literal string and not be or contain a variable. The string is statically analyzed at the compilation step.

</important>

<video-accordion title="Watch Daniel Roe's short video about resolveComponent()" video-id="4kq8E5IUM2U">

</video-accordion>

Alternatively, though not recommended, you can register all your components globally, which will create async chunks for all your components and make them available throughout your application.

```diff
export default defineNuxtConfig({
    components: {
+     global: true,
+     dirs: ['~/components']
    },
  })
```

You can also selectively register some components globally by placing them in a `~/components/global` directory, or by using a `.global.vue` suffix in the filename. As noted above, each global component is rendered in a separate chunk, so be careful not to overuse this feature.

<note>

The `global` option can also be set per component directory.

</note>

## Dynamic Imports

To dynamically import a component (also known as lazy-loading a component) all you need to do is add the `Lazy` prefix to the component's name. This is particularly useful if the component is not always needed.

By using the `Lazy` prefix you can delay loading the component code until the right moment, which can be helpful for optimizing your JavaScript bundle size.

```vue [pages/index.vue]
<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

## Delayed (or Lazy) Hydration

Lazy components are great for controlling the chunk sizes in your app, but they don't always enhance runtime performance, as they still load eagerly unless conditionally rendered. In real-world applications, some pages may include a lot of content and a lot of components, and most of the time not all of them need to be interactive as soon as the page is loaded. Having them all load eagerly can negatively impact performance.

In order to optimize your app, you may want to delay the hydration of some components until they're visible, or until the browser is done with more important tasks.

Nuxt supports this using lazy (or delayed) hydration, allowing you to control when components become interactive.

### Hydration Strategies

Nuxt provides a range of built-in hydration strategies. Only one strategy can be used per lazy component.

<warning>

Currently Nuxt's built-in lazy hydration only works in single-file components (SFCs), and requires you to define the prop in the template (rather than spreading an object of props via `v-bind`). It also does not work with direct imports from `#components`.

</warning>

#### `hydrate-on-visible`

Hydrates the component when it becomes visible in the viewport.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

<read-more to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="IntersectionObserver options">

Read more about the options for `hydrate-on-visible`.

</read-more>

<note>

Under the hood, this uses Vue's built-in [`hydrateOnVisible` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-visible).

</note>

#### `hydrate-on-idle`

Hydrates the component when the browser is idle. This is suitable if you need the component to load as soon as possible, but not block the critical rendering path.

You can also pass a number which serves as a max timeout.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-on-idle />
  </div>
</template>
```

<note>

Under the hood, this uses Vue's built-in [`hydrateOnIdle` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-idle).

</note>

#### `hydrate-on-interaction`

Hydrates the component after a specified interaction (e.g., click, mouseover).

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

If you do not pass an event or list of events, it defaults to hydrating on `pointerenter`, `click` and `focus`.

<note>

Under the hood, this uses Vue's built-in [`hydrateOnInteraction` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-interaction).

</note>

#### `hydrate-on-media-query`

Hydrates the component when the window matches a media query.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-on-media-query="(max-width: 768px)" />
  </div>
</template>
```

<note>

Under the hood, this uses Vue's built-in [`hydrateOnMediaQuery` strategy](https://vuejs.org/guide/components/async.html#hydrate-on-media-query).

</note>

#### `hydrate-after`

Hydrates the component after a specified delay (in milliseconds).

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent :hydrate-after="2000" />
  </div>
</template>
```

#### `hydrate-when`

Hydrates the component based on a boolean condition.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent :hydrate-when="isReady" />
  </div>
</template>
<script setup lang="ts">
const isReady = ref(false);
function myFunction() {
  // trigger custom hydration strategy...
  isReady.value = true;
}
</script>
```

#### `hydrate-never`

Never hydrates the component.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-never />
  </div>
</template>
```

### Listening to Hydration Events

All delayed hydration components emit a `@hydrated` event when they are hydrated.

```vue [pages/index.vue]
<template>
  <div>
    <LazyMyComponent hydrate-on-visible @hydrated="onHydrate" />
  </div>
</template>

<script setup lang="ts">
function onHydrate() {
  console.log("Component has been hydrated!");
}
</script>
```

### Caveats and Best Practices

Delayed hydration can offer performance benefits, but it's essential to use it correctly:

1. **Prioritize In-Viewport Content:** Avoid delayed hydration for critical, above-the-fold content. It's best suited for content that isn't immediately needed.
2. **Conditional Rendering:** When using `v-if="false"` on a lazy component, you might not need delayed hydration. You can just use a normal lazy component.
3. **Shared State:** Be mindful of shared state (`v-model`) across multiple components. Updating the model in one component can trigger hydration in all components bound to that model.
4. **Use Each Strategy's Intended Use Case:** Each strategy is optimized for a specific purpose.

- `hydrate-when` is best for components that might not always need to be hydrated.
- `hydrate-after` is for components that can wait a specific amount of time.
- `hydrate-on-idle` is for components that can be hydrated when the browser is idle.

5. **Avoid hydrate-never on interactive components:** If a component requires user interaction, it should not be set to never hydrate.

## Direct Imports

You can also explicitly import components from `#components` if you want or need to bypass Nuxt's auto-importing functionality.

```vue [pages/index.vue]
<script setup lang="ts">
import { NuxtLink, LazyMountainsList } from "#components";

const show = ref(false);
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>
```

## Custom Directories

By default, only the `~/components` directory is scanned. If you want to add other directories, or change how the components are scanned within a subfolder of this directory, you can add additional directories to the configuration:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  components: [
    // ~/calendar-module/components/event/Update.vue => <EventUpdate />
    { path: "~/calendar-module/components" },

    // ~/user-module/components/account/UserDeleteDialog.vue => <UserDeleteDialog />
    { path: "~/user-module/components", pathPrefix: false },

    // ~/components/special-components/Btn.vue => <SpecialBtn />
    { path: "~/components/special-components", prefix: "Special" },

    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    "~/components",
  ],
});
```

<note>

Any nested directories need to be added first as they are scanned in order.

</note>

## npm Packages

If you want to auto-import components from an npm package, you can use [`addComponent`](/docs/4.x/api/kit/components#addcomponent) in a [local module](/docs/4.x/guide/directory-structure/modules) to register them.

<code-group>

```ts [~/modules/register-component.ts]twoslash
import { addComponent, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup() {
    // import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
    addComponent({
      name: "MyAutoImportedComponent",
      export: "MyComponent",
      filePath: "my-npm-package",
    });
  },
});
```

```vue [app.vue]
<template>
  <div>
    <!--  the component uses the name we specified and is auto-imported  -->
    <MyAutoImportedComponent />
  </div>
</template>
```

</code-group>

## Component Extensions

By default, any file with an extension specified in the [extensions key of `nuxt.config.ts`](/docs/4.x/api/nuxt-config#extensions) is treated as a component.
If you need to restrict the file extensions that should be registered as components, you can use the extended form of the components directory declaration and its `extensions` key:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      extensions: [".vue"], // [!code ++]
    },
  ],
});
```

## Client Components

If a component is meant to be rendered only client-side, you can add the `.client` suffix to your component.

```bash [Directory Structure]
| components/
--| Comments.client.vue
```

```vue [pages/example.vue]
<template>
  <div>
    <!-- this component will only be rendered on client side -->
    <Comments />
  </div>
</template>
```

<note>

This feature only works with Nuxt auto-imports and `#components` imports. Explicitly importing these components from their real paths does not convert them into client-only components.

</note>

<important>

`.client` components are rendered only after being mounted. To access the rendered template using `onMounted()`, add `await nextTick()` in the callback of the `onMounted()` hook.

</important>

<read-more to="/docs/api/components/client-only">

You can also achieve a similar result with the `<ClientOnly>` component.

</read-more>

## Server Components

Server components allow server-rendering individual components within your client-side apps. It's possible to use server components within Nuxt, even if you are generating a static site. That makes it possible to build complex sites that mix dynamic components, server-rendered HTML and even static chunks of markup.

Server components can either be used on their own or paired with a [client component](#paired-with-a-client-component).

<video-accordion title="Watch Learn Vue video about Nuxt Server Components" video-id="u1yyXe86xJM">

</video-accordion>

<tip icon="i-lucide-newspaper" target="_blank" to="https://roe.dev/blog/nuxt-server-components">

Read Daniel Roe's guide to Nuxt Server Components.

</tip>

### Standalone server components

Standalone server components will always be rendered on the server, also known as Islands components.

When their props update, this will result in a network request that will update the rendered HTML in-place.

Server components are currently experimental and in order to use them, you need to enable the 'component islands' feature in your nuxt.config:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    componentIslands: true,
  },
});
```

Now you can register server-only components with the `.server` suffix and use them anywhere in your application automatically.

```bash [Directory Structure]
-| components/
---| HighlightedMarkdown.server.vue
```

```vue [pages/example.vue]
<template>
  <div>
    <!--
      this will automatically be rendered on the server, meaning your markdown parsing + highlighting
      libraries are not included in your client bundle.
     -->
    <HighlightedMarkdown markdown="# Headline" />
  </div>
</template>
```

Server-only components use [`<NuxtIsland>`](/docs/4.x/api/components/nuxt-island) under the hood, meaning that `lazy` prop and `#fallback` slot are both passed down to it.

<warning>

Server components (and islands) must have a single root element. (HTML comments are considered elements as well.)

</warning>

<warning>

Props are passed to server components via URL query parameters, and are therefore limited by the possible length of a URL, so be careful not to pass enormous amounts of data to server components via props.

</warning>

<warning>

Be careful when nesting islands within other islands as each island adds some extra overhead.

</warning>

<warning>

Most features for server-only components and island components, such as slots and client components, are only available for single file components.

</warning>

#### Client components within server components

<note>

This feature needs `experimental.componentIslands.selectiveClient` within your configuration to be true.

</note>

You can partially hydrate a component by setting a `nuxt-client` attribute on the component you wish to be loaded client-side.

```vue [components/ServerWithClient.vue]
<template>
  <div>
    <HighlightedMarkdown markdown="# Headline" />
    <!-- Counter will be loaded and hydrated client-side -->
    <Counter nuxt-client :count="5" />
  </div>
</template>
```

<note>

This only works within a server component. Slots for client components are working only with `experimental.componentIsland.selectiveClient` set to `'deep'` and since they are rendered server-side, they are not interactive once client-side.

</note>

#### Server Component Context

When rendering a server-only or island component, `<NuxtIsland>` makes a fetch request which comes back with a `NuxtIslandResponse`. (This is an internal request if rendered on the server, or a request that you can see in the network tab if it's rendering on client-side navigation.)

This means:

- A new Vue app will be created server-side to create the `NuxtIslandResponse`.
- A new 'island context' will be created while rendering the component.
- You can't access the 'island context' from the rest of your app and you can't access the context of the rest of your app from the island component. In other words, the server component or island is _isolated_ from the rest of your app.
- Your plugins will run again when rendering the island, unless they have `env: { islands: false }` set (which you can do in an object-syntax plugin).

Within an island component, you can access its island context through `nuxtApp.ssrContext.islandContext`. Note that while island components are still marked as experimental, the format of this context may change.

<note>

Slots can be interactive and are wrapped within a `<div>` with `display: contents;`

</note>

### Paired with a Client component

In this case, the `.server` + `.client` components are two 'halves' of a component and can be used in advanced use cases for separate implementations of a component on server and client side.

```bash [Directory Structure]
-| components/
---| Comments.client.vue
---| Comments.server.vue
```

```vue [pages/example.vue]
<template>
  <div>
    <!-- this component will render Comments.server on the server then Comments.client once mounted in the browser -->
    <Comments />
  </div>
</template>
```

## Built-In Nuxt Components

There are a number of components that Nuxt provides, including `<ClientOnly>` and `<DevOnly>`. You can read more about them in the API documentation.

<read-more to="/docs/api">

</read-more>

## Library Authors

Making Vue component libraries with automatic tree-shaking and component registration is super easy. ✨

You can use the [`addComponentsDir`](/docs/4.x/api/kit/components#addcomponentsdir) method provided from the `@nuxt/kit` to register your components directory in your Nuxt module.

Imagine a directory structure like this:

```bash [Directory Structure]
-| node_modules/
---| awesome-ui/
-----| components/
-------| Alert.vue
-------| Button.vue
-----| nuxt.ts
-| pages/
---| index.vue
-| nuxt.config.ts
```

Then in `awesome-ui/nuxt.ts` you can use the `addComponentsDir` hook:

```tstwoslash
import { createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    const resolver = createResolver(import.meta.url)

    // Add ./components dir to the list
    addComponentsDir({
      path: resolver.resolve('./components'),
      prefix: 'awesome',
    })
  },
})
```

That's it! Now in your project, you can import your UI library as a Nuxt module in your `nuxt.config` file:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  modules: ["awesome-ui/nuxt"],
});
```

... and directly use the module components (prefixed with `awesome-`) in our `pages/index.vue`:

```vue
<template>
  <div>
    My <AwesomeButton>UI button</AwesomeButton>!
    <awesome-alert>Here's an alert!</awesome-alert>
  </div>
</template>
```

It will automatically import the components only if used and also support HMR when updating your components in `node_modules/awesome-ui/components/`.

<link-example to="/docs/examples/features/auto-imports">

</link-example>
# composables

> Use the composables/ directory to auto-import your Vue composables into your application.

## Usage

**Method 1:** Using named export

```js [composables/useFoo.ts]
export const useFoo = () => {
  return useState("foo", () => "bar");
};
```

**Method 2:** Using default export

```js [composables/use-foo.ts or composables/useFoo.ts]
// It will be available as useFoo() (camelCase of file name without extension)
export default function () {
  return useState("foo", () => "bar");
}
```

**Usage:** You can now use auto imported composable in `.js`, `.ts` and `.vue` files

```vue [app.vue]
<script setup lang="ts">
const foo = useFoo();
</script>

<template>
  <div>
    {{ foo }}
  </div>
</template>
```

<note>

The `composables/` directory in Nuxt does not provide any additional reactivity capabilities to your code. Instead, any reactivity within composables is achieved using Vue's Composition API mechanisms, such as ref and reactive. Note that reactive code is also not limited to the boundaries of the `composables/` directory. You are free to employ reactivity features wherever they're needed in your application.

</note>

<read-more to="/docs/guide/concepts/auto-imports">

</read-more>

<link-example to="/docs/examples/features/auto-imports">

</link-example>

## Types

Under the hood, Nuxt auto generates the file `.nuxt/imports.d.ts` to declare the types.

Be aware that you have to run [`nuxt prepare`](/docs/4.x/api/commands/prepare), [`nuxt dev`](/docs/4.x/api/commands/dev) or [`nuxt build`](/docs/4.x/api/commands/build) in order to let Nuxt generate the types.

<note>

If you create a composable without having the dev server running, TypeScript will throw an error, such as `Cannot find name 'useBar'.`

</note>

## Examples

### Nested Composables

You can use a composable within another composable using auto imports:

```js [composables/test.ts]
export const useFoo = () => {
  const nuxtApp = useNuxtApp();
  const bar = useBar();
};
```

### Access plugin injections

You can access [plugin injections](/docs/4.x/guide/directory-structure/plugins#providing-helpers) from composables:

```js [composables/test.ts]
export const useHello = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$hello;
};
```

## How Files Are Scanned

Nuxt only scans files at the top level of the [`composables/` directory](/docs/4.x/guide/directory-structure/composables), e.g.:

```bash [Directory Structure]
-| composables/
---| index.ts     // scanned
---| useFoo.ts    // scanned
---| nested/
-----| utils.ts   // not scanned
```

Only `composables/index.ts` and `composables/useFoo.ts` would be searched for imports.

To get auto imports working for nested modules, you could either re-export them (recommended) or configure the scanner to include nested directories:

**Example:** Re-export the composables you need from the `composables/index.ts` file:

```ts [composables/index.ts]
// Enables auto import for this export
export { utils } from "./nested/utils.ts";
```

**Example:** Scan nested directories inside the `composables/` folder:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  imports: {
    dirs: [
      // Scan top-level composables
      "~/composables",
      // ... or scan composables nested one level deep with a specific name and file extension
      "~/composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all composables within given directory
      "~/composables/**",
    ],
  },
});
```

# layouts

> Nuxt provides a layouts framework to extract common UI patterns into reusable layouts.

<tip icon="i-lucide-rocket">

For best performance, components placed in this directory will be automatically loaded via asynchronous import when used.

</tip>

## Enable Layouts

Layouts are enabled by adding [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout) to your [`app.vue`](/docs/4.x/guide/directory-structure/app):

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

To use a layout:

- Set a `layout` property in your page with [definePageMeta](/docs/4.x/api/utils/define-page-meta).
- Set the `name` prop of `<NuxtLayout>`.

<note>

The layout name is normalized to kebab-case, so `someLayout` becomes `some-layout`.

</note>

<note>

If no layout is specified, `layouts/default.vue` will be used.

</note>

<important>

If you only have a single layout in your application, we recommend using [`app.vue`](/docs/4.x/guide/directory-structure/app) instead.

</important>

<important>

Unlike other components, your layouts must have a single root element to allow Nuxt to apply transitions between layout changes - and this root element cannot be a `<slot />`.

</important>

## Default Layout

Add a `~/layouts/default.vue`:

```vue [layouts/default.vue]
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>
```

In a layout file, the content of the page will be displayed in the `<slot />` component.

## Named Layout

```bash [Directory Structure]
-| layouts/
---| default.vue
---| custom.vue
```

Then you can use the `custom` layout in your page:

```vue [pages/about.vue]twoslash
<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
```

<read-more to="/docs/guide/directory-structure/pages#page-metadata">

Learn more about `definePageMeta`.

</read-more>

You can directly override the default layout for all pages using the `name` property of [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout):

```vue [app.vue]
<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = "custom";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
```

If you have a layout in nested directories, the layout's name will be based on its own path directory and filename, with duplicate segments being removed.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Layout Name
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ~/layouts/desktop/default.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-default
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop-base/base.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-base
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop/index.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop
      </code>
    </td>
  </tr>
</tbody>
</table>

For clarity, we recommend that the layout's filename matches its name:

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Layout Name
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ~/layouts/desktop/DesktopDefault.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-default
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop-base/DesktopBase.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-base
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop/Desktop.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop
      </code>
    </td>
  </tr>
</tbody>
</table>

<link-example to="/docs/examples/features/layouts">

</link-example>

## Changing the Layout Dynamically

You can also use the [`setPageLayout`](/docs/4.x/api/utils/set-page-layout) helper to change the layout dynamically:

```vuetwoslash
<script setup lang="ts">
function enableCustomLayout () {
  setPageLayout('custom')
}
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div>
</template>
```

<link-example to="/docs/examples/features/layouts">

</link-example>

## Overriding a Layout on a Per-page Basis

If you are using pages, you can take full control by setting `layout: false` and then using the `<NuxtLayout>` component within the page.

<code-group>

```vue [pages/index.vue]
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Some header template content. </template>

      The rest of the page
    </NuxtLayout>
  </div>
</template>
```

```vue [layouts/custom.vue]
<template>
  <div>
    <header>
      <slot name="header"> Default header content </slot>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
```

</code-group>

<important>

If you use `<NuxtLayout>` within your pages, make sure it is not the root element (or [disable layout/page transitions](/docs/4.x/getting-started/transitions#disable-transitions)).

</important>
# layouts

> Nuxt provides a layouts framework to extract common UI patterns into reusable layouts.

<tip icon="i-lucide-rocket">

For best performance, components placed in this directory will be automatically loaded via asynchronous import when used.

</tip>

## Enable Layouts

Layouts are enabled by adding [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout) to your [`app.vue`](/docs/4.x/guide/directory-structure/app):

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

To use a layout:

- Set a `layout` property in your page with [definePageMeta](/docs/4.x/api/utils/define-page-meta).
- Set the `name` prop of `<NuxtLayout>`.

<note>

The layout name is normalized to kebab-case, so `someLayout` becomes `some-layout`.

</note>

<note>

If no layout is specified, `layouts/default.vue` will be used.

</note>

<important>

If you only have a single layout in your application, we recommend using [`app.vue`](/docs/4.x/guide/directory-structure/app) instead.

</important>

<important>

Unlike other components, your layouts must have a single root element to allow Nuxt to apply transitions between layout changes - and this root element cannot be a `<slot />`.

</important>

## Default Layout

Add a `~/layouts/default.vue`:

```vue [layouts/default.vue]
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>
```

In a layout file, the content of the page will be displayed in the `<slot />` component.

## Named Layout

```bash [Directory Structure]
-| layouts/
---| default.vue
---| custom.vue
```

Then you can use the `custom` layout in your page:

```vue [pages/about.vue]twoslash
<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
```

<read-more to="/docs/guide/directory-structure/pages#page-metadata">

Learn more about `definePageMeta`.

</read-more>

You can directly override the default layout for all pages using the `name` property of [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout):

```vue [app.vue]
<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = "custom";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
```

If you have a layout in nested directories, the layout's name will be based on its own path directory and filename, with duplicate segments being removed.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Layout Name
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ~/layouts/desktop/default.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-default
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop-base/base.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-base
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop/index.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop
      </code>
    </td>
  </tr>
</tbody>
</table>

For clarity, we recommend that the layout's filename matches its name:

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Layout Name
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ~/layouts/desktop/DesktopDefault.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-default
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop-base/DesktopBase.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop-base
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ~/layouts/desktop/Desktop.vue
      </code>
    </td>
    
    <td>
      <code>
        desktop
      </code>
    </td>
  </tr>
</tbody>
</table>

<link-example to="/docs/examples/features/layouts">

</link-example>

## Changing the Layout Dynamically

You can also use the [`setPageLayout`](/docs/4.x/api/utils/set-page-layout) helper to change the layout dynamically:

```vuetwoslash
<script setup lang="ts">
function enableCustomLayout () {
  setPageLayout('custom')
}
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <button @click="enableCustomLayout">Update layout</button>
  </div>
</template>
```

<link-example to="/docs/examples/features/layouts">

</link-example>

## Overriding a Layout on a Per-page Basis

If you are using pages, you can take full control by setting `layout: false` and then using the `<NuxtLayout>` component within the page.

<code-group>

```vue [pages/index.vue]
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Some header template content. </template>

      The rest of the page
    </NuxtLayout>
  </div>
</template>
```

```vue [layouts/custom.vue]
<template>
  <div>
    <header>
      <slot name="header"> Default header content </slot>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
```

</code-group>

<important>

If you use `<NuxtLayout>` within your pages, make sure it is not the root element (or [disable layout/page transitions](/docs/4.x/getting-started/transitions#disable-transitions)).

</important>
# pages

> Nuxt provides file-based routing to create routes within your web application.

<note>

To reduce your application's bundle size, this directory is **optional**, meaning that [`vue-router`](https://router.vuejs.org) won't be included if you only use [`app.vue`](/docs/4.x/guide/directory-structure/app). To force the pages system, set `pages: true` in `nuxt.config` or have a [`router.options.ts`](/docs/4.x/guide/recipes/custom-routing#using-approuteroptions).

</note>

## Usage

Pages are Vue components and can have any [valid extension](/docs/4.x/api/configuration/nuxt-config#extensions) that Nuxt supports (by default `.vue`, `.js`, `.jsx`, `.mjs`, `.ts` or `.tsx`).

Nuxt will automatically create a route for every page in your `~/pages/` directory.

<code-group>

```vue [pages/index.vue]
<template>
  <h1>Index page</h1>
</template>
```

```ts [pages/index.ts]twoslash
// https://vuejs.org/guide/extras/render-function.html
export default defineComponent({
  render() {
    return h("h1", "Index page");
  },
});
```

```tsx [pages/index.tsx]twoslash
// https://nuxt.com/docs/examples/advanced/jsx
// https://vuejs.org/guide/extras/render-function.html#jsx-tsx
export default defineComponent({
  render() {
    return <h1>Index page</h1>;
  },
});
```

</code-group>

The `pages/index.vue` file will be mapped to the `/` route of your application.

If you are using [`app.vue`](/docs/4.x/guide/directory-structure/app), make sure to use the [`<NuxtPage/>`](/docs/4.x/api/components/nuxt-page) component to display the current page:

```vue [app.vue]
<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </div>
</template>
```

Pages **must have a single root element** to allow [route transitions](/docs/4.x/getting-started/transitions) between pages. HTML comments are considered elements as well.

This means that when the route is server-rendered, or statically generated, you will be able to see its contents correctly, but when you navigate towards that route during client-side navigation the transition between routes will fail and you'll see that the route will not be rendered.

Here are some examples to illustrate what a page with a single root element looks like:

<code-group>

```vue [pages/working.vue]
<template>
  <div>
    <!-- This page correctly has only one single root element -->
    Page content
  </div>
</template>
```

```vue [pages/bad-1.vue]
<template>
  <!-- This page will not render when route changes during client side navigation, because of this comment -->
  <div>Page content</div>
</template>
```

```vue [pages/bad-2.vue]
<template>
  <div>This page</div>
  <div>Has more than one root element</div>
  <div>
    And will not render when route changes during client side navigation
  </div>
</template>
```

</code-group>

## Dynamic Routes

If you place anything within square brackets, it will be turned into a [dynamic route](https://router.vuejs.org/guide/essentials/dynamic-matching.html) parameter. You can mix and match multiple parameters and even non-dynamic text within a file name or directory.

If you want a parameter to be _optional_, you must enclose it in double square brackets - for example, `~/pages/[[slug]]/index.vue` or `~/pages/[[slug]].vue` will match both `/` and `/test`.

```bash [Directory Structure]
-| pages/
---| index.vue
---| users-[group]/
-----| [id].vue
```

Given the example above, you can access group/id within your component via the `$route` object:

```vue [pages/users-[group]/[id].vue]
<template>
  <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
</template>
```

Navigating to `/users-admins/123` would render:

```html
<p>admins - 123</p>
```

If you want to access the route using Composition API, there is a global [`useRoute`](/docs/4.x/api/composables/use-route) function that will allow you to access the route just like `this.$route` in the Options API.

```vuetwoslash
<script setup lang="ts">
const route = useRoute()

if (route.params.group === 'admins' && !route.params.id) {
  console.log('Warning! Make sure user is authenticated!')
}
</script>
```

<note>

Named parent routes will take priority over nested dynamic routes. For the `/foo/hello` route, `~/pages/foo.vue` will take priority over `~/pages/foo/[slug].vue`. <br />

Use `~/pages/foo/index.vue` and `~/pages/foo/[slug].vue` to match `/foo` and `/foo/hello` with different pages,.

</note>

<video-accordion platform="vimeo" title="Watch a video from Vue School on dynamic routes" video-id="754465699">

</video-accordion>

## Catch-all Route

If you need a catch-all route, you create it by using a file named like `[...slug].vue`. This will match _all_ routes under that path.

```vue [pages/[...slug].vue]
<template>
  <p>{{ $route.params.slug }}</p>
</template>
```

Navigating to `/hello/world` would render:

```html
<p>["hello", "world"]</p>
```

## Nested Routes

It is possible to display [nested routes](https://next.router.vuejs.org/guide/essentials/nested-routes.html) with `<NuxtPage>`.

Example:

```bash [Directory Structure]
-| pages/
---| parent/
-----| child.vue
---| parent.vue
```

This file tree will generate these routes:

```js
[
  {
    path: "/parent",
    component: "~/pages/parent.vue",
    name: "parent",
    children: [
      {
        path: "child",
        component: "~/pages/parent/child.vue",
        name: "parent-child",
      },
    ],
  },
];
```

To display the `child.vue` component, you have to insert the `<NuxtPage>` component inside `pages/parent.vue`:

```vue [pages/parent.vue]
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtPage :foobar="123" />
  </div>
</template>
```

```vue [pages/parent/child.vue]
<script setup lang="ts">
const props = defineProps(["foobar"]);

console.log(props.foobar);
</script>
```

### Child Route Keys

If you want more control over when the `<NuxtPage>` component is re-rendered (for example, for transitions), you can either pass a string or function via the `pageKey` prop, or you can define a `key` value via `definePageMeta`:

```vue [pages/parent.vue]
<template>
  <div>
    <h1>I am the parent view</h1>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </div>
</template>
```

Or alternatively:

```vue [pages/parent/child.vue]twoslash
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
</script>
```

<link-example to="/docs/examples/routing/pages">

</link-example>

## Route Groups

In some cases, you may want to group a set of routes together in a way which doesn't affect file-based routing. For this purpose, you can put files in a folder which is wrapped in parentheses - `(` and `)`.

For example:

```bash [Directory structure]
-| pages/
---| index.vue
---| (marketing)/
-----| about.vue
-----| contact.vue
```

This will produce `/`, `/about` and `/contact` pages in your app. The `marketing` group is ignored for purposes of your URL structure.

## Page Metadata

You might want to define metadata for each route in your app. You can do this using the `definePageMeta` macro, which will work both in `<script>` and in `<script setup>`:

```vuetwoslash
<script setup lang="ts">
definePageMeta({
  title: 'My home page'
})
</script>
```

This data can then be accessed throughout the rest of your app from the `route.meta` object.

```vuetwoslash
<script setup lang="ts">
const route = useRoute()

console.log(route.meta.title) // My home page
</script>
```

If you are using nested routes, the page metadata from all these routes will be merged into a single object. For more on route meta, see the [vue-router docs](https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields).

Much like `defineEmits` or `defineProps` (see [Vue docs](https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)), `definePageMeta` is a **compiler macro**. It will be compiled away so you cannot reference it within your component. Instead, the metadata passed to it will be hoisted out of the component.
Therefore, the page meta object cannot reference the component. However, it can reference imported bindings, as well as locally defined **pure functions**.

<warning>

Make sure not to reference any reactive data or functions that cause side effects. This can lead to unexpected behavior.

</warning>

```vue
<script setup lang="ts">
import { someData } from "~/utils/example";

function validateIdParam(route) {
  return route.params.id && !isNaN(Number(route.params.id));
}

const title = ref("");

definePageMeta({
  validate: validateIdParam,
  someData,
  title, // do not do this, the ref will be hoisted out of the component
});
</script>
```

### Special Metadata

Of course, you are welcome to define metadata for your own use throughout your app. But some metadata defined with `definePageMeta` has a particular purpose:

#### `alias`

You can define page aliases. They allow you to access the same page from different paths. It can be either a string or an array of strings as defined [in the vue-router documentation](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#Alias).

#### `keepalive`

Nuxt will automatically wrap your page in [the Vue `<KeepAlive>` component](https://vuejs.org/guide/built-ins/keep-alive.html#keepalive) if you set `keepalive: true` in your `definePageMeta`. This might be useful to do, for example, in a parent route that has dynamic child routes, if you want to preserve page state across route changes.

When your goal is to preserve state for parent routes use this syntax: `<NuxtPage keepalive />`. You can also set props to be passed to `<KeepAlive>` (see [a full list](https://vuejs.org/api/built-in-components.html#keepalive)).

You can set a default value for this property [in your `nuxt.config`](/docs/4.x/api/nuxt-config#keepalive).

#### `key`

[See above](#child-route-keys).

#### `layout`

You can define the layout used to render the route. This can be either false (to disable any layout), a string or a ref/computed, if you want to make it reactive in some way. [More about layouts](/docs/4.x/guide/directory-structure/layouts).

#### `layoutTransition` and `pageTransition`

You can define transition properties for the `<transition>` component that wraps your pages and layouts, or pass `false` to disable the `<transition>` wrapper for that route. You can see [a list of options that can be passed](https://vuejs.org/api/built-in-components.html#transition) or read [more about how transitions work](https://vuejs.org/guide/built-ins/transition.html#transition).

You can set default values for these properties [in your `nuxt.config`](/docs/4.x/api/nuxt-config#layouttransition).

#### `middleware`

You can define middleware to apply before loading this page. It will be merged with all the other middleware used in any matching parent/child routes. It can be a string, a function (an anonymous/inlined middleware function following [the global before guard pattern](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)), or an array of strings/functions. [More about named middleware](/docs/4.x/guide/directory-structure/middleware).

#### `name`

You may define a name for this page's route.

#### `path`

You may define a path matcher, if you have a more complex pattern than can be expressed with the file name. See [the `vue-router` docs](https://router.vuejs.org/guide/essentials/route-matching-syntax.html#custom-regex-in-params) for more information.

#### `props`

Allows accessing the route `params` as props passed to the page component. See[the `vue-router` docs](https://router.vuejs.org/guide/essentials/passing-props) for more information.

### Typing Custom Metadata

If you add custom metadata for your pages, you may wish to do so in a type-safe way. It is possible to augment the type of the object accepted by `definePageMeta`:

```ts [index.d.ts]
declare module "#app" {
  interface PageMeta {
    pageType?: string;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
```

## Navigation

To navigate between pages of your app, you should use the [`<NuxtLink>`](/docs/4.x/api/components/nuxt-link) component.

This component is included with Nuxt and therefore you don't have to import it as you do with other components.

A simple link to the `index.vue` page in your `pages` folder:

```vue
<template>
  <NuxtLink to="/">Home page</NuxtLink>
</template>
```

<read-more to="/docs/api/components/nuxt-link">

Learn more about `<NuxtLink>` usage.

</read-more>

## Programmatic Navigation

Nuxt allows programmatic navigation through the `navigateTo()` utility method. Using this utility method, you will be able to programmatically navigate the user in your app. This is great for taking input from the user and navigating them dynamically throughout your application. In this example, we have a simple method called `navigate()` that gets called when the user submits a search form.

<note>

Make sure to always `await` on `navigateTo` or chain its result by returning from functions.

</note>

```vuetwoslash
<script setup lang="ts">
const name = ref('');
const type = ref(1);

function navigate(){
  return navigateTo({
    path: '/search',
    query: {
      name: name.value,
      type: type.value
    }
  })
}
</script>
```

## Client-Only Pages

You can define a page as [client only](/docs/4.x/guide/directory-structure/components#client-components) by giving it a `.client.vue` suffix. None of the content of this page will be rendered on the server.

## Server-Only Pages

You can define a page as [server only](/docs/4.x/guide/directory-structure/components#server-components) by giving it a `.server.vue` suffix. While you will be able to navigate to the page using client-side navigation, controlled by `vue-router`, it will be rendered with a server component automatically, meaning the code required to render the page will not be in your client-side bundle.

<warning>

Server-only pages must have a single root element. (HTML comments are considered elements as well.)

</warning>

## Custom Routing

As your app gets bigger and more complex, your routing might require more flexibility. For this reason, Nuxt directly exposes the router, routes and router options for customization in different ways.

<read-more to="/docs/guide/recipes/custom-routing">

</read-more>

## Multiple Pages Directories

By default, all your pages should be in one `pages` directory at the root of your project.

However, you can use [Nuxt Layers](/docs/4.x/getting-started/layers) to create groupings of your app's pages:

```bash [Directory Structure]
-| some-app/
---| nuxt.config.ts
---| pages/
-----| app-page.vue
-| nuxt.config.ts
```

```ts [some-app/nuxt.config.ts]twoslash
// some-app/nuxt.config.ts
export default defineNuxtConfig({});
```

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  extends: ["./some-app"],
});
```

<read-more to="/docs/guide/going-further/layers">

</read-more>
# plugins

> Nuxt has a plugins system to use Vue plugins and more at the creation of your Vue application.

Nuxt automatically reads the files in the `plugins/` directory and loads them at the creation of the Vue application.

<note>

All plugins inside are auto-registered, you don't need to add them to your `nuxt.config` separately.

</note>

<note>

You can use `.server` or `.client` suffix in the file name to load a plugin only on the server or client side.

</note>

## Registered Plugins

Only files at the top level of the directory (or index files within any subdirectories) will be auto-registered as plugins.

```bash [Directory structure]
-| plugins/
---| foo.ts      // scanned
---| bar/
-----| baz.ts    // not scanned
-----| foz.vue   // not scanned
-----| index.ts  // currently scanned but deprecated
```

Only `foo.ts` and `bar/index.ts` would be registered.

To add plugins in subdirectories, you can use the [`plugins`](/docs/4.x/api/nuxt-config#plugins-1) option in `nuxt.config.ts`:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  plugins: ["~/plugins/bar/baz", "~/plugins/bar/foz"],
});
```

## Creating Plugins

The only argument passed to a plugin is [`nuxtApp`](/docs/4.x/api/composables/use-nuxt-app).

```ts [plugins/hello.ts]twoslash
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
});
```

### Object Syntax Plugins

It is also possible to define a plugin using an object syntax, for more advanced use cases. For example:

```ts [plugins/hello.ts]twoslash
export default defineNuxtPlugin({
  name: "my-plugin",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    "app:created"() {
      const nuxtApp = useNuxtApp();
      // do something in the hook
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
```

<video-accordion title="Watch a video from Alexander Lichter about the Object Syntax for Nuxt plugins" video-id="2aXZyXB1QGQ">

</video-accordion>

<note>

If you are using the object-syntax, the properties are statically analyzed to produce a more optimized build. So you should not define them at runtime. <br />

For example, setting `enforce: import.meta.server ? 'pre' : 'post'` would defeat any future optimization Nuxt is able to do for your plugins.
Nuxt does statically pre-load any hook listeners when using object-syntax, allowing you to define hooks without needing to worry about order of plugin registration.

</note>

## Registration Order

You can control the order in which plugins are registered by prefixing with 'alphabetical' numbering to the file names.

```bash [Directory structure]
plugins/
 | - 01.myPlugin.ts
 | - 02.myOtherPlugin.ts
```

In this example, `02.myOtherPlugin.ts` will be able to access anything that was injected by `01.myPlugin.ts`.

This is useful in situations where you have a plugin that depends on another plugin.

<note>

In case you're new to 'alphabetical' numbering, remember that filenames are sorted as strings, not as numeric values. For example, `10.myPlugin.ts` would come before `2.myOtherPlugin.ts`. This is why the example prefixes single digit numbers with `0`.

</note>

## Loading Strategy

### Parallel Plugins

By default, Nuxt loads plugins sequentially. You can define a plugin as `parallel` so Nuxt won't wait until the end of the plugin's execution before loading the next plugin.

```ts [plugins/my-plugin.ts]twoslash
export default defineNuxtPlugin({
  name: "my-plugin",
  parallel: true,
  async setup(nuxtApp) {
    // the next plugin will be executed immediately
  },
});
```

### Plugins With Dependencies

If a plugin needs to wait for another plugin before it runs, you can add the plugin's name to the `dependsOn` array.

```ts [plugins/depending-on-my-plugin.ts]twoslash
export default defineNuxtPlugin({
  name: "depends-on-my-plugin",
  dependsOn: ["my-plugin"],
  async setup(nuxtApp) {
    // this plugin will wait for the end of `my-plugin`'s execution before it runs
  },
});
```

## Using Composables

You can use [composables](/docs/4.x/guide/directory-structure/composables) as well as [utils](/docs/4.x/guide/directory-structure/utils) within Nuxt plugins:

```ts [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  const foo = useFoo();
});
```

However, keep in mind there are some limitations and differences:

<important>

**If a composable depends on another plugin registered later, it might not work.** <br />

Plugins are called in order sequentially and before everything else. You might use a composable that depends on another plugin which has not been called yet.

</important>

<important>

**If a composable depends on the Vue.js lifecycle, it won't work.** <br />

Normally, Vue.js composables are bound to the current component instance while plugins are only bound to [`nuxtApp`](/docs/4.x/api/composables/use-nuxt-app) instance.

</important>

## Providing Helpers

If you would like to provide a helper on the [`NuxtApp`](/docs/4.x/api/composables/use-nuxt-app) instance, return it from the plugin under a `provide` key.

<code-group>

```ts [plugins/hello.ts]twoslash
export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => `Hello ${msg}!`,
    },
  };
});
```

```ts [plugins/hello-object-syntax.ts]twoslash
export default defineNuxtPlugin({
  name: "hello",
  setup() {
    return {
      provide: {
        hello: (msg: string) => `Hello ${msg}!`,
      },
    };
  },
});
```

</code-group>

You can then use the helper in your components:

```vue [components/Hello.vue]
<script setup lang="ts">
// alternatively, you can also use it here
const { $hello } = useNuxtApp();
</script>

<template>
  <div>
    {{ $hello("world") }}
  </div>
</template>
```

<important>

Note that we highly recommend using [`composables`](/docs/4.x/guide/directory-structure/composables) instead of providing helpers to avoid polluting the global namespace and keep your main bundle entry small.

</important>

<warning>

**If your plugin provides a ref or computed, it will not be unwrapped in a component <template>.** <br />

This is due to how Vue works with refs that aren't top-level to the template. You can read more about it [in the Vue documentation](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates).

</warning>

## Typing Plugins

If you return your helpers from the plugin, they will be typed automatically; you'll find them typed for the return of `useNuxtApp()` and within your templates.

<note>

If you need to use a provided helper _within_ another plugin, you can call [`useNuxtApp()`](/docs/4.x/api/composables/use-nuxt-app) to get the typed version. But in general, this should be avoided unless you are certain of the plugins' order.

</note>

For advanced use-cases, you can declare the type of injected properties like this:

```ts [index.d.ts]
declare module "#app" {
  interface NuxtApp {
    $hello(msg: string): string;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $hello(msg: string): string;
  }
}

export {};
```

<note>

If you are using WebStorm, you may need to augment `@vue/runtime-core` until [this issue](https://youtrack.jetbrains.com/issue/WEB-59818/VUE-TypeScript-WS-PS-does-not-correctly-display-type-of-globally-injected-properties) is resolved.

</note>

## Vue Plugins

If you want to use Vue plugins, like [vue-gtag](https://github.com/MatteoGabriele/vue-gtag) to add Google Analytics tags, you can use a Nuxt plugin to do so.

First, install the Vue plugin dependency:

<code-group sync="pm">

```bash [npm]
npm install --save-dev vue-gtag-next
```

```bash [yarn]
yarn add --dev vue-gtag-next
```

```bash [pnpm]
pnpm add -D vue-gtag-next
```

```bash [bun]
bun add -D vue-gtag-next
```

</code-group>

Then create a plugin file:

```ts [plugins/vue-gtag.client.ts]
import VueGtag, { trackRouter } from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "GA_MEASUREMENT_ID",
    },
  });
  trackRouter(useRouter());
});
```

## Vue Directives

Similarly, you can register a custom Vue directive in a plugin.

```ts [plugins/my-directive.ts]twoslash
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("focus", {
    mounted(el) {
      el.focus();
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {};
    },
  });
});
```

<warning>

If you register a Vue directive, you _must_ register it on both client and server side unless you are only using it when rendering one side. If the directive only makes sense from a client side, you can always move it to `~/plugins/my-directive.client.ts` and provide a 'stub' directive for the server in `~/plugins/my-directive.server.ts`.

</warning>

<read-more icon="i-simple-icons-vuedotjs" target="_blank" title="Custom Directives on Vue Docs" to="https://vuejs.org/guide/reusability/custom-directives.html">

</read-more>
# utils

> Use the utils/ directory to auto-import your utility functions throughout your application.

The main purpose of the [`utils/` directory](/docs/4.x/guide/directory-structure/utils) is to allow a semantic distinction between your Vue composables and other auto-imported utility functions.

## Usage

**Method 1:** Using named export

```ts [utils/index.ts]twoslash
export const { format: formatNumber } = Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 1,
});
```

**Method 2:** Using default export

```ts [utils/random-entry.ts or utils/randomEntry.ts]twoslash
// It will be available as randomEntry() (camelCase of file name without extension)
export default function (arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

You can now use auto imported utility functions in `.js`, `.ts` and `.vue` files

```vue [app.vue]
<template>
  <p>{{ formatNumber(1234) }}</p>
</template>
```

<read-more to="/docs/guide/concepts/auto-imports">

</read-more>

<link-example to="/docs/examples/features/auto-imports">

</link-example>

<tip>

The way `utils/` auto-imports work and are scanned is identical to the [`composables/`](/docs/4.x/guide/directory-structure/composables) directory.

</tip>

<important>

These utils are only available within the Vue part of your app. <br />

Only `server/utils` are auto-imported in the [`server/`](/docs/4.x/guide/directory-structure/server#server-utilities) directory.

</important>
# app.vue

> The app.vue file is the main component of your Nuxt application.

<tip>

If you have a `pages/` directory, the `app.vue` file is optional. Nuxt will automatically include a default `app.vue`, but you can still add your own to customize the structure and content as needed.

</tip>

## Usage

### Minimal Usage

With Nuxt, the [`pages/`](/docs/4.x/guide/directory-structure/pages) directory is optional. If it is not present, Nuxt will not include the [vue-router](https://router.vuejs.org) dependency. This is useful when building a landing page or an application that does not require routing.

```vue [app.vue]
<template>
  <h1>Hello World!</h1>
</template>
```

<link-example to="/docs/examples/hello-world">

</link-example>

### Usage with Pages

When you have a [`pages/`](/docs/4.x/guide/directory-structure/pages) directory, you need to use the [`<NuxtPage>`](/docs/4.x/api/components/nuxt-page) component to display the current page:

```vue [app.vue]
<template>
  <NuxtPage />
</template>
```

You can also define the common structure of your application directly in `app.vue`. This is useful when you want to include global elements such as a header or footer:

```vue [app.vue]
<template>
  <header>Header content</header>
  <NuxtPage />
  <footer>Footer content</footer>
</template>
```

<note>

Remember that `app.vue` acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page.

</note>

<read-more to="/docs/guide/directory-structure/pages">

Learn more about how to structure your pages using the `pages/` directory.

</read-more>

### Usage with Layouts

When your application requires different layouts for different pages, you can use the `layouts/` directory with the [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout) component. This allows you to define multiple layouts and apply them per page.

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

<read-more to="/docs/guide/directory-structure/layouts">

Learn more about how to structure your layouts using the `layouts/` directory.

</read-more>
# app.vue

> The app.vue file is the main component of your Nuxt application.

<tip>

If you have a `pages/` directory, the `app.vue` file is optional. Nuxt will automatically include a default `app.vue`, but you can still add your own to customize the structure and content as needed.

</tip>

## Usage

### Minimal Usage

With Nuxt, the [`pages/`](/docs/4.x/guide/directory-structure/pages) directory is optional. If it is not present, Nuxt will not include the [vue-router](https://router.vuejs.org) dependency. This is useful when building a landing page or an application that does not require routing.

```vue [app.vue]
<template>
  <h1>Hello World!</h1>
</template>
```

<link-example to="/docs/examples/hello-world">

</link-example>

### Usage with Pages

When you have a [`pages/`](/docs/4.x/guide/directory-structure/pages) directory, you need to use the [`<NuxtPage>`](/docs/4.x/api/components/nuxt-page) component to display the current page:

```vue [app.vue]
<template>
  <NuxtPage />
</template>
```

You can also define the common structure of your application directly in `app.vue`. This is useful when you want to include global elements such as a header or footer:

```vue [app.vue]
<template>
  <header>Header content</header>
  <NuxtPage />
  <footer>Footer content</footer>
</template>
```

<note>

Remember that `app.vue` acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page.

</note>

<read-more to="/docs/guide/directory-structure/pages">

Learn more about how to structure your pages using the `pages/` directory.

</read-more>

### Usage with Layouts

When your application requires different layouts for different pages, you can use the `layouts/` directory with the [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout) component. This allows you to define multiple layouts and apply them per page.

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

<read-more to="/docs/guide/directory-structure/layouts">

Learn more about how to structure your layouts using the `layouts/` directory.

</read-more>
# error.vue

> The error.vue file is the error page in your Nuxt application.

During the lifespan of your application, some errors may appear unexpectedly at runtime. In such case, we can use the `error.vue` file to override the default error files and display the error nicely.

```vue [error.vue]
<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
```

<note>

Although it is called an 'error page' it's not a route and shouldn't be placed in your `~/pages` directory. For the same reason, you shouldn't use `definePageMeta` within this page. That being said, you can still use layouts in the error file, by utilizing the [`NuxtLayout`](/docs/4.x/api/components/nuxt-layout) component and specifying the name of the layout.

</note>

The error page has a single prop - `error` which contains an error for you to handle.

The `error` object provides the following fields:

```ts
{
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: unknown
  cause?: unknown
}
```

If you have an error with custom fields they will be lost; you should assign them to `data` instead:

```ts
throw createError({
  statusCode: 404,
  statusMessage: "Page Not Found",
  data: {
    myCustomField: true,
  },
});
```

# content

> Use the content/ directory to create a file-based CMS for your application.

[Nuxt Content](https://content.nuxt.com) reads the [`content/` directory](/docs/4.x/guide/directory-structure/content) in your project and parses `.md`, `.yml`, `.csv` and `.json` files to create a file-based CMS for your application.

- Render your content with built-in components.
- Query your content with a MongoDB-like API.
- Use your Vue components in Markdown files with the MDC syntax.
- Automatically generate your navigation.

<read-more target="_blank" to="https://content.nuxt.com">

Learn more in **Nuxt Content** documentation.

</read-more>

## Enable Nuxt Content

Install the `@nuxt/content` module in your project as well as adding it to your `nuxt.config.ts` with one command:

```bash [Terminal]
npx nuxt module add content
```

## Create Content

Place your markdown files inside the `content/` directory:

```md [content/index.md]
# Hello Content
```

The module automatically loads and parses them.

## Render Content

To render content pages, add a [catch-all route](/docs/4.x/guide/directory-structure/pages/#catch-all-route) using the [`<ContentRenderer>`](https://content.nuxt.com/docs/components/content-renderer) component:

```vue [pages/[...slug].vue]
<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<template>
  <div>
    <header><!-- ... --></header>

    <ContentRenderer v-if="page" :value="page" />

    <footer><!-- ... --></footer>
  </div>
</template>
```

## Documentation

<tip icon="i-lucide-book">

Head over to [https://content.nuxt.com](https://content.nuxt.com) to learn more about the Content module features, such as how to build queries and use Vue components in your Markdown files with the MDC syntax.

</tip>
# modules

> Use the modules/ directory to automatically register local modules within your application.

It is a good place to place any local modules you develop while building your application.

The auto-registered files patterns are:

- `modules/*/index.ts`
- `modules/*.ts`

You don't need to add those local modules to your [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) separately.

<code-group>

```ts [modules/hello/index.ts]twoslash
// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "hello",
  },
  setup() {
    const resolver = createResolver(import.meta.url);

    // Add an API route
    addServerHandler({
      route: "/api/hello",
      handler: resolver.resolve("./runtime/api-route"),
    });
  },
});
```

```ts [modules/hello/runtime/api-route.ts]twoslash
export default defineEventHandler(() => {
  return { hello: "world" };
});
```

</code-group>

When starting Nuxt, the `hello` module will be registered and the `/api/hello` route will be available.

Modules are executed in the following sequence:

- First, the modules defined in [`nuxt.config.ts`](/docs/4.x/api/nuxt-config#modules-1) are loaded.
- Then, modules found in the `modules/` directory are executed, and they load in alphabetical order.

You can change the order of local module by adding a number to the front of each directory name:

```bash [Directory structure]
modules/
  1.first-module/
    index.ts
  2.second-module.ts
```

<read-more to="/docs/guide/going-further/modules">

</read-more>

<tip icon="i-lucide-video" target="_blank" to="https://vueschool.io/lessons/creating-your-first-module-from-scratch?friend=nuxt">

Watch Vue School video about Nuxt private modules.

</tip>
# public

> The public/ directory is used to serve your website's static assets.

Files contained within the `public/` directory are served at the root and are not modified by the build process. This is suitable for files that have to keep their names (e.g. `robots.txt`) _or_ likely won't change (e.g. `favicon.ico`).

```bash [Directory structure]
-| public/
---| favicon.ico
---| og-image.png
---| robots.txt
```

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  ogImage: "/og-image.png",
});
</script>
```

<tip target="_blank" to="https://v2.nuxt.com/docs/directory-structure/static">

This is known as the <span>

`static/`

</span>

directory in Nuxt 2.

</tip>
# server

> The server/ directory is used to register API and server handlers to your application.

Nuxt automatically scans files inside these directories to register API and server handlers with Hot Module Replacement (HMR) support.

```bash [Directory structure]
-| server/
---| api/
-----| hello.ts      # /api/hello
---| routes/
-----| bonjour.ts    # /bonjour
---| middleware/
-----| log.ts        # log all requests
```

Each file should export a default function defined with `defineEventHandler()` or `eventHandler()` (alias).

The handler can directly return JSON data, a `Promise`, or use `event.node.res.end()` to send a response.

```ts [server/api/hello.ts]twoslash
export default defineEventHandler((event) => {
  return {
    hello: "world",
  };
});
```

You can now universally call this API in your pages and components:

```vue [pages/index.vue]
<script setup lang="ts">
const { data } = await useFetch("/api/hello");
</script>

<template>
  <pre>{{ data }}</pre>
</template>
```

## Server Routes

Files inside the `~/server/api` are automatically prefixed with `/api` in their route.

<video-accordion platform="vimeo" title="Watch a video from Vue School on API routes" video-id="761468863">

</video-accordion>

To add server routes without `/api` prefix, put them into `~/server/routes` directory.

**Example:**

```ts [server/routes/hello.ts]
export default defineEventHandler(() => "Hello World!");
```

Given the example above, the `/hello` route will be accessible at [http://localhost:3000/hello](http://localhost:3000/hello).

<note>

Note that currently server routes do not support the full functionality of dynamic routes as [pages](/docs/4.x/guide/directory-structure/pages#dynamic-routes) do.

</note>

## Server Middleware

Nuxt will automatically read in any file in the `~/server/middleware` to create server middleware for your project.

Middleware handlers will run on every request before any other server route to add or check headers, log requests, or extend the event's request object.

<note>

Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.

</note>

**Examples:**

```ts [server/middleware/log.ts]
export default defineEventHandler((event) => {
  console.log("New request: " + getRequestURL(event));
});
```

```ts [server/middleware/auth.ts]
export default defineEventHandler((event) => {
  event.context.auth = { user: 123 };
});
```

## Server Plugins

Nuxt will automatically read any files in the `~/server/plugins` directory and register them as Nitro plugins. This allows extending Nitro's runtime behavior and hooking into lifecycle events.

**Example:**

```ts [server/plugins/nitroPlugin.ts]
export default defineNitroPlugin((nitroApp) => {
  console.log("Nitro plugin", nitroApp);
});
```

<read-more to="https://nitro.build/guide/plugins" target="_blank" title="Nitro Plugins">

</read-more>

## Server Utilities

Server routes are powered by [h3js/h3](https://github.com/h3js/h3) which comes with a handy set of helpers.

<read-more to="https://www.jsdocs.io/package/h3#package-index-functions" target="_blank" title="Available H3 Request Helpers">

</read-more>

You can add more helpers yourself inside the `~/server/utils` directory.

For example, you can define a custom handler utility that wraps the original handler and performs additional operations before returning the final response.

**Example:**

```ts [server/utils/handler.ts]
import type { EventHandler, EventHandlerRequest } from "h3";

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const response = await handler(event);
      // do something after the route handler
      return { response };
    } catch (err) {
      // Error handling
      return { err };
    }
  });
```

## Server Types

<tip>

This feature is available from Nuxt >= 3.5

</tip>

## Recipes

### Route Parameters

Server routes can use dynamic parameters within brackets in the file name like `/api/hello/[name].ts` and be accessed via `event.context.params`.

```ts [server/api/hello/[name].ts]
export default defineEventHandler((event) => {
  const name = getRouterParam(event, "name");

  return `Hello, ${name}!`;
});
```

<tip to="https://h3.dev/examples/validate-data#validate-params">

Alternatively, use `getValidatedRouterParams` with a schema validator such as Zod for runtime and type safety.

</tip>

You can now universally call this API on `/api/hello/nuxt` and get `Hello, nuxt!`.

### Matching HTTP Method

Handle file names can be suffixed with `.get`, `.post`, `.put`, `.delete`, ... to match request's [HTTP Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

```ts [server/api/test.get.ts]
export default defineEventHandler(() => "Test get handler");
```

```ts [server/api/test.post.ts]
export default defineEventHandler(() => "Test post handler");
```

Given the example above, fetching `/test` with:

- **GET** method: Returns `Test get handler`
- **POST** method: Returns `Test post handler`
- Any other method: Returns 405 error

You can also use `index.[method].ts` inside a directory for structuring your code differently, this is useful to create API namespaces.

<code-group>

```ts [server/api/foo/index.get.ts]
export default defineEventHandler((event) => {
  // handle GET requests for the `api/foo` endpoint
});
```

```ts [server/api/foo/index.post.ts]
export default defineEventHandler((event) => {
  // handle POST requests for the `api/foo` endpoint
});
```

```ts [server/api/foo/bar.get.ts]
export default defineEventHandler((event) => {
  // handle GET requests for the `api/foo/bar` endpoint
});
```

</code-group>

### Catch-all Route

Catch-all routes are helpful for fallback route handling.

For example, creating a file named `~/server/api/foo/[...].ts` will register a catch-all route for all requests that do not match any route handler, such as `/api/foo/bar/baz`.

```ts [server/api/foo/[...].ts]
export default defineEventHandler((event) => {
  // event.context.path to get the route path: '/api/foo/bar/baz'
  // event.context.params._ to get the route segment: 'bar/baz'
  return `Default foo handler`;
});
```

You can set a name for the catch-all route by using `~/server/api/foo/[...slug].ts` and access it via `event.context.params.slug`.

```ts [server/api/foo/[...slug].ts]
export default defineEventHandler((event) => {
  // event.context.params.slug to get the route segment: 'bar/baz'
  return `Default foo handler`;
});
```

### Body Handling

```ts [server/api/submit.post.ts]
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { body };
});
```

<tip to="https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils">

Alternatively, use `readValidatedBody` with a schema validator such as Zod for runtime and type safety.

</tip>

You can now universally call this API using:

```vue [app.vue]
<script setup lang="ts">
async function submit() {
  const { body } = await $fetch("/api/submit", {
    method: "post",
    body: { test: 123 },
  });
}
</script>
```

<note>

We are using `submit.post.ts` in the filename only to match requests with `POST` method that can accept the request body. When using `readBody` within a GET request, `readBody` will throw a `405 Method Not Allowed` HTTP error.

</note>

### Query Parameters

Sample query `/api/query?foo=bar&baz=qux`

```ts [server/api/query.get.ts]
export default defineEventHandler((event) => {
  const query = getQuery(event);

  return { a: query.foo, b: query.baz };
});
```

<tip to="https://unjs.io/blog/2023-08-15-h3-towards-the-edge-of-the-web#runtime-type-safe-request-utils">

Alternatively, use `getValidatedQuery` with a schema validator such as Zod for runtime and type safety.

</tip>

### Error Handling

If no errors are thrown, a status code of `200 OK` will be returned.

Any uncaught errors will return a `500 Internal Server Error` HTTP Error.

To return other error codes, throw an exception with [`createError`](/docs/4.x/api/utils/create-error):

```ts [server/api/validation/[id].ts]
export default defineEventHandler((event) => {
  const id = parseInt(event.context.params.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }
  return "All good";
});
```

### Status Codes

To return other status codes, use the [`setResponseStatus`](/docs/4.x/api/utils/set-response-status) utility.

For example, to return `202 Accepted`

```ts [server/api/validation/[id].ts]
export default defineEventHandler((event) => {
  setResponseStatus(event, 202);
});
```

### Runtime Config

<code-group>

```ts [server/api/foo.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const repo = await $fetch("https://api.github.com/repos/nuxt/nuxt", {
    headers: {
      Authorization: `token ${config.githubToken}`,
    },
  });

  return repo;
});
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    githubToken: "",
  },
});
```

```ini [.env]
NUXT_GITHUB_TOKEN='<my-super-token>'
```

</code-group>

<note>

Giving the `event` as argument to `useRuntimeConfig` is optional, but it is recommended to pass it to get the runtime config overwritten by [environment variables](/docs/4.x/guide/going-further/runtime-config#environment-variables) at runtime for server routes.

</note>

### Request Cookies

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const cookies = parseCookies(event);

  return { cookies };
});
```

### Forwarding Context & Headers

By default, neither the headers from the incoming request nor the request context are forwarded when
making fetch requests in server routes. You can use `event.$fetch` to forward the request context and headers when making fetch requests in server routes.

```ts [server/api/forward.ts]
export default defineEventHandler((event) => {
  return event.$fetch("/api/forwarded");
});
```

<note>

Headers that are **not meant to be forwarded** will **not be included** in the request. These headers include, for example:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`

</note>

### Awaiting Promises After Response

When handling server requests, you might need to perform asynchronous tasks that shouldn't block the response to the client (for example, caching and logging). You can use `event.waitUntil` to await a promise in the background without delaying the response.

The `event.waitUntil` method accepts a promise that will be awaited before the handler terminates, ensuring the task is completed even if the server would otherwise terminate the handler right after the response is sent. This integrates with runtime providers to leverage their native capabilities for handling asynchronous operations after the response is sent.

```ts [server/api/background-task.ts]
const timeConsumingBackgroundTask = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export default eventHandler((event) => {
  // schedule a background task without blocking the response
  event.waitUntil(timeConsumingBackgroundTask());

  // immediately send the response to the client
  return "done";
});
```

## Advanced Usage

### Nitro Config

You can use `nitro` key in `nuxt.config` to directly set [Nitro configuration](https://nitro.build/config).

<warning>

This is an advanced option. Custom config can affect production deployments, as the configuration interface might change over time when Nitro is upgraded in semver-minor versions of Nuxt.

</warning>

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // https://nitro.build/config
  nitro: {},
});
```

<read-more to="/docs/guide/concepts/server-engine">

</read-more>

### Nested Router

```ts [server/api/hello/[...slug].ts]
import { createRouter, defineEventHandler, useBase } from "h3";

const router = createRouter();

router.get(
  "/test",
  defineEventHandler(() => "Hello World")
);

export default useBase("/api/hello", router.handler);
```

### Sending Streams

<tip>

This is an experimental feature and is available in all environments.

</tip>

```ts [server/api/foo.get.ts]
import fs from "node:fs";
import { sendStream } from "h3";

export default defineEventHandler((event) => {
  return sendStream(event, fs.createReadStream("/path/to/file"));
});
```

### Sending Redirect

```ts [server/api/foo.get.ts]
export default defineEventHandler(async (event) => {
  await sendRedirect(event, "/path/redirect/to", 302);
});
```

### Legacy Handler or Middleware

```ts [server/api/legacy.ts]
export default fromNodeMiddleware((req, res) => {
  res.end("Legacy handler");
});
```

<important>

Legacy support is possible using [h3js/h3](https://github.com/h3js/h3), but it is advised to avoid legacy handlers as much as you can.

</important>

```ts [server/middleware/legacy.ts]
export default fromNodeMiddleware((req, res, next) => {
  console.log("Legacy middleware");
  next();
});
```

<warning>

Never combine `next()` callback with a legacy middleware that is `async` or returns a `Promise`.

</warning>

### Server Storage

Nitro provides a cross-platform [storage layer](https://nitro.build/guide/storage). In order to configure additional storage mount points, you can use `nitro.storage`, or [server plugins](#server-plugins).

**Example of adding a Redis storage:**

Using `nitro.storage`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        /* redis connector options */
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 0, // Defaults to 0
        tls: {}, // tls/ssl
      },
    },
  },
});
```

Then in your API handler:

```ts [server/api/storage/test.ts]
export default defineEventHandler(async (event) => {
  // List all keys with
  const keys = await useStorage("redis").getKeys();

  // Set a key with
  await useStorage("redis").setItem("foo", "bar");

  // Remove a key with
  await useStorage("redis").removeItem("foo");

  return {};
});
```

<read-more to="https://nitro.build/guide/storage" target="_blank">

Read more about Nitro Storage Layer.

</read-more>

Alternatively, you can create a storage mount point using a server plugin and runtime config:

<code-group>

```ts [server/plugins/storage.ts]
import redisDriver from "unstorage/drivers/redis";

export default defineNitroPlugin(() => {
  const storage = useStorage();

  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = redisDriver({
    base: "redis",
    host: useRuntimeConfig().redis.host,
    port: useRuntimeConfig().redis.port,
    /* other redis connector options */
  });

  // Mount driver
  storage.mount("redis", driver);
});
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    redis: {
      // Default values
      host: "",
      port: 0,
      /* other redis connector options */
    },
  },
});
```

</code-group>
# shared

> Use the shared/ directory to share functionality between the Vue app and the Nitro server.

The `shared/` directory allows you to share code that can be used in both the Vue app and the Nitro server.

<note>

The `shared/` directory is available in Nuxt v3.14+.

</note>

<important>

Code in the `shared/` directory cannot import any Vue or Nitro code.

</important>

<video-accordion title="Watch a video from Vue School on sharing utils and types between app and server" video-id="nnAR-MO3q5M">

</video-accordion>

## Usage

**Method 1:** Named export

```ts [shared/utils/capitalize.ts]twoslash
export const capitalize = (input: string) => {
  return input[0] ? input[0].toUpperCase() + input.slice(1) : "";
};
```

**Method 2:** Default export

```ts [shared/utils/capitalize.ts]twoslash
export default function (input: string) {
  return input[0] ? input[0].toUpperCase() + input.slice(1) : "";
}
```

You can now use [auto-imported](/docs/4.x/guide/directory-structure/shared#auto-imports) utilities in your Nuxt app and `server/` directory.

```vue [app.vue]
<script setup lang="ts">
const hello = capitalize("hello");
</script>

<template>
  <div>
    {{ hello }}
  </div>
</template>
```

```ts [server/api/hello.get.ts]
export default defineEventHandler((event) => {
  return {
    hello: capitalize("hello"),
  };
});
```

## How Files Are Scanned

Only files in the `shared/utils/` and `shared/types/` directories will be auto-imported. Files nested within subdirectories of these directories will not be auto-imported unless you add these directories to `imports.dirs` and `nitro.imports.dirs`.

<tip>

The way `shared/utils` and `shared/types` auto-imports work and are scanned is identical to the [`composables/`](/docs/4.x/guide/directory-structure/composables) and [`utils/`](/docs/4.x/guide/directory-structure/utils) directories.

</tip>

<read-more to="/docs/guide/directory-structure/composables#how-files-are-scanned">

</read-more>

```bash [Directory Structure]
-| shared/
---| capitalize.ts        # Not auto-imported
---| formatters
-----| lower.ts           # Not auto-imported
---| utils/
-----| lower.ts           # Auto-imported
-----| formatters
-------| upper.ts         # Not auto-imported
---| types/
-----| bar.d.ts           # Auto-imported
```

Any other files you create in the `shared/` folder must be manually imported using the `#shared` alias (automatically configured by Nuxt):

```ts
// For files directly in the shared directory
import capitalize from "#shared/capitalize";

// For files in nested directories
import lower from "#shared/formatters/lower";

// For files nested in a folder within utils
import upper from "#shared/utils/formatters/upper";
```

This alias ensures consistent imports across your application, regardless of the importing file's location.

<read-more to="/docs/guide/concepts/auto-imports">

</read-more>
# nuxt.config.ts

> Nuxt can be easily configured with a single nuxt.config file.

The `nuxt.config` file extension can either be `.js`, `.ts` or `.mjs`.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  // My Nuxt config
});
```

<tip>

`defineNuxtConfig` helper is globally available without import.

</tip>

You can explicitly import `defineNuxtConfig` from `nuxt/config` if you prefer:

```ts [nuxt.config.ts]twoslash
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // My Nuxt config
});
```

<read-more to="/docs/api/configuration/nuxt-config">

Discover all the available options in the **Nuxt configuration** documentation.

</read-more>

To ensure your configuration is up to date, Nuxt will make a full restart when detecting changes in the main configuration file, the [`.env`](/docs/4.x/guide/directory-structure/env), [`.nuxtignore`](/docs/4.x/guide/directory-structure/nuxtignore) and [`.nuxtrc`](/docs/4.x/guide/directory-structure/nuxtrc) dotfiles.

# package.json

> The package.json file contains all the dependencies and scripts for your application.

The minimal `package.json` of your Nuxt application should looks like:

```json [package.json]
{
  "name": "nuxt-app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "latest",
    "vue": "latest",
    "vue-router": "latest"
  }
}
```

<read-more icon="i-simple-icons-npm" target="_blank" to="https://docs.npmjs.com/cli/configuring-npm/package-json">

Read more about the `package.json` file.

</read-more>
# tsconfig.json

> Nuxt generates multiple TypeScript configuration files with sensible defaults and your aliases.

Nuxt [automatically generates](/docs/4.x/guide/concepts/typescript) multiple TypeScript configuration files (`.nuxt/tsconfig.app.json`, `.nuxt/tsconfig.server.json`, `.nuxt/tsconfig.node.json` and `.nuxt/tsconfig.shared.json`) with the resolved aliases you are using in your Nuxt project, as well as with other sensible defaults.

You can benefit from this by creating a `tsconfig.json` in the root of your project with the following content:

```json [tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}
```

<note>

As you need to, you can customize the contents of this file. However, it is recommended that you don't overwrite `target`, `module` and `moduleResolution`.

</note>

<note>

If you need to customize your `paths`, this will override the auto-generated path aliases. Instead, we recommend that you add any path aliases you need to the [`alias`](/docs/4.x/api/nuxt-config#alias) property within your `nuxt.config`, where they will get picked up and added to the auto-generated `tsconfig`.

</note>
# Introduction

> Nuxt's goal is to make web development intuitive and performant with a great Developer Experience in mind.

Nuxt is a free and [open-source framework](https://github.com/nuxt/nuxt) with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with [Vue.js](https://vuejs.org).

We made everything so you can start writing `.vue` files from the beginning while enjoying hot module replacement in development and a performant application in production with server-side rendering by default.

Nuxt has no vendor lock-in, allowing you to deploy your application [**everywhere, even on the edge**](/blog/nuxt-on-the-edge).

<tip>

If you want to play around with Nuxt in your browser, you can [try it out in one of our online sandboxes](/docs/4.x/getting-started/installation#play-online).

</tip>

## Automation and Conventions

Nuxt uses conventions and an opinionated directory structure to automate repetitive tasks and allow developers to focus on pushing features. The configuration file can still customize and override its default behaviors.

- **File-based routing:** define routes based on the structure of your [`pages/` directory](/docs/4.x/guide/directory-structure/pages). This can make it easier to organize your application and avoid the need for manual route configuration.
- **Code splitting:** Nuxt automatically splits your code into smaller chunks, which can help reduce the initial load time of your application.
- **Server-side rendering out of the box:** Nuxt comes with built-in SSR capabilities, so you don't have to set up a separate server yourself.
- **Auto-imports:** write Vue composables and components in their respective directories and use them without having to import them with the benefits of tree-shaking and optimized JS bundles.
- **Data-fetching utilities:** Nuxt provides composables to handle SSR-compatible data fetching as well as different strategies.
- **Zero-config TypeScript support:** write type-safe code without having to learn TypeScript with our auto-generated types and `tsconfig.json`.
- **Configured build tools:** we use [Vite](https://vite.dev) by default to support hot module replacement (HMR) in development and bundling your code for production with best-practices baked-in.

Nuxt takes care of these and provides both frontend and backend functionality so you can focus on what matters: **creating your web application**.

## Server-Side Rendering

Nuxt comes with built-in server-side rendering (SSR) capabilities by default, without having to configure a server yourself, which has many benefits for web applications:

- **Faster initial page load time:** Nuxt sends a fully rendered HTML page to the browser, which can be displayed immediately. This can provide a faster perceived page load time and a better user experience (UX), especially on slower networks or devices.
- **Improved SEO:** search engines can better index SSR pages because the HTML content is available immediately, rather than requiring JavaScript to render the content on the client-side.
- **Better performance on low-powered devices:** it reduces the amount of JavaScript that needs to be downloaded and executed on the client-side, which can be beneficial for low-powered devices that may struggle with processing heavy JavaScript applications.
- **Better accessibility:** the content is immediately available on the initial page load, improving accessibility for users who rely on screen readers or other assistive technologies.
- **Easier caching:** pages can be cached on the server-side, which can further improve performance by reducing the amount of time it takes to generate and send the content to the client.

Overall, server-side rendering can provide a faster and more efficient user experience, as well as improve search engine optimization and accessibility.

As Nuxt is a versatile framework, it gives you the possibility to statically render your whole application to a static hosting with `nuxt generate`,
disable SSR globally with the `ssr: false` option or leverage hybrid rendering by setting up the `routeRules` option.

<read-more title="Nuxt rendering modes" to="/docs/guide/concepts/rendering">

</read-more>

### Server engine

The Nuxt server engine [Nitro](https://nitro.build/) unlocks new full-stack capabilities.

In development, it uses Rollup and Node.js workers for your server code and context isolation. It also generates your server API by reading files in `server/api/` and server middleware from `server/middleware/`.

In production, Nitro builds your app and server into one universal `.output` directory. This output is light: minified and removed from any Node.js modules (except polyfills). You can deploy this output on any system supporting JavaScript, from Node.js, Serverless, Workers, Edge-side rendering or purely static.

<read-more title="Nuxt server engine" to="/docs/guide/concepts/server-engine">

</read-more>

### Production-ready

A Nuxt application can be deployed on a Node or Deno server, pre-rendered to be hosted in static environments, or deployed to serverless and edge providers.

<read-more title="Deployment section" to="/docs/getting-started/deployment">

</read-more>

### Modular

A module system allows you to extend Nuxt with custom features and integrations with third-party services.

<read-more title="Nuxt Modules Concept" to="/docs/guide/concepts/modules">

</read-more>

### Architecture

Nuxt is composed of different [core packages](https://github.com/nuxt/nuxt/tree/main/packages):

- Core engine: [nuxt](https://github.com/nuxt/nuxt/tree/main/packages/nuxt)
- Bundlers: [@nuxt/vite-builder](https://github.com/nuxt/nuxt/tree/main/packages/vite), [@nuxt/rspack-builder](https://github.com/nuxt/nuxt/tree/main/packages/rspack) and [@nuxt/webpack-builder](https://github.com/nuxt/nuxt/tree/main/packages/webpack)
- Command line interface: [@nuxt/cli](https://github.com/nuxt/cli)
- Server engine: [nitro](https://github.com/nitrojs/nitro)
- Development kit: [@nuxt/kit](https://github.com/nuxt/nuxt/tree/main/packages/kit)

We recommend reading each concept to have a full vision of Nuxt capabilities and the scope of each package.

# Installation

> Get started with Nuxt quickly with our online starters or start locally with your terminal.

## Play Online

If you just want to play around with Nuxt in your browser without setting up a project, you can use one of our online sandboxes:

<card-group>
<card icon="i-simple-icons-stackblitz" target="_blank" title="Open on StackBlitz" to="https://nuxt.new/s/v4">

</card>

<card icon="i-simple-icons-codesandbox" target="_blank" title="Open on CodeSandbox" to="https://nuxt.new/c/v4">

</card>
</card-group>

Or follow the steps below to set up a new Nuxt project on your computer.

## New Project

#### Prerequisites

- **Node.js** - [`20.x`](https://nodejs.org/en) or newer (but we recommend the [active LTS release](https://github.com/nodejs/release#release-schedule))
- **Text editor** - There is no IDE requirement, but we recommend [Visual Studio Code](https://code.visualstudio.com/) with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously known as Volar) or [WebStorm](https://www.jetbrains.com/webstorm/), which, along with [other JetBrains IDEs](https://www.jetbrains.com/ides/), offers great Nuxt support right out-of-the-box.
- **Terminal** - In order to run Nuxt commands

<note>
<details>
<summary>

Additional notes for an optimal setup:

</summary>

- **Node.js**: Make sure to use an even numbered version (18, 20, etc)
- **Nuxtr**: Install the community-developed [Nuxtr extension](https://marketplace.visualstudio.com/items?itemName=Nuxtr.nuxtr-vscode)
- **WSL**: If you are using Windows and experience slow HMR, you may want to try using [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/en-us/windows/wsl/install) which may solve some performance issues.

</details>
</note>

Open a terminal (if you're using [Visual Studio Code](https://code.visualstudio.com), you can open an [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)) and use the following command to create a new starter project:

<code-group sync="pm">

```bash [npm]
npm create nuxt <project-name>
```

```bash [yarn]
yarn create nuxt <project-name>
```

```bash [pnpm]
pnpm create nuxt <project-name>
```

```bash [bun]
bun create nuxt <project-name>
```

```bash [deno]
deno -A npm:create-nuxt@latest <project-name>
```

</code-group>

<tip>

Alternatively, you can find other starters or themes by opening [nuxt.new](https://nuxt.new) and following the instructions there.

</tip>

Open your project folder in Visual Studio Code:

```bash [Terminal]
code <project-name>
```

Or change directory into your new project from your terminal:

```bash
cd <project-name>
```

## Development Server

Now you'll be able to start your Nuxt app in development mode:

<code-group sync="pm">

```bash [npm]
npm run dev -- -o
```

```bash [yarn]
yarn dev --open
```

```bash [pnpm]
pnpm dev -o
```

```bash [bun]
bun run dev -o

# To use the Bun runtime during development
# bun --bun run dev -o
```

```bash [deno]
deno run dev -o
```

</code-group>

<tip icon="i-lucide-circle-check">

Well done! A browser window should automatically open for [http://localhost:3000](http://localhost:3000).

</tip>

## Next Steps

Now that you've created your Nuxt project, you are ready to start building your application.

<read-more title="Nuxt Concepts" to="/docs/guide/concepts">

</read-more>
# Configuration

> Nuxt is configured with sensible defaults to make you productive.

By default, Nuxt is configured to cover most use cases. The [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) file can override or extend this default configuration.

## Nuxt Configuration

The [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) file is located at the root of a Nuxt project and can override or extend the application's behavior.

A minimal configuration file exports the `defineNuxtConfig` function containing an object with your configuration. The `defineNuxtConfig` helper is globally available without import.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  // My Nuxt config
});
```

This file will often be mentioned in the documentation, for example to add custom scripts, register modules or change rendering modes.

<read-more to="/docs/api/configuration/nuxt-config">

Every option is described in the **Configuration Reference**.

</read-more>

<note>

You don't have to use TypeScript to build an application with Nuxt. However, it is strongly recommended to use the `.ts` extension for the `nuxt.config` file. This way you can benefit from hints in your IDE to avoid typos and mistakes while editing your configuration.

</note>

### Environment Overrides

You can configure fully typed, per-environment overrides in your nuxt.config

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },
  $development: {
    //
  },
  $env: {
    staging: {
      //
    },
  },
});
```

To select an environment when running a Nuxt CLI command, simply pass the name to the `--envName` flag, like so: `nuxt build --envName staging`.

To learn more about the mechanism behind these overrides, please refer to the `c12` documentation on [environment-specific configuration](https://github.com/unjs/c12?tab=readme-ov-file#environment-specific-configuration).

<video-accordion title="Watch a video from Alexander Lichter about the env-aware nuxt.config.ts" video-id="DFZI2iVCrNc">

</video-accordion>

<note>

If you're authoring layers, you can also use the `$meta` key to provide metadata that you or the consumers of your layer might use.

</note>

### Environment Variables and Private Tokens

The `runtimeConfig` API exposes values like environment variables to the rest of your application. By default, these keys are only available server-side. The keys within `runtimeConfig.public` and `runtimeConfig.app` (which is used by Nuxt internally) are also available client-side.

Those values should be defined in `nuxt.config` and can be overridden using environment variables.

<code-group>

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
});
```

```ini [.env]
# This will override the value of apiSecret
NUXT_API_SECRET=api_secret_token
```

</code-group>

These variables are exposed to the rest of your application using the [`useRuntimeConfig()`](/docs/4.x/api/composables/use-runtime-config) composable.

```vue [pages/index.vue]
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>
```

<read-more to="/docs/guide/going-further/runtime-config">

</read-more>

## App Configuration

The `app.config.ts` file, located in the source directory (by default the root of the project), is used to expose public variables that can be determined at build time. Contrary to the `runtimeConfig` option, these cannot be overridden using environment variables.

A minimal configuration file exports the `defineAppConfig` function containing an object with your configuration. The `defineAppConfig` helper is globally available without import.

```ts [app.config.ts]
export default defineAppConfig({
  title: "Hello Nuxt",
  theme: {
    dark: true,
    colors: {
      primary: "#ff0000",
    },
  },
});
```

These variables are exposed to the rest of your application using the [`useAppConfig`](/docs/4.x/api/composables/use-app-config) composable.

```vue [pages/index.vue]
<script setup lang="ts">
const appConfig = useAppConfig();
</script>
```

<read-more to="/docs/guide/directory-structure/app-config">

</read-more>

## `runtimeConfig` vs. `app.config`

As stated above, `runtimeConfig` and `app.config` are both used to expose variables to the rest of your application. To determine whether you should use one or the other, here are some guidelines:

- `runtimeConfig`: Private or public tokens that need to be specified after build using environment variables.
- `app.config`: Public tokens that are determined at build time, website configuration such as theme variant, title and any project config that are not sensitive.

<table>
<thead>
  <tr>
    <th>
      Feature
    </th>
    
    <th>
      <code>
        runtimeConfig
      </code>
    </th>
    
    <th>
      <code>
        app.config
      </code>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Client Side
    </td>
    
    <td>
      Hydrated
    </td>
    
    <td>
      Bundled
    </td>
  </tr>
  
  <tr>
    <td>
      Environment Variables
    </td>
    
    <td>
      ✅ Yes
    </td>
    
    <td>
      ❌ No
    </td>
  </tr>
  
  <tr>
    <td>
      Reactive
    </td>
    
    <td>
      ✅ Yes
    </td>
    
    <td>
      ✅ Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Types support
    </td>
    
    <td>
      ✅ Partial
    </td>
    
    <td>
      ✅ Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Configuration per Request
    </td>
    
    <td>
      ❌ No
    </td>
    
    <td>
      ✅ Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Hot Module Replacement
    </td>
    
    <td>
      ❌ No
    </td>
    
    <td>
      ✅ Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Non primitive JS types
    </td>
    
    <td>
      ❌ No
    </td>
    
    <td>
      ✅ Yes
    </td>
  </tr>
</tbody>
</table>

## External Configuration Files

Nuxt uses [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) file as the single source of truth for configurations and skips reading external configuration files. During the course of building your project, you may have a need to configure those. The following table highlights common configurations and, where applicable, how they can be configured with Nuxt.

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Config File
    </th>
    
    <th>
      How To Configure
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="https://nitro.build" rel="nofollow">
        Nitro
      </a>
    </td>
    
    <td>
      <del>
        <code>
          nitro.config.ts
        </code>
      </del>
    </td>
    
    <td>
      Use <a href="/docs/4.x/api/nuxt-config#nitro">
        <code>
          nitro
        </code>
      </a>
      
       key in <code>
        nuxt.config
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://postcss.org" rel="nofollow">
        PostCSS
      </a>
    </td>
    
    <td>
      <del>
        <code>
          postcss.config.js
        </code>
      </del>
    </td>
    
    <td>
      Use <a href="/docs/4.x/api/nuxt-config#postcss">
        <code>
          postcss
        </code>
      </a>
      
       key in <code>
        nuxt.config
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://vite.dev" rel="nofollow">
        Vite
      </a>
    </td>
    
    <td>
      <del>
        <code>
          vite.config.ts
        </code>
      </del>
    </td>
    
    <td>
      Use <a href="/docs/4.x/api/nuxt-config#vite">
        <code>
          vite
        </code>
      </a>
      
       key in <code>
        nuxt.config
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://webpack.js.org" rel="nofollow">
        webpack
      </a>
    </td>
    
    <td>
      <del>
        <code>
          webpack.config.ts
        </code>
      </del>
    </td>
    
    <td>
      Use <a href="/docs/4.x/api/nuxt-config#webpack-1">
        <code>
          webpack
        </code>
      </a>
      
       key in <code>
        nuxt.config
      </code>
    </td>
  </tr>
</tbody>
</table>

Here is a list of other common config files:

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Config File
    </th>
    
    <th>
      How To Configure
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="https://www.typescriptlang.org" rel="nofollow">
        TypeScript
      </a>
    </td>
    
    <td>
      <code>
        tsconfig.json
      </code>
    </td>
    
    <td>
      <a href="/docs/4.x/guide/concepts/typescript#nuxttsconfigjson">
        More Info
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://eslint.org" rel="nofollow">
        ESLint
      </a>
    </td>
    
    <td>
      <code>
        eslint.config.js
      </code>
    </td>
    
    <td>
      <a href="https://eslint.org/docs/latest/use/configure/configuration-files" rel="nofollow">
        More Info
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://prettier.io" rel="nofollow">
        Prettier
      </a>
    </td>
    
    <td>
      <code>
        prettier.config.js
      </code>
    </td>
    
    <td>
      <a href="https://prettier.io/docs/en/configuration.html" rel="nofollow">
        More Info
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://stylelint.io" rel="nofollow">
        Stylelint
      </a>
    </td>
    
    <td>
      <code>
        stylelint.config.js
      </code>
    </td>
    
    <td>
      <a href="https://stylelint.io/user-guide/configure" rel="nofollow">
        More Info
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://tailwindcss.com" rel="nofollow">
        TailwindCSS
      </a>
    </td>
    
    <td>
      <code>
        tailwind.config.js
      </code>
    </td>
    
    <td>
      <a href="https://tailwindcss.nuxtjs.org/tailwindcss/configuration" rel="nofollow">
        More Info
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://vitest.dev" rel="nofollow">
        Vitest
      </a>
    </td>
    
    <td>
      <code>
        vitest.config.ts
      </code>
    </td>
    
    <td>
      <a href="https://vitest.dev/config/" rel="nofollow">
        More Info
      </a>
    </td>
  </tr>
</tbody>
</table>

## Vue Configuration

### With Vite

If you need to pass options to `@vitejs/plugin-vue` or `@vitejs/plugin-vue-jsx`, you can do this in your `nuxt.config` file.

- `vite.vue` for `@vitejs/plugin-vue`. Check [available options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue).
- `vite.vueJsx` for `@vitejs/plugin-vue-jsx`. Check [available options](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  vite: {
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    },
  },
});
```

<read-more to="/docs/api/configuration/nuxt-config#vue">

</read-more>

### With webpack

If you use webpack and need to configure `vue-loader`, you can do this using `webpack.loaders.vue` key inside your `nuxt.config` file. The available options are [defined here](https://github.com/vuejs/vue-loader/blob/main/src/index.ts#L32-L62).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      },
    },
  },
});
```

<read-more to="/docs/api/configuration/nuxt-config#loaders">

</read-more>

### Enabling Experimental Vue Features

You may need to enable experimental features in Vue, such as `propsDestructure`. Nuxt provides an easy way to do that in `nuxt.config.ts`, no matter which builder you are using:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  vue: {
    propsDestructure: true,
  },
});
```

#### experimental `reactivityTransform` migration from Vue 3.4 and Nuxt 3.9

Since Nuxt 3.9 and Vue 3.4, `reactivityTransform` has been moved from Vue to Vue Macros which has a [Nuxt integration](https://vue-macros.dev/guide/nuxt-integration.html).

<read-more to="/docs/api/configuration/nuxt-config#vue-1">

</read-more>
# Views

> Nuxt provides several component layers to implement the user interface of your application.

## `app.vue`

![The app.vue file is the entry point of your application](/assets/docs/getting-started/views/app.svg)

By default, Nuxt will treat this file as the **entrypoint** and render its content for every route of the application.

```vue [app.vue]
<template>
  <div>
    <h1>Welcome to the homepage</h1>
  </div>
</template>
```

<tip>

If you are familiar with Vue, you might wonder where `main.js` is (the file that normally creates a Vue app). Nuxt does this behind the scene.

</tip>

## Components

![Components are reusable pieces of UI](/assets/docs/getting-started/views/components.svg)

Most components are reusable pieces of the user interface, like buttons and menus. In Nuxt, you can create these components in the [`components/`](/docs/4.x/guide/directory-structure/components) directory, and they will be automatically available across your application without having to explicitly import them.

<code-group>

```vue [app.vue]
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component. </AppAlert>
  </div>
</template>
```

```vue [components/AppAlert.vue]
<template>
  <span>
    <slot />
  </span>
</template>
```

</code-group>

## Pages

![Pages are views tied to a specific route](/assets/docs/getting-started/views/pages.svg)

Pages represent views for each specific route pattern. Every file in the [`pages/`](/docs/4.x/guide/directory-structure/pages) directory represents a different route displaying its content.

To use pages, create `pages/index.vue` file and add `<NuxtPage />` component to the [`app.vue`](/docs/4.x/guide/directory-structure/app) (or remove `app.vue` for default entry). You can now create more pages and their corresponding routes by adding new files in the [`pages/`](/docs/4.x/guide/directory-structure/pages) directory.

<code-group>

```vue [pages/index.vue]
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>
</template>
```

```vue [pages/about.vue]
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>
```

</code-group>

<read-more to="/docs/getting-started/routing" title="Routing Section">

</read-more>

## Layouts

![Layouts are wrapper around pages](/assets/docs/getting-started/views/layouts.svg)

Layouts are wrappers around pages that contain a common User Interface for several pages, such as header and footer displays. Layouts are Vue files using `<slot />` components to display the **page** content. The `layouts/default.vue` file will be used by default. Custom layouts can be set as part of your page metadata.

<note>

If you only have a single layout in your application, we recommend using [`app.vue`](/docs/4.x/guide/directory-structure/app) with [`<NuxtPage />`](/docs/4.x/api/components/nuxt-page) instead.

</note>

<code-group>

```vue [app.vue]
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

```vue [layouts/default.vue]
<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
```

```vue [pages/index.vue]
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>
</template>
```

```vue [pages/about.vue]
<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>
```

</code-group>

If you want to create more layouts and learn how to use them in your pages, find more information in the [Layouts section](/docs/4.x/guide/directory-structure/layouts).

## Advanced: Extending the HTML Template

<note>

If you only need to modify the `<head>`, you can refer to the [SEO and meta section](/docs/4.x/getting-started/seo-meta).

</note>

You can have full control over the HTML template by adding a Nitro plugin that registers a hook.
The callback function of the `render:html` hook allows you to mutate the HTML before it is sent to the client.

```ts [server/plugins/extend-html.ts]
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    // This will be an object representation of the html template.
    console.log(html);
    html.head.push(
      `<meta name="description" content="My custom description" />`
    );
  });
  // You can also intercept the response here.
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    console.log(response);
  });
});
```

<read-more to="/docs/guide/going-further/hooks">

</read-more>
# Assets

> Nuxt offers two options for your assets.

Nuxt uses two directories to handle assets like stylesheets, fonts or images.

- The [`public/`](/docs/4.x/guide/directory-structure/public) directory content is served at the server root as-is.
- The [`assets/`](/docs/4.x/guide/directory-structure/assets) directory contains by convention every asset that you want the build tool (Vite or webpack) to process.

## Public Directory

The [`public/`](/docs/4.x/guide/directory-structure/public) directory is used as a public server for static assets publicly available at a defined URL of your application.

You can get a file in the [`public/`](/docs/4.x/guide/directory-structure/public) directory from your application's code or from a browser by the root URL `/`.

### Example

For example, referencing an image file in the `public/img/` directory, available at the static URL `/img/nuxt.png`:

```vue [app.vue]
<template>
  <img src="/img/nuxt.png" alt="Discover Nuxt" />
</template>
```

## Assets Directory

Nuxt uses [Vite](https://vite.dev/guide/assets.html) (default) or [webpack](https://webpack.js.org/guides/asset-management) to build and bundle your application. The main function of these build tools is to process JavaScript files, but they can be extended through [plugins](https://vite.dev/plugins) (for Vite) or [loaders](https://webpack.js.org/loaders) (for webpack) to process other kinds of assets, like stylesheets, fonts or SVGs. This step transforms the original file, mainly for performance or caching purposes (such as stylesheet minification or browser cache invalidation).

By convention, Nuxt uses the [`assets/`](/docs/4.x/guide/directory-structure/assets) directory to store these files but there is no auto-scan functionality for this directory, and you can use any other name for it.

In your application's code, you can reference a file located in the [`assets/`](/docs/4.x/guide/directory-structure/assets) directory by using the `~/assets/` path.

### Example

For example, referencing an image file that will be processed if a build tool is configured to handle this file extension:

```vue [app.vue]
<template>
  <img src="~/assets/img/nuxt.png" alt="Discover Nuxt" />
</template>
```

<note>

Nuxt won't serve files in the [`assets/`](/docs/4.x/guide/directory-structure/assets) directory at a static URL like `/assets/my-file.png`. If you need a static URL, use the [`public/`](#public-directory) directory.

</note>
# Styling

> Learn how to style your Nuxt application.

Nuxt is highly flexible when it comes to styling. Write your own styles, or reference local and external stylesheets.
You can use CSS preprocessors, CSS frameworks, UI libraries and Nuxt modules to style your application.

## Local Stylesheets

If you're writing local stylesheets, the natural place to put them is the [`assets/` directory](/docs/4.x/guide/directory-structure/assets).

### Importing Within Components

You can import stylesheets in your pages, layouts and components directly.
You can use a JavaScript import, or a CSS [`@import` statement](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).

```vue [pages/index.vue]
<script>
// Use a static import for server-side compatibility
import "~/assets/css/first.css";

// Caution: Dynamic imports are not server-side compatible
import("~/assets/css/first.css");
</script>

<style>
@import url("~/assets/css/second.css");
</style>
```

<tip>

The stylesheets will be inlined in the HTML rendered by Nuxt.

</tip>

### The CSS Property

You can also use the `css` property in the Nuxt configuration.
The natural place for your stylesheets is the [`assets/` directory](/docs/4.x/guide/directory-structure/assets). You can then reference its path and Nuxt will include it to all the pages of your application.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
});
```

<tip>

The stylesheets will be inlined in the HTML rendered by Nuxt, injected globally and present in all pages.

</tip>

### Working With Fonts

Place your local fonts files in your `~/public/` directory, for example in `~/public/fonts`. You can then reference them in your stylesheets using `url()`.

```css [assets/css/main.css]
@font-face {
  font-family: "FarAwayGalaxy";
  src: url("/fonts/FarAwayGalaxy.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

Then reference your fonts by name in your stylesheets, pages or components:

```vue
<style>
h1 {
  font-family: "FarAwayGalaxy", sans-serif;
}
</style>
```

### Stylesheets Distributed Through NPM

You can also reference stylesheets that are distributed through npm. Let's use the popular `animate.css` library as an example.

<code-group sync="pm">

```bash [npm]
npm install animate.css
```

```bash [yarn]
yarn add animate.css
```

```bash [pnpm]
pnpm install animate.css
```

```bash [bun]
bun install animate.css
```

</code-group>

Then you can reference it directly in your pages, layouts and components:

```vue [app.vue]
<script>
import "animate.css";
</script>

<style>
@import url("animate.css");
</style>
```

The package can also be referenced as a string in the css property of your Nuxt configuration.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: ["animate.css"],
});
```

## External Stylesheets

You can include external stylesheets in your application by adding a link element in the head section of your nuxt.config file. You can achieve this result using different methods. Note that local stylesheets can also be included this way.

You can manipulate the head with the [`app.head`](/docs/4.x/api/nuxt-config#head) property of your Nuxt configuration:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },
});
```

### Dynamically Adding Stylesheets

You can use the useHead composable to dynamically set a value in your head in your code.

<read-more to="/docs/api/composables/use-head">

</read-more>

```tstwoslash
useHead({
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }]
})
```

Nuxt uses `unhead` under the hood, and you can refer to [its full documentation](https://unhead.unjs.io).

### Modifying The Rendered Head With A Nitro Plugin

If you need more advanced control, you can intercept the rendered html with a hook and modify the head programmatically.

Create a plugin in `~/server/plugins/my-plugin.ts` like this:

```ts [server/plugins/my-plugin.ts]
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("render:html", (html) => {
    html.head.push(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">'
    );
  });
});
```

External stylesheets are render-blocking resources: they must be loaded and processed before the browser renders the page. Web pages that contain unnecessarily large styles take longer to render. You can read more about it on [web.dev](https://web.dev/defer-non-critical-css).

## Using Preprocessors

To use a preprocessor like SCSS, Sass, Less or Stylus, install it first.

<code-group>

```bash [Sass & SCSS]
npm install -D sass
```

```bash [Less]
npm install -D less
```

```bash [Stylus]
npm install -D stylus
```

</code-group>

The natural place to write your stylesheets is the `assets` directory.
You can then import your source files in your `app.vue` (or layouts files) using your preprocessor's syntax.

```vue [pages/app.vue]
<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
```

Alternatively, you can use the `css` property of your Nuxt configuration.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
});
```

<tip>

In both cases, the compiled stylesheets will be inlined in the HTML rendered by Nuxt.

</tip>

If you need to inject code in pre-processed files, like a [Sass partial](https://sass-lang.com/documentation/at-rules/use#partials) with color variables, you can do so with the Vite [preprocessors options](https://vite.dev/config/shared-options.html#css-preprocessoroptions).

Create some partials in your `assets` directory:

<code-group sync="preprocessor">

```scss [assets/_colors.scss]
$primary: #49240f;
$secondary: #e4a79d;
```

```sass [assets/_colors.sass]
$primary: #49240F
$secondary: #E4A79D
```

</code-group>

Then in your `nuxt.config` :

<code-group>

```ts [SCSS]twoslash
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;',
        },
      },
    },
  },
});
```

```ts [SASS]twoslash
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/_colors.sass" as *\n',
        },
      },
    },
  },
});
```

</code-group>

Nuxt uses Vite by default. If you wish to use webpack instead, refer to each preprocessor loader [documentation](https://webpack.js.org/loaders/sass-loader).

### Preprocessor Workers (Experimental)

Vite has made available an [experimental option](https://vite.dev/config/shared-options.html#css-preprocessormaxworkers) which can speed up using preprocessors.

You can enable this in your `nuxt.config`:

```ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
    },
  },
});
```

<note>

This is an experimental option and you should refer to the Vite documentation and [provide feedback](https://github.com/vitejs/vite/discussions/15835).

</note>

## Single File Components (SFC) Styling

One of the best things about Vue and SFC is how great it is at naturally dealing with styling. You can directly write CSS or preprocessor code in the style block of your components file, therefore you will have fantastic developer experience without having to use something like CSS-in-JS. However if you wish to use CSS-in-JS, you can find 3rd party libraries and modules that support it, such as [pinceau](https://github.com/Tahul/pinceau).

You can refer to the [Vue docs](https://vuejs.org/api/sfc-css-features.html) for a comprehensive reference about styling components in SFC.

### Class And Style Bindings

You can leverage Vue SFC features to style your components with class and style attributes.

<code-group>

```vue [Ref and Reactive]
<script setup lang="ts">
const isActive = ref(true);
const hasError = ref(false);
const classObject = reactive({
  active: true,
  "text-danger": false,
});
</script>

<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
  <div :class="classObject"></div>
</template>
```

```vue [Computed]
<script setup lang="ts">
const isActive = ref(true);
const error = ref(null);

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  "text-danger": error.value && error.value.type === "fatal",
}));
</script>

<template>
  <div :class="classObject"></div>
</template>
```

```vue [Array]
<script setup lang="ts">
const isActive = ref(true);
const errorClass = ref("text-danger");
</script>

<template>
  <div :class="[{ active: isActive }, errorClass]"></div>
</template>
```

```vue [Style]
<script setup lang="ts">
const activeColor = ref("red");
const fontSize = ref(30);
const styleObject = reactive({ color: "red", fontSize: "13px" });
</script>

<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overridingStyles]"></div>
  <div :style="styleObject"></div>
</template>
```

</code-group>

Refer to the [Vue docs](https://vuejs.org/guide/essentials/class-and-style.html) for more information.

### Dynamic Styles With `v-bind`

You can reference JavaScript variable and expression within your style blocks with the v-bind function.
The binding will be dynamic, meaning that if the variable value changes, the style will be updated.

```vue
<script setup lang="ts">
const color = ref("red");
</script>

<template>
  <div class="text">hello</div>
</template>

<style>
.text {
  color: v-bind(color);
}
</style>
```

### Scoped Styles

The scoped attribute allows you to style components in isolation. The styles declared with this attribute will only apply to this component.

```vue
<template>
  <div class="example">hi</div>
</template>

<style scoped>
.example {
  color: red;
}
</style>
```

### CSS Modules

You can use [CSS Modules](https://github.com/css-modules/css-modules) with the module attribute. Access it with the injected `$style` variable.

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

### Preprocessors Support

SFC style blocks support preprocessor syntax. Vite comes with built-in support for .scss, .sass, .less, .styl and .stylus files without configuration. You just need to install them first, and they will be available directly in SFC with the lang attribute.

<code-group>

```vue [SCSS]
<style lang="scss">
/* Write scss here */
</style>
```

```vue [Sass]
<style lang="sass">
/* Write sass here */
</style>
```

```vue [LESS]
<style lang="less">
/* Write less here */
</style>
```

```vue [Stylus]
<style lang="stylus">
/* Write stylus here */
</style>
```

</code-group>

You can refer to the [Vite CSS docs](https://vite.dev/guide/features.html#css) and the [@vitejs/plugin-vue docs](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue).
For webpack users, refer to the [vue loader docs](https://vue-loader.vuejs.org).

## Using PostCSS

Nuxt comes with postcss built-in. You can configure it in your `nuxt.config` file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
});
```

For proper syntax highlighting in SFC, you can use the postcss lang attribute.

```vue
<style lang="postcss">
/* Write postcss here */
</style>
```

By default, Nuxt comes with the following plugins already pre-configured:

- [postcss-import](https://github.com/postcss/postcss-import): Improves the `@import` rule
- [postcss-url](https://github.com/postcss/postcss-url): Transforms `url()` statements
- [autoprefixer](https://github.com/postcss/autoprefixer): Automatically adds vendor prefixes
- [cssnano](https://cssnano.github.io/cssnano): Minification and purge

## Leveraging Layouts For Multiple Styles

If you need to style different parts of your application completely differently, you can use layouts.
Use different styles for different layouts.

```vue
<template>
  <div class="default-layout">
    <h1>Default Layout</h1>
    <slot />
  </div>
</template>

<style>
.default-layout {
  color: red;
}
</style>
```

<read-more to="/docs/guide/directory-structure/layouts">

</read-more>

## Third Party Libraries And Modules

Nuxt isn't opinionated when it comes to styling and provides you with a wide variety of options. You can use any styling tool that you want, such as popular libraries like [UnoCSS](https://unocss.dev) or [Tailwind CSS](https://tailwindcss.com).

The community and the Nuxt team have developed plenty of Nuxt modules to make the integration easier.
You can discover them on the [modules section](/modules) of the website.
Here are a few modules to help you get started:

- [Tailwind CSS](/modules/tailwindcss): Utility-first CSS framework

Nuxt modules provide you with a good developer experience out of the box, but remember that if your favorite tool doesn't have a module, it doesn't mean that you can't use it with Nuxt! You can configure it yourself for your own project. Depending on the tool, you might need to use a [Nuxt plugin](/docs/4.x/guide/directory-structure/plugins) and/or [make your own module](/docs/4.x/guide/going-further/modules). Share them with the [community](/modules) if you do!

### Easily Load Webfonts

You can use [the Nuxt Google Fonts module](https://github.com/nuxt-modules/google-fonts) to load Google Fonts.

If you are using [UnoCSS](https://unocss.dev/integrations/nuxt), note that it comes with a [web fonts presets](https://unocss.dev/presets/web-fonts) to conveniently load fonts from common providers, including Google Fonts and more.

## Advanced

### Transitions

Nuxt comes with the same `<Transition>` element that Vue has, and also has support for the experimental [View Transitions API](/docs/4.x/getting-started/transitions#view-transitions-api-experimental).

<read-more to="/docs/getting-started/transitions">

</read-more>

### Font Advanced Optimization

We would recommend using [Fontaine](https://github.com/nuxt-modules/fontaine) to reduce your [CLS](https://web.dev/cls). If you need something more advanced, consider creating a Nuxt module to extend the build process or the Nuxt runtime.

<tip>

Always remember to take advantage of the various tools and techniques available in the Web ecosystem at large to make styling your application easier and more efficient. Whether you're using native CSS, a preprocessor, postcss, a UI library or a module, Nuxt has got you covered. Happy styling!

</tip>

### LCP Advanced Optimizations

You can do the following to speed-up the download of your global CSS files:

- Use a CDN so the files are physically closer to your users
- Compress your assets, ideally using Brotli
- Use HTTP2/HTTP3 for delivery
- Host your assets on the same domain (do not use a different subdomain)

Most of these things should be done for you automatically if you're using modern platforms like Cloudflare, Netlify or Vercel.
You can find an LCP optimization guide on [web.dev](https://web.dev/optimize-lcp).

If all of your CSS is inlined by Nuxt, you can (experimentally) completely stop external CSS files from being referenced in your rendered HTML.
You can achieve that with a hook, that you can place in a module, or in your Nuxt configuration file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  hooks: {
    "build:manifest": (manifest) => {
      // find the app entry, css list
      const css = Object.values(manifest).find(
        (options) => options.isEntry
      )?.css;
      if (css) {
        // start from the end of the array and go to the beginning
        for (let i = css.length - 1; i >= 0; i--) {
          // if it starts with 'entry', remove it from the list
          if (css[i].startsWith("entry")) css.splice(i, 1);
        }
      }
    },
  },
});
```

# SEO and Meta

> Improve your Nuxt app's SEO with powerful head config, composables and components.

Nuxt head tag management is powered by [Unhead](https://unhead.unjs.io). It provides sensible defaults, several powerful composables
and numerous configuration options to manage your app's head and SEO meta tags.

## Nuxt Config

Providing an [`app.head`](/docs/4.x/api/nuxt-config#head) property in your [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) allows you to statically customize the head for your entire app.

<important>

This method does not allow you to provide reactive data. We recommend using `useHead()` in `app.vue`.

</important>

It's good practice to set tags here that won't change such as your site title default, language and favicon.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
```

You can also provide any of the keys listed below in [Types](#types).

### Defaults Tags

Some tags are provided by Nuxt by default to ensure your website works well out of the box.

- `viewport`: `width=device-width, initial-scale=1`
- `charset`: `utf-8`

While most sites won't need to override these defaults, you can update them using the keyed shortcuts.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    head: {
      // update Nuxt defaults
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  },
});
```

## `useHead`

The [`useHead`](/docs/4.x/api/composables/use-head) composable function supports reactive input, allowing you to manage your head tags programmatically.

```vue [app.vue]twoslash
<script setup lang="ts">
useHead({
  title: "My App",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});
</script>
```

We recommend taking a look at the [`useHead`](/docs/4.x/api/composables/use-head) and [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe) composables.

## `useSeoMeta`

The [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) composable lets you define your site's SEO meta tags as an object with full type safety.

This helps you avoid typos and common mistakes, such as using `name` instead of `property`.

```vue [app.vue]twoslash
<script setup lang="ts">
useSeoMeta({
  title: "My Amazing Site",
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
```

<read-more to="/docs/api/composables/use-seo-meta">

</read-more>

## Components

While using [`useHead`](/docs/4.x/api/composables/use-head) is recommended in all cases, you may have a personal preference for defining your head tags in your template using components.

Nuxt provides the following components for this purpose: `<Title>`, `<Base>`, `<NoScript>`, `<Style>`, `<Meta>`, `<Link>`, `<Body>`, `<Html>` and `<Head>`. Note
the capitalization of these components ensuring we don't use invalid native HTML tags.

`<Head>` and `<Body>` can accept nested meta tags (for aesthetic reasons) but this does not affect _where_ the nested meta tags are rendered in the final HTML.

```vue [app.vue]
<script setup lang="ts">
const title = ref("Hello World");
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style> body { background-color: green; } </Style>
    </Head>

    <h1>{{ title }}</h1>
  </div>
</template>
```

It's suggested to wrap your components in either a `<Head>` or `<Html>` components as tags will be deduped more intuitively.

## Types

Below are the non-reactive types used for [`useHead`](/docs/4.x/api/composables/use-head), [`app.head`](/docs/4.x/api/nuxt-config#head) and components.

```ts
interface MetaObject {
  title?: string;
  titleTemplate?: string | ((title?: string) => string);
  templateParams?: Record<string, string | Record<string, string>>;
  base?: Base;
  link?: Link[];
  meta?: Meta[];
  style?: Style[];
  script?: Script[];
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
}
```

See [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts) for more detailed types.

## Features

### Reactivity

Reactivity is supported on all properties, by providing a computed value, a getter, or a reactive object.

<code-group>

```vue [useHead]twoslash
<script setup lang="ts">
const description = ref("My amazing site.");

useHead({
  meta: [{ name: "description", content: description }],
});
</script>
```

```vue [useSeoMeta]twoslash
<script setup lang="ts">
const description = ref("My amazing site.");

useSeoMeta({
  description,
});
</script>
```

```vue [Components]
<script setup lang="ts">
const description = ref("My amazing site.");
</script>

<template>
  <div>
    <Meta name="description" :content="description" />
  </div>
</template>
```

</code-group>

### Title Template

You can use the `titleTemplate` option to provide a dynamic template for customizing the title of your site. For example, you could add the name of your site to the title of every page.

The `titleTemplate` can either be a string, where `%s` is replaced with the title, or a function.

If you want to use a function (for full control), then this cannot be set in your `nuxt.config`. It is recommended instead to set it within your `app.vue` file where it will apply to all pages on your site:

<code-group>

```vue [useHead]twoslash
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
  },
});
</script>
```

</code-group>

Now, if you set the title to `My Page` with [`useHead`](/docs/4.x/api/composables/use-head) on another page of your site, the title would appear as 'My Page - Site Title' in the browser tab. You could also pass `null` to default to 'Site Title'.

### Template Params

You can use `templateParams` to provide additional placeholders in your `titleTemplate` besides the default `%s`. This allows for more dynamic title generation.

<code-group>

```vue [useHead]twoslash
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : "%siteName";
  },
  templateParams: {
    siteName: "Site Title",
    separator: "-",
  },
});
</script>
```

</code-group>

### Body Tags

You can use the `tagPosition: 'bodyClose'` option on applicable tags to append them to the end of the `<body>` tag.

For example:

```vuetwoslash
<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://third-party-script.com',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    }
  ]
})
</script>
```

## Examples

### With `definePageMeta`

Within your [`pages/` directory](/docs/4.x/guide/directory-structure/pages), you can use `definePageMeta` along with [`useHead`](/docs/4.x/api/composables/use-head) to set metadata based on the current route.

For example, you can first set the current page title (this is extracted at build time via a macro, so it can't be set dynamically):

```vue [pages/some-page.vue]twoslash
<script setup lang="ts">
definePageMeta({
  title: "Some Page",
});
</script>
```

And then in your layout file, you might use the route's metadata you have previously set:

```vue [layouts/default.vue]twoslash
<script setup lang="ts">
const route = useRoute();

useHead({
  meta: [{ property: "og:title", content: `App Name - ${route.meta.title}` }],
});
</script>
```

<link-example to="/docs/examples/features/meta-tags">

</link-example>

<read-more to="/docs/guide/directory-structure/pages/#page-metadata">

</read-more>

### Dynamic Title

In the example below, `titleTemplate` is set either as a string with the `%s` placeholder or as a `function`, which allows greater flexibility in setting the page title dynamically for each route of your Nuxt app:

```vue [app.vue]twoslash
<script setup lang="ts">
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: "%s - Site Title",
});
</script>
```

```vue [app.vue]twoslash
<script setup lang="ts">
useHead({
  // or as a function
  titleTemplate: (productCategory) => {
    return productCategory ? `${productCategory} - Site Title` : "Site Title";
  },
});
</script>
```

`nuxt.config` is also used as an alternative way of setting the page title. However, `nuxt.config` does not allow the page title to be dynamic. Therefore, it is recommended to use `titleTemplate` in the `app.vue` file to add a dynamic title, which is then applied to all routes of your Nuxt app.

### External CSS

The example below shows how you might enable Google Fonts using either the `link` property of the [`useHead`](/docs/4.x/api/composables/use-head) composable or using the `<Link>` component:

<code-group>

```vue [useHead]twoslash
<script setup lang="ts">
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      crossorigin: "",
    },
  ],
});
</script>
```

```vue [Components]
<template>
  <div>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      crossorigin=""
    />
  </div>
</template>
```

</code-group>
# Transitions

> Apply transitions between pages and layouts with Vue or native browser View Transitions.

<note>

Nuxt leverages Vue's [`<Transition>`](https://vuejs.org/guide/built-ins/transition.html#the-transition-component) component to apply transitions between pages and layouts.

</note>

## Page Transitions

You can enable page transitions to apply an automatic transition for all your [pages](/docs/4.x/guide/directory-structure/pages).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
```

<note>

If you are changing layouts as well as page, the page transition you set here will not run. Instead, you should set a [layout transition](/docs/4.x/getting-started/transitions#layout-transitions).

</note>

To start adding transition between your pages, add the following CSS to your [`app.vue`](/docs/4.x/guide/directory-structure/app):

<code-group>

```vue [app.vue]
<template>
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
```

```vue [pages/index.vue]
<template>
  <div>
    <h1>Home page</h1>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>
```

```vue [pages/about.vue]
<template>
  <div>
    <h1>About page</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>
```

</code-group>

This produces the following result when navigating between pages:

<video controls="true" className="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.jpg">
<source src="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.mp4" type="video/mp4" />
</video>

To set a different transition for a page, set the `pageTransition` key in [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) of the page:

<code-group>

```vue [pages/about.vue]twoslash
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "rotate",
  },
});
</script>
```

```vue [app.vue]
<template>
  <NuxtPage />
</template>

<style>
/* ... */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
```

</code-group>

Moving to the about page will add the 3d rotation effect:

<video controls="true" className="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665063233/nuxt3/nuxt3-page-transitions-cutom.jpg">
<source src="https://res.cloudinary.com/nuxt/video/upload/v1665063233/nuxt3/nuxt3-page-transitions-cutom.mp4" type="video/mp4" />
</video>

## Layout Transitions

You can enable layout transitions to apply an automatic transition for all your [layouts](/docs/4.x/guide/directory-structure/layouts).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
```

To start adding transition between your pages and layouts, add the following CSS to your [`app.vue`](/docs/4.x/guide/directory-structure/app):

<code-group>

```vue [app.vue]
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
```

```vue [layouts/default.vue]
<template>
  <div>
    <pre>default layout</pre>
    <slot />
  </div>
</template>

<style scoped>
div {
  background-color: lightgreen;
}
</style>
```

```vue [layouts/orange.vue]
<template>
  <div>
    <pre>orange layout</pre>
    <slot />
  </div>
</template>

<style scoped>
div {
  background-color: #eebb90;
  padding: 20px;
  height: 100vh;
}
</style>
```

```vue [pages/index.vue]
<template>
  <div>
    <h1>Home page</h1>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>
```

```vue [pages/about.vue]
<script setup lang="ts">
definePageMeta({
  layout: "orange",
});
</script>

<template>
  <div>
    <h1>About page</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>
```

</code-group>

This produces the following result when navigating between pages:

<video controls="true" className="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665065289/nuxt3/nuxt3-layouts-transitions_c9hwlx.jpg">
<source src="https://res.cloudinary.com/nuxt/video/upload/v1665065289/nuxt3/nuxt3-layouts-transitions_c9hwlx.mp4" type="video/mp4" />
</video>

Similar to `pageTransition`, you can apply a custom `layoutTransition` to the page component using `definePageMeta`:

```vue [pages/about.vue]twoslash
<script setup lang="ts">
definePageMeta({
  layout: "orange",
  layoutTransition: {
    name: "slide-in",
  },
});
</script>
```

## Global Settings

You can customize these default transition names globally using `nuxt.config`.

Both `pageTransition` and `layoutTransition` keys accept [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition) as JSON serializable values where you can pass the `name`, `mode` and other valid transition-props of the custom CSS transition.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in", // default
    },
  },
});
```

<warning>

If you change the `name` property, you also have to rename the CSS classes accordingly.

</warning>

To override the global transition property, use the `definePageMeta` to define page or layout transitions for a single Nuxt page and override any page or layout transitions that are defined globally in `nuxt.config` file.

```vue [pages/some-page.vue]twoslash
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "bounce",
    mode: "out-in", // default
  },
});
</script>
```

## Disable Transitions

`pageTransition` and `layoutTransition` can be disabled for a specific route:

```vue [pages/some-page.vue]twoslash
<script setup lang="ts">
definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});
</script>
```

Or globally in the `nuxt.config`:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false,
  },
});
```

## JavaScript Hooks

For advanced use-cases, you can use JavaScript hooks to create highly dynamic and custom transitions for your Nuxt pages.

This way presents perfect use-cases for JavaScript animation libraries such as [GSAP](https://gsap.com).

```vue [pages/some-page.vue]twoslash
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "custom-flip",
    mode: "out-in",
    onBeforeEnter: (el) => {
      console.log("Before enter...");
    },
    onEnter: (el, done) => {},
    onAfterEnter: (el) => {},
  },
});
</script>
```

<tip>

Learn more about additional [JavaScript hooks](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks) available in the `Transition` component.

</tip>

## Dynamic Transitions

To apply dynamic transitions using conditional logic, you can leverage inline [middleware](/docs/4.x/guide/directory-structure/middleware) to assign a different transition name to `to.meta.pageTransition`.

<code-group>

```vue [pages/[id].vue]twoslash
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
  middleware(to, from) {
    if (to.meta.pageTransition && typeof to.meta.pageTransition !== "boolean")
      to.meta.pageTransition.name =
        +to.params.id! > +from.params.id! ? "slide-left" : "slide-right";
  },
});
</script>

<template>
  <h1>#{{ $route.params.id }}</h1>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
```

```vue [layouts/default.vue]
<script setup lang="ts">
const route = useRoute();
const id = computed(() => Number(route.params.id || 1));
const prev = computed(() => "/" + (id.value - 1));
const next = computed(() => "/" + (id.value + 1));
</script>

<template>
  <div>
    <slot />
    <div v-if="$route.params.id">
      <NuxtLink :to="prev">⬅️</NuxtLink> |
      <NuxtLink :to="next">➡️</NuxtLink>
    </div>
  </div>
</template>
```

</code-group>

The page now applies the `slide-left` transition when going to the next id and `slide-right` for the previous:

<video controls="true" className="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665069410/nuxt3/nuxt-dynamic-page-transitions.jpg">
<source src="https://res.cloudinary.com/nuxt/video/upload/v1665069410/nuxt3/nuxt-dynamic-page-transitions.mp4" type="video/mp4" />
</video>

## Transition with NuxtPage

When `<NuxtPage />` is used in `app.vue`, transitions can be configured with the `transition` prop to activate transitions globally.

```vue [app.vue]
<template>
  <div>
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'bounce',
          mode: 'out-in',
        }"
      />
    </NuxtLayout>
  </div>
</template>
```

<note>

Remember, this page transition cannot be overridden with `definePageMeta` on individual pages.

</note>

## View Transitions API (experimental)

Nuxt ships with an experimental implementation of the [**View Transitions API**](https://developer.chrome.com/docs/web-platform/view-transitions) (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)). This is an exciting new way to implement native browser transitions which (among other things) have the ability to transition between unrelated elements on different pages.

You can check a demo on [https://nuxt-view-transitions.surge.sh](https://nuxt-view-transitions.surge.sh) and the [source on StackBlitz](https://stackblitz.com/edit/nuxt-view-transitions).

The Nuxt integration is under active development, but can be enabled with the `experimental.viewTransition` option in your configuration file:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
});
```

The possible values are: `false`, `true`, or `'always'`.

If set to true, Nuxt will not apply transitions if the user's browser matches `prefers-reduced-motion: reduce` (recommended). If set to `always`, Nuxt will always apply the transition and it is up to you to respect the user's preference.

By default, view transitions are enabled for all [pages](/docs/4.x/guide/directory-structure/pages), but you can set a different global default.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  app: {
    // Disable view transitions globally, and opt-in on a per page basis
    viewTransition: false,
  },
});
```

It is possible to override the default `viewTransition` value for a page by setting the `viewTransition` key in [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) of the page:

```vue [pages/about.vue]twoslash
<script setup lang="ts">
definePageMeta({
  viewTransition: false,
});
</script>
```

<warning>

Overriding view transitions on a per-page basis will only have an effect if you have enabled the `experimental.viewTransition` option.

</warning>

If you are also using Vue transitions like `pageTransition` and `layoutTransition` (see above) to achieve the same result as the new View Transitions API, then you may wish to _disable_ Vue transitions if the user's browser supports the newer, native web API. You can do this by creating `~/middleware/disable-vue-transitions.global.ts` with the following contents:

```ts
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server || !document.startViewTransition) {
    return;
  }

  // Disable built-in Vue transitions
  to.meta.pageTransition = false;
  to.meta.layoutTransition = false;
});
```

### Known Issues

- If you perform data fetching within your page setup functions, you may wish to reconsider using this feature for the moment. (By design, View Transitions completely freeze DOM updates whilst they are taking place.) We're looking at restricting the View Transition to the final moments before `<Suspense>` resolves, but in the interim you may want to consider carefully whether to adopt this feature if this describes you.

# Data Fetching

> Nuxt provides composables to handle data fetching within your application.

Nuxt comes with two composables and a built-in library to perform data-fetching in browser or server environments: `useFetch`, [`useAsyncData`](/docs/4.x/api/composables/use-async-data) and `$fetch`.

In a nutshell:

- [`$fetch`](/docs/4.x/api/utils/dollarfetch) is the simplest way to make a network request.
- [`useFetch`](/docs/4.x/api/composables/use-fetch) is a wrapper around `$fetch` that fetches data only once in [universal rendering](/docs/4.x/guide/concepts/rendering#universal-rendering).
- [`useAsyncData`](/docs/4.x/api/composables/use-async-data) is similar to `useFetch` but offers more fine-grained control.

Both `useFetch` and `useAsyncData` share a common set of options and patterns that we will detail in the last sections.

## The need for `useFetch` and `useAsyncData`

Nuxt is a framework which can run isomorphic (or universal) code in both server and client environments. If the [`$fetch` function](/docs/4.x/api/utils/dollarfetch) is used to perform data fetching in the setup function of a Vue component, this may cause data to be fetched twice, once on the server (to render the HTML) and once again on the client (when the HTML is hydrated). This can cause hydration issues, increase the time to interactivity and cause unpredictable behavior.

The [`useFetch`](/docs/4.x/api/composables/use-fetch) and [`useAsyncData`](/docs/4.x/api/composables/use-async-data) composables solve this problem by ensuring that if an API call is made on the server, the data is forwarded to the client in the payload.

The payload is a JavaScript object accessible through [`useNuxtApp().payload`](/docs/4.x/api/composables/use-nuxt-app#payload). It is used on the client to avoid refetching the same data when the code is executed in the browser [during hydration](/docs/4.x/guide/concepts/rendering#universal-rendering).

<tip>

Use the [Nuxt DevTools](https://devtools.nuxt.com) to inspect this data in the **Payload tab**.

</tip>

```vue [app.vue]
<script setup lang="ts">
const { data } = await useFetch("/api/data");

async function handleFormSubmit() {
  const res = await $fetch("/api/submit", {
    method: "POST",
    body: {
      // My form data
    },
  });
}
</script>

<template>
  <div v-if="data == undefined">No data</div>
  <div v-else>
    <form @submit="handleFormSubmit">
      <!-- form input tags -->
    </form>
  </div>
</template>
```

In the example above, `useFetch` would make sure that the request would occur in the server and is properly forwarded to the browser. `$fetch` has no such mechanism and is a better option to use when the request is solely made from the browser.

### Suspense

Nuxt uses Vue's [`<Suspense>`](https://vuejs.org/guide/built-ins/suspense) component under the hood to prevent navigation before every async data is available to the view. The data fetching composables can help you leverage this feature and use what suits best on a per-call basis.

<note>

You can add the [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator) to add a progress bar between page navigations.

</note>

## `$fetch`

Nuxt includes the [ofetch](https://github.com/unjs/ofetch) library, and is auto-imported as the `$fetch` alias globally across your application.

```vue [pages/todos.vue]twoslash
<script setup lang="ts">
async function addTodo() {
  const todo = await $fetch("/api/todos", {
    method: "POST",
    body: {
      // My todo data
    },
  });
}
</script>
```

<warning>

Beware that using only `$fetch` will not provide [network calls de-duplication and navigation prevention](#the-need-for-usefetch-and-useasyncdata). <br />

It is recommended to use `$fetch` for client-side interactions (event-based) or combined with [`useAsyncData`](#useasyncdata) when fetching the initial component data.

</warning>

<read-more to="/docs/api/utils/dollarfetch">

Read more about `$fetch`.

</read-more>

### Pass Client Headers to the API

When calling `useFetch` on the server, Nuxt will use [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) to proxy client headers and cookies (with the exception of headers not meant to be forwarded, like `host`).

```vue
<script setup lang="ts">
const { data } = await useFetch("/api/echo");
</script>
```

```ts
// /api/echo.ts
export default defineEventHandler((event) => parseCookies(event));
```

Alternatively, the example below shows how to use [`useRequestHeaders`](/docs/4.x/api/composables/use-request-headers) to access and send cookies to the API from a server-side request (originating on the client). Using an isomorphic `$fetch` call, we ensure that the API endpoint has access to the same `cookie` header originally sent by the user's browser. This is only necessary if you aren't using `useFetch`.

```vue
<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]);

async function getCurrentUser() {
  return await $fetch("/api/me", { headers });
}
</script>
```

<tip>

You can also use [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) to proxy headers to the call automatically.

</tip>

<caution>

Be very careful before proxying headers to an external API and just include headers that you need. Not all headers are safe to be bypassed and might introduce unwanted behavior. Here is a list of common headers that are NOT to be proxied:

- `host`, `accept`
- `content-length`, `content-md5`, `content-type`
- `x-forwarded-host`, `x-forwarded-port`, `x-forwarded-proto`
- `cf-connecting-ip`, `cf-ray`

</caution>

## `useFetch`

The [`useFetch`](/docs/4.x/api/composables/use-fetch) composable uses `$fetch` under-the-hood to make SSR-safe network calls in the setup function.

```vue [app.vue]twoslash
<script setup lang="ts">
const { data: count } = await useFetch("/api/count");
</script>

<template>
  <p>Page visits: {{ count }}</p>
</template>
```

This composable is a wrapper around the [`useAsyncData`](/docs/4.x/api/composables/use-async-data) composable and `$fetch` utility.

<video-accordion title="Watch a video from Alexander Lichter to avoid using useFetch the wrong way" video-id="njsGVmcWviY">

</video-accordion>

<read-more to="/docs/api/composables/use-fetch">

</read-more>

<link-example to="/docs/examples/features/data-fetching">

</link-example>

## `useAsyncData`

The `useAsyncData` composable is responsible for wrapping async logic and returning the result once it is resolved.

<tip>

`useFetch(url)` is nearly equivalent to `useAsyncData(url, () => event.$fetch(url))`. <br />

It's developer experience sugar for the most common use case. (You can find out more about `event.fetch` at [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch).)

</tip>

<video-accordion title="Watch a video from Alexander Lichter to dig deeper into the difference between useFetch and useAsyncData" video-id="0X-aOpSGabA">

</video-accordion>

There are some cases when using the [`useFetch`](/docs/4.x/api/composables/use-fetch) composable is not appropriate, for example when a CMS or a third-party provide their own query layer. In this case, you can use [`useAsyncData`](/docs/4.x/api/composables/use-async-data) to wrap your calls and still keep the benefits provided by the composable.

```vue [pages/users.vue]
<script setup lang="ts">
const { data, error } = await useAsyncData("users", () =>
  myGetFunction("users")
);

// This is also possible:
const { data, error } = await useAsyncData(() => myGetFunction("users"));
</script>
```

<note>

The first argument of [`useAsyncData`](/docs/4.x/api/composables/use-async-data) is a unique key used to cache the response of the second argument, the querying function. This key can be ignored by directly passing the querying function, the key will be auto-generated.
<br />

 <br />

Since the autogenerated key only takes into account the file and line where `useAsyncData` is invoked, it is recommended to always create your own key to avoid unwanted behavior, like when you are creating your own custom composable wrapping `useAsyncData`.
<br />

 <br />

Setting a key can be useful to share the same data between components using [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data) or to [refresh specific data](/docs/4.x/api/utils/refresh-nuxt-data#refresh-specific-data).

</note>

```vue [pages/users/[id].vue]
<script setup lang="ts">
const { id } = useRoute().params;

const { data, error } = await useAsyncData(`user:${id}`, () => {
  return myGetFunction("users", { id });
});
</script>
```

The `useAsyncData` composable is a great way to wrap and wait for multiple `$fetch` requests to be completed, and then process the results.

```vue
<script setup lang="ts">
const { data: discounts, status } = await useAsyncData(
  "cart-discount",
  async () => {
    const [coupons, offers] = await Promise.all([
      $fetch("/cart/coupons"),
      $fetch("/cart/offers"),
    ]);

    return { coupons, offers };
  }
);
// discounts.value.coupons
// discounts.value.offers
</script>
```

<note>

`useAsyncData` is for fetching and caching data, not triggering side effects like calling Pinia actions, as this can cause unintended behavior such as repeated executions with nullish values. If you need to trigger side effects, use the [`callOnce`](/docs/4.x/api/utils/call-once) utility to do so.

```vue
<script setup lang="ts">
const offersStore = useOffersStore();

// you can't do this
await useAsyncData(() => offersStore.getOffer(route.params.slug));
</script>
```

</note>

<read-more to="/docs/api/composables/use-async-data">

Read more about `useAsyncData`.

</read-more>

## Return Values

`useFetch` and `useAsyncData` have the same return values listed below.

- `data`: the result of the asynchronous function that is passed in.
- `refresh`/`execute`: a function that can be used to refresh the data returned by the `handler` function.
- `clear`: a function that can be used to set `data` to `undefined` (or the value of `options.default()` if provided), set `error` to `undefined`, set `status` to `idle`, and mark any currently pending requests as cancelled.
- `error`: an error object if the data fetching failed.
- `status`: a string indicating the status of the data request (`"idle"`, `"pending"`, `"success"`, `"error"`).

<note>

`data`, `error` and `status` are Vue refs accessible with `.value` in `<script setup>`

</note>

By default, Nuxt waits until a `refresh` is finished before it can be executed again.

<note>

If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await `useFetch` on client-side, `data` will remain null within `<script setup>`.

</note>

## Options

[`useAsyncData`](/docs/4.x/api/composables/use-async-data) and [`useFetch`](/docs/4.x/api/composables/use-fetch) return the same object type and accept a common set of options as their last argument. They can help you control the composables behavior, such as navigation blocking, caching or execution.

### Lazy

By default, data fetching composables will wait for the resolution of their asynchronous function before navigating to a new page by using Vue's Suspense. This feature can be ignored on client-side navigation with the `lazy` option. In that case, you will have to manually handle loading state using the `status` value.

```vue [app.vue]twoslash
<script setup lang="ts">
const { status, data: posts } = useFetch("/api/posts", {
  lazy: true,
});
</script>

<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">Loading ...</div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

You can alternatively use [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch) and `useLazyAsyncData` as convenient methods to perform the same.

```vuetwoslash
<script setup lang="ts">
const { status, data: posts } = useLazyFetch('/api/posts')
</script>
```

<read-more to="/docs/api/composables/use-lazy-fetch">

Read more about `useLazyFetch`.

</read-more>

<read-more to="/docs/api/composables/use-lazy-async-data">

Read more about `useLazyAsyncData`.

</read-more>

<video-accordion title="Watch a video from Vue School on blocking vs. non-blocking (lazy) requests" video-id="1022000555" platform="vimeo">

</video-accordion>

### Client-only fetching

By default, data fetching composables will perform their asynchronous function on both client and server environments. Set the `server` option to `false` to only perform the call on the client-side. On initial load, the data will not be fetched before hydration is complete so you have to handle a pending state, though on subsequent client-side navigation the data will be awaited before loading the page.

Combined with the `lazy` option, this can be useful for data that is not needed on the first render (for example, non-SEO sensitive data).

```tstwoslash
/* This call is performed before hydration */
const articles = await useFetch('/api/article')

/* This call will only be performed on the client */
const { status, data: comments } = useFetch('/api/comments', {
  lazy: true,
  server: false
})
```

The `useFetch` composable is meant to be invoked in setup method or called directly at the top level of a function in lifecycle hooks, otherwise you should use [`$fetch` method](#fetch).

### Minimize payload size

The `pick` option helps you to minimize the payload size stored in your HTML document by only selecting the fields that you want returned from the composables.

```vue
<script setup lang="ts">
/* only pick the fields used in your template */
const { data: mountain } = await useFetch("/api/mountains/everest", {
  pick: ["title", "description"],
});
</script>

<template>
  <h1>{{ mountain.title }}</h1>
  <p>{{ mountain.description }}</p>
</template>
```

If you need more control or map over several objects, you can use the `transform` function to alter the result of the query.

```ts
const { data: mountains } = await useFetch("/api/mountains", {
  transform: (mountains) => {
    return mountains.map((mountain) => ({
      title: mountain.title,
      description: mountain.description,
    }));
  },
});
```

<note>

Both `pick` and `transform` don't prevent the unwanted data from being fetched initially. But they will prevent unwanted data from being added to the payload transferred from server to client.

</note>

<video-accordion title="Watch a video from Vue School on minimizing payload size" video-id="1026410430" platform="vimeo">

</video-accordion>

### Caching and refetching

#### Keys

[`useFetch`](/docs/4.x/api/composables/use-fetch) and [`useAsyncData`](/docs/4.x/api/composables/use-async-data) use keys to prevent refetching the same data.

- [`useFetch`](/docs/4.x/api/composables/use-fetch) uses the provided URL as a key. Alternatively, a `key` value can be provided in the `options` object passed as a last argument.
- [`useAsyncData`](/docs/4.x/api/composables/use-async-data) uses its first argument as a key if it is a string. If the first argument is the handler function that performs the query, then a key that is unique to the file name and line number of the instance of `useAsyncData` will be generated for you.

<tip>

To get the cached data by key, you can use [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data)

</tip>

<video-accordion title="Watch a video from Vue School on caching data with the key option" video-id="1026410044" platform="vimeo">

</video-accordion>

#### Shared State and Option Consistency

When multiple components use the same key with `useAsyncData` or `useFetch`, they will share the same `data`, `error` and `status` refs. This ensures consistency across components but requires some options to be consistent.

The following options **must be consistent** across all calls with the same key:

- `handler` function
- `deep` option
- `transform` function
- `pick` array
- `getCachedData` function
- `default` value

```ts
// ❌ This will trigger a development warning
const { data: users1 } = useAsyncData("users", () => $fetch("/api/users"), {
  deep: false,
});
const { data: users2 } = useAsyncData("users", () => $fetch("/api/users"), {
  deep: true,
});
```

The following options **can safely differ** without triggering warnings:

- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ✅ This is allowed
const { data: users1 } = useAsyncData("users", () => $fetch("/api/users"), {
  immediate: true,
});
const { data: users2 } = useAsyncData("users", () => $fetch("/api/users"), {
  immediate: false,
});
```

If you need independent instances, use different keys:

```ts
// These are completely independent instances
const { data: users1 } = useAsyncData("users-1", () => $fetch("/api/users"));
const { data: users2 } = useAsyncData("users-2", () => $fetch("/api/users"));
```

#### Reactive Keys

You can use computed refs, plain refs or getter functions as keys, allowing for dynamic data fetching that automatically updates when dependencies change:

```ts
// Using a computed property as a key
const userId = ref("123");
const { data: user } = useAsyncData(
  computed(() => `user-${userId.value}`),
  () => fetchUser(userId.value)
);

// When userId changes, the data will be automatically refetched
// and the old data will be cleaned up if no other components use it
userId.value = "456";
```

#### Refresh and execute

If you want to fetch or refresh data manually, use the `execute` or `refresh` function provided by the composables.

```vuetwoslash
<script setup lang="ts">
const { data, error, execute, refresh } = await useFetch('/api/users')
</script>

<template>
  <div>
    <p>{{ data }}</p>
    <button @click="() => refresh()">Refresh data</button>
  </div>
</template>
```

The `execute` function is an alias for `refresh` that works in exactly the same way but is more semantic for cases when the fetch is [not immediate](#not-immediate).

<tip>

To globally refetch or invalidate cached data, see [`clearNuxtData`](/docs/4.x/api/utils/clear-nuxt-data) and [`refreshNuxtData`](/docs/4.x/api/utils/refresh-nuxt-data).

</tip>

#### Clear

If you want to clear the data provided, for whatever reason, without needing to know the specific key to pass to `clearNuxtData`, you can use the `clear` function provided by the composables.

```vuetwoslash
<script setup lang="ts">
const { data, clear } = await useFetch('/api/users')

const route = useRoute()
watch(() => route.path, (path) => {
  if (path === '/') clear()
})
</script>
```

#### Watch

To re-run your fetching function each time other reactive values in your application change, use the `watch` option. You can use it for one or multiple _watchable_ elements.

```vuetwoslash
<script setup lang="ts">
const id = ref(1)

const { data, error, refresh } = await useFetch('/api/users', {
  /* Changing the id will trigger a refetch */
  watch: [id]
})
</script>
```

Note that **watching a reactive value won't change the URL fetched**. For example, this will keep fetching the same initial ID of the user because the URL is constructed at the moment the function is invoked.

```vue
<script setup lang="ts">
const id = ref(1);

const { data, error, refresh } = await useFetch(`/api/users/${id.value}`, {
  watch: [id],
});
</script>
```

If you need to change the URL based on a reactive value, you may want to use a [computed URL](#computed-url) instead.

#### Computed URL

Sometimes you may need to compute a URL from reactive values, and refresh the data each time these change. Instead of juggling your way around, you can attach each param as a reactive value. Nuxt will automatically use the reactive value and re-fetch each time it changes.

```vue
<script setup lang="ts">
const id = ref(null);

const { data, status } = useLazyFetch("/api/user", {
  query: {
    user_id: id,
  },
});
</script>
```

In the case of more complex URL construction, you may use a callback as a [computed getter](https://vuejs.org/guide/essentials/computed.html) that returns the URL string.

Every time a dependency changes, the data will be fetched using the newly constructed URL. Combine this with [not-immediate](#not-immediate), and you can wait until the reactive element changes before fetching.

```vue
<script setup lang="ts">
const id = ref(null);

const { data, status } = useLazyFetch(() => `/api/users/${id.value}`, {
  immediate: false,
});

const pending = computed(() => status.value === "pending");
</script>

<template>
  <div>
    <!-- disable the input while fetching -->
    <input v-model="id" type="number" :disabled="pending" />

    <div v-if="status === 'idle'">Type an user ID</div>

    <div v-else-if="pending">Loading ...</div>

    <div v-else>
      {{ data }}
    </div>
  </div>
</template>
```

If you need to force a refresh when other reactive values change, you can also [watch other values](#watch).

### Not immediate

The `useFetch` composable will start fetching data the moment is invoked. You may prevent this by setting `immediate: false`, for example, to wait for user interaction.

With that, you will need both the `status` to handle the fetch lifecycle, and `execute` to start the data fetch.

```vue
<script setup lang="ts">
const { data, error, execute, status } = await useLazyFetch("/api/comments", {
  immediate: false,
});
</script>

<template>
  <div v-if="status === 'idle'">
    <button @click="execute">Get data</button>
  </div>

  <div v-else-if="status === 'pending'">Loading comments...</div>

  <div v-else>
    {{ data }}
  </div>
</template>
```

For finer control, the `status` variable can be:

- `idle` when the fetch hasn't started
- `pending` when a fetch has started but not yet completed
- `error` when the fetch fails
- `success` when the fetch is completed successfully

## Passing Headers and Cookies

When we call `$fetch` in the browser, user headers like `cookie` will be directly sent to the API.

Normally, during server-side-rendering, due to security considerations, the `$fetch` wouldn't include the user's browser cookies, nor pass on cookies from the fetch response.

However, when calling `useFetch` with a relative URL on the server, Nuxt will use [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) to proxy headers and cookies (with the exception of headers not meant to be forwarded, like `host`).

### Pass Cookies From Server-side API Calls on SSR Response

If you want to pass on/proxy cookies in the other direction, from an internal request back to the client, you will need to handle this yourself.

```ts [composables/fetch.ts]
import { appendResponseHeader } from "h3";
import type { H3Event } from "h3";

export const fetchWithCookie = async (event: H3Event, url: string) => {
  /* Get the response from the server endpoint */
  const res = await $fetch.raw(url);
  /* Get the cookies from the response */
  const cookies = res.headers.getSetCookie();
  /* Attach each cookie to our incoming Request */
  for (const cookie of cookies) {
    appendResponseHeader(event, "set-cookie", cookie);
  }
  /* Return the data of the response */
  return res._data;
};
```

```vue
<script setup lang="ts">
// This composable will automatically pass cookies to the client
const event = useRequestEvent();

const { data: result } = await useAsyncData(() =>
  fetchWithCookie(event!, "/api/with-cookie")
);

onMounted(() => console.log(document.cookie));
</script>
```

## Options API Support

Nuxt provides a way to perform `asyncData` fetching within the Options API. You must wrap your component definition within `defineNuxtComponent` for this to work.

```vue
<script>
export default defineNuxtComponent({
  /* Use the fetchKey option to provide a unique key */
  fetchKey: "hello",
  async asyncData() {
    return {
      hello: await $fetch("/api/hello"),
    };
  },
});
</script>
```

<note>

Using `<script setup>` or `<script setup lang="ts">` are the recommended way of declaring Vue components in Nuxt.

</note>

<read-more to="/docs/api/utils/define-nuxt-component">

</read-more>

## Serializing Data From Server to Client

When using `useAsyncData` and `useLazyAsyncData` to transfer data fetched on server to the client (as well as anything else that utilizes [the Nuxt payload](/docs/4.x/api/composables/use-nuxt-app#payload)), the payload is serialized with [`devalue`](https://github.com/Rich-Harris/devalue). This allows us to transfer not just basic JSON but also to serialize and revive/deserialize more advanced kinds of data, such as regular expressions, Dates, Map and Set, `ref`, `reactive`, `shallowRef`, `shallowReactive` and `NuxtError` - and more.

It is also possible to define your own serializer/deserializer for types that are not supported by Nuxt. You can read more in the [`useNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#payload) docs.

<note>

Note that this _does not apply_ to data passed from your server routes when fetched with `$fetch` or `useFetch` - see the next section for more information.

</note>

## Serializing Data From API Routes

When fetching data from the `server` directory, the response is serialized using `JSON.stringify`. However, since serialization is limited to only JavaScript primitive types, Nuxt does its best to convert the return type of `$fetch` and [`useFetch`](/docs/4.x/api/composables/use-fetch) to match the actual value.

<read-more to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description" icon="i-simple-icons-mdnwebdocs" target="_blank">

Learn more about `JSON.stringify` limitations.

</read-more>

### Example

```ts [server/api/foo.ts]
export default defineEventHandler(() => {
  return new Date();
});
```

```vue [app.vue]
<script setup lang="ts">
// Type of `data` is inferred as string even though we returned a Date object
const { data } = await useFetch("/api/foo");
</script>
```

### Custom serializer function

To customize the serialization behavior, you can define a `toJSON` function on your returned object. If you define a `toJSON` method, Nuxt will respect the return type of the function and will not try to convert the types.

```ts [server/api/bar.ts]
export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    toJSON() {
      return {
        createdAt: {
          year: this.createdAt.getFullYear(),
          month: this.createdAt.getMonth(),
          day: this.createdAt.getDate(),
        },
      };
    },
  };
  return data;
});
```

```vue [app.vue]
<script setup lang="ts">
// Type of `data` is inferred as
// {
//   createdAt: {
//     year: number
//     month: number
//     day: number
//   }
// }
const { data } = await useFetch("/api/bar");
</script>
```

### Using an alternative serializer

Nuxt does not currently support an alternative serializer to `JSON.stringify`. However, you can return your payload as a normal string and utilize the `toJSON` method to maintain type safety.

In the example below, we use [superjson](https://github.com/blitz-js/superjson) as our serializer.

```ts [server/api/superjson.ts]
import superjson from "superjson";

export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    // Workaround the type conversion
    toJSON() {
      return this;
    },
  };

  // Serialize the output to string, using superjson
  return superjson.stringify(data) as unknown as typeof data;
});
```

```vue [app.vue]
<script setup lang="ts">
import superjson from "superjson";

// `date` is inferred as { createdAt: Date } and you can safely use the Date object methods
const { data } = await useFetch("/api/superjson", {
  transform: (value) => {
    return superjson.parse(value as unknown as string);
  },
});
</script>
```

## Recipes

### Consuming SSE (Server-Sent Events) via POST request

<tip>

If you're consuming SSE via GET request, you can use [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) or VueUse composable [`useEventSource`](https://vueuse.org/core/useEventSource/).

</tip>

When consuming SSE via POST request, you need to handle the connection manually. Here's how you can do it:

```ts
// Make a POST request to the SSE endpoint
const response = await $fetch<ReadableStream>("/chats/ask-ai", {
  method: "POST",
  body: {
    query: "Hello AI, how are you?",
  },
  responseType: "stream",
});

// Create a new ReadableStream from the response with TextDecoderStream to get the data as text
const reader = response.pipeThrough(new TextDecoderStream()).getReader();

// Read the chunk of data as we get it
while (true) {
  const { value, done } = await reader.read();

  if (done) break;

  console.log("Received:", value);
}
```

### Making parallel requests

When requests don't rely on each other, you can make them in parallel with `Promise.all()` to boost performance.

```ts
const { data } = await useAsyncData(() => {
  return Promise.all([$fetch("/api/comments/"), $fetch("/api/author/12")]);
});

const comments = computed(() => data.value?.[0]);
const author = computed(() => data.value?.[1]);
```

<video-accordion title="Watch a video from Vue School on parallel data fetching" video-id="1024262536" platform="vimeo">

</video-accordion>
# State Management

> Nuxt provides powerful state management libraries and the useState composable to create a reactive and SSR-friendly shared state.

Nuxt provides the [`useState`](/docs/4.x/api/composables/use-state) composable to create a reactive and SSR-friendly shared state across components.

[`useState`](/docs/4.x/api/composables/use-state) is an SSR-friendly [`ref`](https://vuejs.org/api/reactivity-core.html#ref) replacement. Its value will be preserved after server-side rendering (during client-side hydration) and shared across all components using a unique key.

<video-accordion title="Watch a video from Alexander Lichter about why and when to use useState" video-id="mv0WcBABcIk">

</video-accordion>

<important>

Because the data inside [`useState`](/docs/4.x/api/composables/use-state) will be serialized to JSON, it is important that it does not contain anything that cannot be serialized, such as classes, functions or symbols.

</important>

<read-more to="/docs/api/composables/use-state">

Read more about `useState` composable.

</read-more>

## Best Practices

<warning>

Never define `const state = ref()` outside of `<script setup>` or `setup()` function.<br />

For example, doing `export myState = ref({})` would result in state shared across requests on the server and can lead to memory leaks.

</warning>

<tip icon="i-lucide-circle-check">

Instead use `const useX = () => useState('x')`

</tip>

## Examples

### Basic Usage

In this example, we use a component-local counter state. Any other component that uses `useState('counter')` shares the same reactive state.

```vue [app.vue]twoslash
<script setup lang="ts">
const counter = useState("counter", () => Math.round(Math.random() * 1000));
</script>

<template>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
</template>
```

<link-example to="/docs/examples/features/state-management">

</link-example>

<note>

To globally invalidate cached state, see [`clearNuxtState`](/docs/4.x/api/utils/clear-nuxt-state) util.

</note>

### Initializing State

Most of the time, you will want to initialize your state with data that resolves asynchronously. You can use the [`app.vue`](/docs/4.x/guide/directory-structure/app) component with the [`callOnce`](/docs/4.x/api/utils/call-once) util to do so.

```vue [app.vue]twoslash
<script setup lang="ts">
const websiteConfig = useState("config");

await callOnce(async () => {
  websiteConfig.value = await $fetch("https://my-cms.com/api/website-config");
});
</script>
```

<tip>

This is similar to the [`nuxtServerInit` action](https://v2.nuxt.com/docs/directory-structure/store/#the-nuxtserverinit-action) in Nuxt 2, which allows filling the initial state of your store server-side before rendering the page.

</tip>

<read-more to="/docs/api/utils/call-once">

</read-more>

### Usage with Pinia

In this example, we leverage the [Pinia module](/modules/pinia) to create a global store and use it across the app.

<important>

Make sure to install the Pinia module with `npx nuxt module add pinia` or follow the [module's installation steps](https://pinia.vuejs.org/ssr/nuxt.html#Installation).

</important>

<code-group>

```ts [stores/website.ts]
export const useWebsiteStore = defineStore("websiteStore", {
  state: () => ({
    name: "",
    description: "",
  }),
  actions: {
    async fetch() {
      const infos = await $fetch("https://api.nuxt.com/modules/pinia");

      this.name = infos.name;
      this.description = infos.description;
    },
  },
});
```

```vue [app.vue]
<script setup lang="ts">
const website = useWebsiteStore();

await callOnce(website.fetch);
</script>

<template>
  <main>
    <h1>{{ website.name }}</h1>
    <p>{{ website.description }}</p>
  </main>
</template>
```

</code-group>

## Advanced Usage

<code-group>

```ts [composables/locale.ts]
import type { Ref } from "vue";

export const useLocale = () => {
  return useState<string>("locale", () => useDefaultLocale().value);
};

export const useDefaultLocale = (fallback = "en-US") => {
  const locale = ref(fallback);
  if (import.meta.server) {
    const reqLocale = useRequestHeaders()["accept-language"]?.split(",")[0];
    if (reqLocale) {
      locale.value = reqLocale;
    }
  } else if (import.meta.client) {
    const navLang = navigator.language;
    if (navLang) {
      locale.value = navLang;
    }
  }
  return locale;
};

export const useLocales = () => {
  const locale = useLocale();
  const locales = ref(["en-US", "en-GB", ..."ja-JP-u-ca-japanese"]);
  if (!locales.value.includes(locale.value)) {
    locales.value.unshift(locale.value);
  }
  return locales;
};

export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
  return computed(() =>
    new Intl.DateTimeFormat(locale.value, { dateStyle: "full" }).format(
      unref(date)
    )
  );
};
```

```vue [app.vue]
<script setup lang="ts">
const locales = useLocales();
const locale = useLocale();
const date = useLocaleDate(new Date("2016-10-26"));
</script>

<template>
  <div>
    <h1>Nuxt birthday</h1>
    <p>{{ date }}</p>
    <label for="locale-chooser">Preview a different locale</label>
    <select id="locale-chooser" v-model="locale">
      <option v-for="locale of locales" :key="locale" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>
```

</code-group>

<link-example to="/docs/examples/advanced/locale">

</link-example>

## Shared State

By using [auto-imported composables](/docs/4.x/guide/directory-structure/composables) we can define global type-safe states and import them across the app.

```ts [composables/states.ts]twoslash
export const useColor = () => useState<string>("color", () => "pink");
```

```vue [app.vue]
<script setup lang="ts">
// ---cut-start---
const useColor = () => useState<string>("color", () => "pink");
// ---cut-end---
const color = useColor(); // Same as useState('color')
</script>

<template>
  <p>Current color: {{ color }}</p>
</template>
```

<video-accordion title="Watch a video from Daniel Roe on how to deal with global state and SSR in Nuxt" video-id="dZSNW07sO-A">

</video-accordion>

## Using third-party libraries

Nuxt **used to rely** on the Vuex library to provide global state management. If you are migrating from Nuxt 2, please head to [the migration guide](/docs/4.x/migration/configuration#vuex).

Nuxt is not opinionated about state management, so feel free to choose the right solution for your needs. There are multiple integrations with the most popular state management libraries, including:

- [Pinia](/modules/pinia) - the official Vue recommendation
- [Harlem](/modules/harlem) - immutable global state management
- [XState](/modules/xstate) - state machine approach with tools for visualizing and testing your state logic

# Error Handling

> Learn how to catch and handle errors in Nuxt.

Nuxt is a full-stack framework, which means there are several sources of unpreventable user runtime errors that can happen in different contexts:

- Errors during the Vue rendering lifecycle (SSR & CSR)
- Server and client startup errors (SSR + CSR)
- Errors during Nitro server lifecycle ([`server/`](/docs/4.x/guide/directory-structure/server) directory)
- Errors downloading JS chunks

<tip>

**SSR** stands for **Server-Side Rendering** and **CSR** for **Client-Side Rendering**.

</tip>

## Vue Errors

You can hook into Vue errors using [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured).

In addition, Nuxt provides a [`vue:error`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) hook that will be called if any errors propagate up to the top level.

If you are using an error reporting framework, you can provide a global handler through [`vueApp.config.errorHandler`](https://vuejs.org/api/application.html#app-config-errorhandler). It will receive all Vue errors, even if they are handled.

```ts [plugins/error-handler.ts]twoslash
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // handle error, e.g. report to a service
  };

  // Also possible
  nuxtApp.hook("vue:error", (error, instance, info) => {
    // handle error, e.g. report to a service
  });
});
```

<note>

Note that the `vue:error` hook is based on [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured) lifecycle hook.

</note>

## Startup Errors

Nuxt will call the `app:error` hook if there are any errors in starting your Nuxt application.

This includes:

- running [Nuxt plugins](/docs/4.x/guide/directory-structure/plugins)
- processing `app:created` and `app:beforeMount` hooks
- rendering your Vue app to HTML (during SSR)
- mounting the app (on client-side), though you should handle this case with `onErrorCaptured` or with `vue:error`
- processing the `app:mounted` hook

## Nitro Server Errors

You cannot currently define a server-side handler for these errors, but can render an error page, see the [Render an Error Page](#error-page) section.

## Errors with JS Chunks

You might encounter chunk loading errors due to a network connectivity failure or a new deployment (which invalidates your old, hashed JS chunk URLs). Nuxt provides built-in support for handling chunk loading errors by performing a hard reload when a chunk fails to load during route navigation.

You can change this behavior by setting `experimental.emitRouteChunkError` to `false` (to disable hooking into these errors at all) or to `manual` if you want to handle them yourself. If you want to handle chunk loading errors manually, you can check out the [the automatic implementation](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/plugins/chunk-reload.client.ts) for ideas.

## Error Page

<note>

When Nuxt encounters a fatal error (any unhandled error on the server, or an error created with `fatal: true` on the client) it will either render a JSON response (if requested with `Accept: application/json` header) or trigger a full-screen error page.

</note>

An error may occur during the server lifecycle when:

- processing your Nuxt plugins
- rendering your Vue app into HTML
- a server API route throws an error

It can also occur on the client side when:

- processing your Nuxt plugins
- before mounting the application (`app:beforeMount` hook)
- mounting your app if the error was not handled with `onErrorCaptured` or `vue:error` hook
- the Vue app is initialized and mounted in browser (`app:mounted`).

<read-more to="/docs/api/advanced/hooks">

Discover all the Nuxt lifecycle hooks.

</read-more>

Customize the default error page by adding `~/error.vue` in the source directory of your application, alongside `app.vue`.

```vue [error.vue]
<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <h2>{{ error?.statusCode }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
</template>
```

<read-more to="/docs/guide/directory-structure/error">

Read more about `error.vue` and its uses.

</read-more>

For custom errors we highly recommend using `onErrorCaptured` composable that can be called in a page/component setup function or `vue:error` runtime nuxt hook that can be configured in a nuxt plugin.

```ts [plugins/error-handler.ts]twoslash
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (err) => {
    //
  });
});
```

When you are ready to remove the error page, you can call the [`clearError`](/docs/4.x/api/utils/clear-error) helper function, which takes an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

<important>

Make sure to check before using anything dependent on Nuxt plugins, such as `$route` or `useRouter`, as if a plugin threw an error, then it won't be re-run until you clear the error.

</important>

<note>

Rendering an error page is an entirely separate page load, meaning any registered middleware will run again. You can use [`useError`](#useerror) in middleware to check if an error is being handled.

</note>

<note>

If you are running on Node 16 and you set any cookies when rendering your error page, they will [overwrite cookies previously set](https://github.com/nuxt/nuxt/pull/20585). We recommend using a newer version of Node as Node 16 reached end-of-life in September 2023.

</note>

## Error Utils

### `useError`

```ts [TS Signature]
function useError(): Ref<
  Error | { url; statusCode; statusMessage; message; description; data }
>;
```

This function will return the global Nuxt error that is being handled.

<read-more to="/docs/api/composables/use-error">

Read more about `useError` composable.

</read-more>

### `createError`

```ts [TS Signature]
function createError(
  err:
    | string
    | { cause; data; message; name; stack; statusCode; statusMessage; fatal }
): Error;
```

Create an error object with additional metadata. You can pass a string to be set as the error `message` or an object containing error properties. It is usable in both the Vue and Server portions of your app, and is meant to be thrown.

If you throw an error created with `createError`:

- on server-side, it will trigger a full-screen error page which you can clear with [`clearError`](#clearerror).
- on client-side, it will throw a non-fatal error for you to handle. If you need to trigger a full-screen error page, then you can do this by setting `fatal: true`.

```vue [pages/movies/[slug].vue]twoslash
<script setup lang="ts">
const route = useRoute();
const { data } = await useFetch(`/api/movies/${route.params.slug}`);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}
</script>
```

<read-more to="/docs/api/utils/create-error">

Read more about `createError` util.

</read-more>

### `showError`

```ts [TS Signature]
function showError(err: string | Error | { statusCode; statusMessage }): Error;
```

You can call this function at any point on client-side, or (on server side) directly within middleware, plugins or `setup()` functions. It will trigger a full-screen error page which you can clear with [`clearError`](#clearerror).

It is recommended instead to use `throw createError()`.

<read-more to="/docs/api/utils/show-error">

Read more about `showError` util.

</read-more>

### `clearError`

```ts [TS Signature]
function clearError(options?: { redirect?: string }): Promise<void>;
```

This function will clear the currently handled Nuxt error. It also takes an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

<read-more to="/docs/api/utils/clear-error">

Read more about `clearError` util.

</read-more>

## Render Error in Component

Nuxt also provides a [`<NuxtErrorBoundary>`](/docs/4.x/api/components/nuxt-error-boundary) component that allows you to handle client-side errors within your app, without replacing your entire site with an error page.

This component is responsible for handling errors that occur within its default slot. On client-side, it will prevent the error from bubbling up to the top level, and will render the `#error` slot instead.

The `#error` slot will receive `error` as a prop. (If you set `error = null` it will trigger re-rendering the default slot; you'll need to ensure that the error is fully resolved first or the error slot will just be rendered a second time.)

<tip>

If you navigate to another route, the error will be cleared automatically.

</tip>

```vue [pages/index.vue]
<template>
  <!-- some content -->
  <NuxtErrorBoundary @error="someErrorLogger">
    <!-- You use the default slot to render your content -->
    <template #error="{ error, clearError }">
      You can display the error locally here: {{ error }}
      <button @click="clearError">This will clear the error.</button>
    </template>
  </NuxtErrorBoundary>
</template>
```

<link-example to="/docs/examples/advanced/error-handling">

</link-example>
# Server

> Build full-stack applications with Nuxt's server framework. You can fetch data from your database or another server, create APIs, or even generate static server-side content like a sitemap or a RSS feed - all from a single codebase.

<read-more to="/docs/guide/directory-structure/server">

</read-more>

## Powered by Nitro

![Server engine](/assets/docs/getting-started/server.svg)

Nuxt's server is [Nitro](https://github.com/nitrojs/nitro). It was originally created for Nuxt but is now part of [UnJS](https://unjs.io) and open for other frameworks - and can even be used on its own.

Using Nitro gives Nuxt superpowers:

- Full control of the server-side part of your app
- Universal deployment on any provider (many zero-config)
- Hybrid rendering

Nitro is internally using [h3](https://github.com/h3js/h3), a minimal H(TTP) framework built for high performance and portability.

<video-accordion title="Watch a video from Alexander Lichter to understand the responsibilities of Nuxt and Nitro in your application" video-id="DkvgJa-X31k">

</video-accordion>

## Server Endpoints & Middleware

You can easily manage the server-only part of your Nuxt app, from API endpoints to middleware.

Both endpoints and middleware can be defined like this:

```ts [server/api/test.ts]twoslash
export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
});
```

And you can directly return `text`, `json`, `html` or even a `stream`.

Out-of-the-box, it supports **hot module replacement** and **auto-import** like the other parts of your Nuxt application.

<read-more to="/docs/guide/directory-structure/server">

</read-more>

## Universal Deployment

Nitro offers the ability to deploy your Nuxt app anywhere, from a bare metal server to the edge network, with a start time of just a few milliseconds. That's fast!

<read-more to="/blog/nuxt-on-the-edge">

</read-more>

There are more than 15 presets to build your Nuxt app for different cloud providers and servers, including:

- [Cloudflare Workers](https://workers.cloudflare.com)
- [Netlify Functions](https://www.netlify.com/products/functions)
- [Vercel Edge Network](https://vercel.com/docs/edge-network)

Or for other runtimes:

<card-group>
<card icon="i-logos-deno" target="_blank" title="Deno" to="https://deno.land">

</card>

<card icon="i-logos-bun" target="_blank" title="Bun" to="https://bun.sh">

</card>
</card-group>

<read-more to="/docs/getting-started/deployment">

</read-more>

## Hybrid Rendering

Nitro has a powerful feature called `routeRules` which allows you to define a set of rules to customize how each route of your Nuxt app is rendered (and more).

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  routeRules: {
    // Generated at build time for SEO purpose
    "/": { prerender: true },
    // Cached for 1 hour
    "/api/*": { cache: { maxAge: 60 * 60 } },
    // Redirection to avoid 404
    "/old-page": {
      redirect: { to: "/new-page", statusCode: 302 },
    },
    // ...
  },
});
```

<read-more to="/docs/guide/concepts/rendering#hybrid-rendering">

Learn about all available route rules are available to customize the rendering mode of your routes.

</read-more>

In addition, there are some route rules (for example, `ssr`, `appMiddleware`, and `noScripts`) that are Nuxt specific to change the behavior when rendering your pages to HTML.

Some route rules (`appMiddleware`, `redirect` and `prerender`) also affect client-side behavior.

Nitro is used to build the app for server side rendering, as well as pre-rendering.

<read-more to="/docs/guide/concepts/rendering">

</read-more>
# Layers

> Nuxt provides a powerful system that allows you to extend the default files, configs, and much more.

One of the core features of Nuxt is the layers and extending support. You can extend a default Nuxt application to reuse components, utils, and configuration. The layers structure is almost identical to a standard Nuxt application which makes them easy to author and maintain.

## Use Cases

- Share reusable configuration presets across projects using `nuxt.config` and `app.config`
- Create a component library using [`components/`](/docs/4.x/guide/directory-structure/components) directory
- Create utility and composable library using [`composables/`](/docs/4.x/guide/directory-structure/composables) and [`utils/`](/docs/4.x/guide/directory-structure/utils) directories
- Create Nuxt module presets
- Share standard setup across projects
- Create Nuxt themes
- Enhance code organization by implementing a modular architecture and support Domain-Driven Design (DDD) pattern in large scale projects.

## Usage

By default, any layers within your project in the `~~/layers` directory will be automatically registered as layers in your project.

<note>

Layer auto-registration was introduced in Nuxt v3.12.0.

</note>

In addition, named layer aliases to the `srcDir` of each of these layers will automatically be created. For example, you will be able to access the `~~/layers/test` layer via `#layers/test`.

<note>

Named layer aliases were introduced in Nuxt v3.16.0.

</note>

In addition, you can extend from a layer by adding the [extends](/docs/4.x/api/nuxt-config#extends) property to your [`nuxt.config`](/docs/4.x/guide/directory-structure/nuxt-config) file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    "../base", // Extend from a local layer
    "@my-themes/awesome", // Extend from an installed npm package
    "github:my-themes/awesome#v1", // Extend from a git repository
  ],
});
```

You can also pass an authentication token if you are extending from a private GitHub repository:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    // per layer configuration
    ["github:my-themes/private-awesome", { auth: process.env.GITHUB_TOKEN }],
  ],
});
```

<tip>

You can override a layer's alias by specifying it in the options next to the layer source.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    [
      "github:my-themes/awesome",
      {
        meta: {
          name: "my-awesome-theme",
        },
      },
    ],
  ],
});
```

</tip>

Nuxt uses [unjs/c12](https://c12.unjs.io) and [unjs/giget](https://giget.unjs.io) for extending remote layers. Check the documentation for more information and all available options.

<read-more to="/docs/guide/going-further/layers">

Read more about layers in the **Layer Author Guide**.

</read-more>

<video-accordion title="Watch a video from Learn Vue about Nuxt Layers" video-id="lnFCM7c9f7I">

</video-accordion>

<video-accordion title="Watch a video from Alexander Lichter about Nuxt Layers" video-id="fr5yo3aVkfA">

</video-accordion>

## Examples

<card-group>
<card icon="i-simple-icons-github" target="_blank" title="Content Wind" to="https://github.com/Atinux/content-wind">

A lightweight Nuxt theme to build a Markdown driven website. Powered by Nuxt Content, TailwindCSS and Iconify.

</card>
</card-group>
# Prerendering

> Nuxt allows pages to be statically rendered at build time to improve certain performance or SEO metrics

Nuxt allows for select pages from your application to be rendered at build time. Nuxt will serve the prebuilt pages when requested instead of generating them on the fly.

<read-more to="/docs/guide/concepts/rendering" title="Nuxt rendering modes">

</read-more>

## Crawl-based Pre-rendering

Use the [`nuxt generate` command](/docs/4.x/api/commands/generate) to build and pre-render your application using the [Nitro](/docs/4.x/guide/concepts/server-engine) crawler. This command is similar to `nuxt build` with the `nitro.static` option set to `true`, or running `nuxt build --prerender`.

This will build your site, stand up a nuxt instance, and, by default, prerender the root page `/` along with any of your site's pages it links to, any of your site's pages they link to, and so on.

<code-group sync="pm">

```bash [npm]
npx nuxt generate
```

```bash [yarn]
yarn nuxt generate
```

```bash [pnpm]
pnpm nuxt generate
```

```bash [bun]
bun x nuxt generate
```

</code-group>

You can now deploy the `.output/public` directory to any static hosting service or preview it locally with `npx serve .output/public`.

Working of the Nitro crawler:

1. Load the HTML of your application's root route (`/`), any non-dynamic pages in your `~/pages` directory, and any other routes in the `nitro.prerender.routes` array.
2. Save the HTML and `payload.json` to the `~/.output/public/` directory to be served statically.
3. Find all anchor tags (`<a href="...">`) in the HTML to navigate to other routes.
4. Repeat steps 1-3 for each anchor tag found until there are no more anchor tags to crawl.

This is important to understand since pages that are not linked to a discoverable page can't be pre-rendered automatically.

<read-more to="/docs/api/commands/generate#nuxt-generate">

Read more about the `nuxt generate` command.

</read-more>

### Selective Pre-rendering

You can manually specify routes that [Nitro](/docs/4.x/guide/concepts/server-engine) will fetch and pre-render during the build or ignore routes that you don't want to pre-render like `/dynamic` in the `nuxt.config` file:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ["/user/1", "/user/2"],
      ignore: ["/dynamic"],
    },
  },
});
```

You can combine this with the `crawlLinks` option to pre-render a set of routes that the crawler can't discover like your `/sitemap.xml` or `/robots.txt`:

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },
});
```

Setting `nitro.prerender` to `true` is similar to `nitro.prerender.crawlLinks` to `true`.

<read-more to="https://nitro.build/config#prerender">

Read more about pre-rendering in the Nitro documentation.

</read-more>

Lastly, you can manually configure this using routeRules.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  routeRules: {
    // Set prerender to true to configure it to be prerendered
    "/rss.xml": { prerender: true },
    // Set it to false to configure it to be skipped for prerendering
    "/this-DOES-NOT-get-prerendered": { prerender: false },
    // Everything under /blog gets prerendered as long as it
    // is linked to from another page
    "/blog/**": { prerender: true },
  },
});
```

<read-more to="https://nitro.build/config/#routerules">

Read more about Nitro's `routeRules` configuration.

</read-more>

As a shorthand, you can also configure this in a page file using [`defineRouteRules`](/docs/4.x/api/utils/define-route-rules).

<read-more to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star">

This feature is experimental and in order to use it you must enable the `experimental.inlineRouteRules` option in your `nuxt.config`.

</read-more>

```vue [pages/index.vue]
<script setup>
// Or set at the page level
defineRouteRules({
  prerender: true,
});
</script>

<template>
  <div>
    <h1>Homepage</h1>
    <p>Pre-rendered at build time</p>
  </div>
</template>
```

This will be translated to:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
  },
});
```

## Runtime Prerender Configuration

### `prerenderRoutes`

You can use this at runtime within a [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) to add more routes for Nitro to prerender.

```vue [pages/index.vue]
<script setup>
prerenderRoutes(["/some/other/url"]);
prerenderRoutes("/api/content/article/my-article");
</script>

<template>
  <div>
    <h1>This will register other routes for prerendering when prerendered</h1>
  </div>
</template>
```

<read-more to="/docs/api/utils/prerender-routes" title="prerenderRoutes">

</read-more>

### `prerender:routes` Nuxt hook

This is called before prerendering for additional routes to be registered.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  hooks: {
    async "prerender:routes"(ctx) {
      const { pages } = await fetch("https://api.some-cms.com/pages").then(
        (res) => res.json()
      );
      for (const page of pages) {
        ctx.routes.add(`/${page.name}`);
      }
    },
  },
});
```

### `prerender:generate` Nitro hook

This is called for each route during prerendering. You can use this for fine-grained handling of each route that gets prerendered.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    hooks: {
      "prerender:generate"(route) {
        if (route.route?.includes("private")) {
          route.skip = true;
        }
      },
    },
  },
});
```

# Deployment

> Learn how to deploy your Nuxt application to any hosting provider.

A Nuxt application can be deployed on a Node.js server, pre-rendered for static hosting, or deployed to serverless or edge (CDN) environments.

<tip>

If you are looking for a list of cloud providers that support Nuxt, see the [Hosting providers](/deploy) section.

</tip>

## Node.js Server

Discover the Node.js server preset with Nitro to deploy on any Node hosting.

- **Default output format** if none is specified or auto-detected <br />
- Loads only the required chunks to render the request for optimal cold start timing <br />
- Useful for deploying Nuxt apps to any Node.js hosting

### Entry Point

When running `nuxt build` with the Node server preset, the result will be an entry point that launches a ready-to-run Node server.

```bash [Terminal]
node .output/server/index.mjs
```

This will launch your production Nuxt server that listens on port 3000 by default.

It respects the following runtime environment variables:

- `NITRO_PORT` or `PORT` (defaults to `3000`)
- `NITRO_HOST` or `HOST` (defaults to `'0.0.0.0'`)
- `NITRO_SSL_CERT` and `NITRO_SSL_KEY` - if both are present, this will launch the server in HTTPS mode. In the vast majority of cases, this should not be used other than for testing, and the Nitro server should be run behind a reverse proxy like nginx or Cloudflare which terminates SSL.

### PM2

[PM2](https://pm2.keymetrics.io/) (Process Manager 2) is a fast and easy solution for hosting your Nuxt application on your server or VM.

To use `pm2`, use an `ecosystem.config.cjs`:

```ts [ecosystem.config.cjs]
module.exports = {
  apps: [
    {
      name: "NuxtAppName",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
```

### Cluster Mode

You can use `NITRO_PRESET=node_cluster` in order to leverage multi-process performance using Node.js [cluster](https://nodejs.org/dist/latest/docs/api/cluster.html) module.

By default, the workload gets distributed to the workers with the round robin strategy.

### Learn More

<read-more to="https://nitro.build/deploy/node" title="the Nitro documentation for node-server preset">

</read-more>

<video-accordion title="Watch Daniel Roe's short video on the topic" video-id="0x1H6K5yOfs">

</video-accordion>

## Static Hosting

There are two ways to deploy a Nuxt application to any static hosting services:

- Static site generation (SSG) with `ssr: true` pre-renders routes of your application at build time. (This is the default behavior when running `nuxt generate`.) It will also generate `/200.html` and `/404.html` single-page app fallback pages, which can render dynamic routes or 404 errors on the client (though you may need to configure this on your static host).
- Alternatively, you can prerender your site with `ssr: false` (static single-page app). This will produce HTML pages with an empty `<div id="__nuxt"></div>` where your Vue app would normally be rendered. You will lose many SEO benefits of prerendering your site, so it is suggested instead to use [`<ClientOnly>`](/docs/4.x/api/components/client-only) to wrap the portions of your site that cannot be server rendered (if any).

<read-more to="/docs/getting-started/prerendering" title="Nuxt prerendering">

</read-more>

### Client-side Only Rendering

If you don't want to pre-render your routes, another way of using static hosting is to set the `ssr` property to `false` in the `nuxt.config` file. The `nuxt generate` command will then output an `.output/public/index.html` entrypoint and JavaScript bundles like a classic client-side Vue.js application.

```ts [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  ssr: false,
});
```

## Hosting Providers

Nuxt can be deployed to several cloud providers with a minimal amount of configuration:

<read-more to="/deploy">

</read-more>

## Presets

In addition to Node.js servers and static hosting services, a Nuxt project can be deployed with several well-tested presets and minimal amount of configuration.

You can explicitly set the desired preset in the [`nuxt.config.ts`](/docs/4.x/guide/directory-structure/nuxt-config) file:

```js [nuxt.config.ts]twoslash
export default defineNuxtConfig({
  nitro: {
    preset: "node-server",
  },
});
```

... or use the `NITRO_PRESET` environment variable when running `nuxt build`:

```bash [Terminal]
NITRO_PRESET=node-server nuxt build
```

🔎 Check [the Nitro deployment](https://nitro.build/deploy) for all possible deployment presets and providers.

## CDN Proxy

In most cases, Nuxt can work with third-party content that is not generated or created by Nuxt itself. But sometimes such content can cause problems, especially Cloudflare's "Minification and Security Options".

Accordingly, you should make sure that the following options are unchecked / disabled in Cloudflare. Otherwise, unnecessary re-rendering or hydration errors could impact your production application.

1. Speed > Optimization > Content Optimization > Disable "Rocket Loader™"
2. Speed > Optimization > Image Optimization > Disable "Mirage"
3. Scrape Shield > Disable "Email Address Obfuscation"

With these settings, you can be sure that Cloudflare won't inject scripts into your Nuxt application that may cause unwanted side effects.

<tip>

Their location on the Cloudflare dashboard sometimes changes so don't hesitate to look around.

</tip>
# Testing

> How to test your Nuxt application.

<tip>

If you are a module author, you can find more specific information in the [Module Author's guide](/docs/4.x/guide/going-further/modules#testing).

</tip>

Nuxt offers first-class support for end-to-end and unit testing of your Nuxt application via `@nuxt/test-utils`, a library of test utilities and configuration that currently powers the [tests we use on Nuxt itself](https://github.com/nuxt/nuxt/tree/main/test) and tests throughout the module ecosystem.

<video-accordion title="Watch a video from Alexander Lichter about getting started with @nuxt/test-utils" video-id="yGzwk9xi9gU">

</video-accordion>

## Installation

In order to allow you to manage your other testing dependencies, `@nuxt/test-utils` ships with various optional peer dependencies. For example:

- you can choose between `happy-dom` and `jsdom` for a runtime Nuxt environment
- you can choose between `vitest`, `cucumber`, `jest` and `playwright` for end-to-end test runners
- `playwright-core` is only required if you wish to use the built-in browser testing utilities (and are not using `@playwright/test` as your test runner)

<code-group sync="pm">

```bash [npm]
npm i --save-dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

```bash [yarn]
yarn add --dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

```bash [pnpm]
pnpm add -D @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

```bash [bun]
bun add --dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core
```

</code-group>

## Unit Testing

We currently ship an environment for unit testing code that needs a [Nuxt](https://nuxt.com) runtime environment. It currently _only has support for vitest_ (although contribution to add other runtimes would be welcome).

### Setup

1. Add `@nuxt/test-utils/module` to your `nuxt.config` file (optional). It adds a Vitest integration to your Nuxt DevTools which supports running your unit tests in development.```tstwoslash
   export default defineNuxtConfig({
   modules: [
   '@nuxt/test-utils/module'
   ]
   })

````
2. Create a `vitest.config.ts` with the following content:```tstwoslash
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
})
````

<tip>

When importing `@nuxt/test-utils` in your vitest config, It is necessary to have `"type": "module"` specified in your `package.json` or rename your vitest config file appropriately.

> i.e., `vitest.config.m{ts,js}`.

</tip>

<tip>

It is possible to set environment variables for testing by using the `.env.test` file.

</tip>

### Using a Nuxt Runtime Environment

By default, `@nuxt/test-utils` will not change your default Vitest environment, so you can do fine-grained opt-in and run Nuxt tests together with other unit tests.

You can opt in to a Nuxt environment by adding `.nuxt.` to the test file's name (for example, `my-file.nuxt.test.ts` or `my-file.nuxt.spec.ts`) or by adding `@vitest-environment nuxt` as a comment directly in the test file.

```tstwoslash
// @vitest-environment nuxt
import { test } from 'vitest'

test('my test', () => {
  // ... test with Nuxt environment!
})
```

You can alternatively set `environment: 'nuxt'` in your Vitest configuration to enable the Nuxt environment for **all tests**.

```tstwoslash
// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // you can optionally set Nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // other Nuxt config you want to pass
    //     }
    //   }
    // }
  }
})
```

If you have set `environment: 'nuxt'` by default, you can then opt _out_ of the [default environment](https://vitest.dev/guide/environment.html#test-environment) per test file as needed.

```tstwoslash
// @vitest-environment node
import { test } from 'vitest'

test('my test', () => {
  // ... test without Nuxt environment!
})
```

<warning>

When you run your tests within the Nuxt environment, they will be running in a [`happy-dom`](https://github.com/capricorn86/happy-dom) or [`jsdom`](https://github.com/jsdom/jsdom) environment. Before your tests run, a global Nuxt app will be initialized (including, for example, running any plugins or code you've defined in your `app.vue`).

This means you should take particular care not to mutate the global state in your tests (or, if you need to, to reset it afterwards).

</warning>

### 🎭 Built-In Mocks

`@nuxt/test-utils` provides some built-in mocks for the DOM environment.

#### `intersectionObserver`

Default `true`, creates a dummy class without any functionality for the IntersectionObserver API

#### `indexedDB`

Default `false`, uses [`fake-indexeddb`](https://github.com/dumbmatter/fakeIndexedDB) to create a functional mock of the IndexedDB API

These can be configured in the `environmentOptions` section of your `vitest.config.ts` file:

```tstwoslash
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        }
      }
    }
  }
})
```

### 🛠️ Helpers

`@nuxt/test-utils` provides a number of helpers to make testing Nuxt apps easier.

#### `mountSuspended`

`mountSuspended` allows you to mount any Vue component within the Nuxt environment, allowing async setup and access to injections from your Nuxt plugins.

<note>

Under the hood, `mountSuspended` wraps `mount` from `@vue/test-utils`, so you can check out [the Vue Test Utils documentation](https://test-utils.vuejs.org/guide/) for more on the options you can pass, and how to use this utility.

</note>

For example:

```tstwoslash
// @noErrors
import { it, expect } from 'vitest'
import type { Component } from 'vue'
declare module '#components' {
  export const SomeComponent: Component
}
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'

it('can mount some component', async () => {
    const component = await mountSuspended(SomeComponent)
    expect(component.text()).toMatchInlineSnapshot(
        '"This is an auto-imported component"'
    )
})
```

```tstwoslash
// @noErrors
import { it, expect } from 'vitest'
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

// tests/App.nuxt.spec.ts
it('can also mount an app', async () => {
    const component = await mountSuspended(App, { route: '/test' })
    expect(component.html()).toMatchInlineSnapshot(`
      "<div>This is an auto-imported component</div>
      <div> I am a global component </div>
      <div>/</div>
      <a href="/test"> Test link </a>"
    `)
})
```

#### `renderSuspended`

`renderSuspended` allows you to render any Vue component within the Nuxt environment using `@testing-library/vue`, allowing async setup and access to injections from your Nuxt plugins.

This should be used together with utilities from Testing Library, e.g. `screen` and `fireEvent`. Install [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro) in your project to use these.

Additionally, Testing Library also relies on testing globals for cleanup. You should turn these on in your [Vitest config](https://vitest.dev/config/#globals).

The passed in component will be rendered inside a `<div id="test-wrapper"></div>`.

Examples:

```tstwoslash
// @noErrors
import { it, expect } from 'vitest'
import type { Component } from 'vue'
declare module '#components' {
  export const SomeComponent: Component
}
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { SomeComponent } from '#components'
import { screen } from '@testing-library/vue'

it('can render some component', async () => {
  await renderSuspended(SomeComponent)
  expect(screen.getByText('This is an auto-imported component')).toBeDefined()
})
```

```tstwoslash
// @noErrors
import { it, expect } from 'vitest'
// ---cut---
// tests/App.nuxt.spec.ts
import { renderSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('can also render an app', async () => {
  const html = await renderSuspended(App, { route: '/test' })
  expect(html).toMatchInlineSnapshot(`
    "<div id="test-wrapper">
      <div>This is an auto-imported component</div>
      <div> I am a global component </div>
      <div>Index page</div><a href="/test"> Test link </a>
    </div>"
  `)
})
```

#### `mockNuxtImport`

`mockNuxtImport` allows you to mock Nuxt's auto import functionality. For example, to mock `useStorage`, you can do so like this:

```tstwoslash
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useStorage', () => {
  return () => {
    return { value: 'mocked storage' }
  }
})

// your tests here
```

<note>

`mockNuxtImport` can only be used once per mocked import per test file. It is actually a macro that gets transformed to `vi.mock` and `vi.mock` is hoisted, as described [in the Vitest docs](https://vitest.dev/api/vi.html#vi-mock).

</note>

If you need to mock a Nuxt import and provide different implementations between tests, you can do it by creating and exposing your mocks using [`vi.hoisted`](https://vitest.dev/api/vi.html#vi-hoisted), and then use those mocks in `mockNuxtImport`. You then have access to the mocked imports, and can change the implementation between tests. Be careful to [restore mocks](https://vitest.dev/api/mock.html#mockrestore) before or after each test to undo mock state changes between runs.

```tstwoslash
import { vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const { useStorageMock } = vi.hoisted(() => {
  return {
    useStorageMock: vi.fn(() => {
      return { value: 'mocked storage'}
    })
  }
})

mockNuxtImport('useStorage', () => {
  return useStorageMock
})

// Then, inside a test
useStorageMock.mockImplementation(() => {
  return { value: 'something else' }
})
```

#### `mockComponent`

`mockComponent` allows you to mock Nuxt's component.
The first argument can be the component name in PascalCase, or the relative path of the component.
The second argument is a factory function that returns the mocked component.

For example, to mock `MyComponent`, you can:

```tstwoslash
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('MyComponent', {
  props: {
    value: String
  },
  setup(props) {
    // ...
  }
})

// relative path or alias also works
mockComponent('~/components/my-component.vue', async () => {
  // or a factory function
  return defineComponent({
    setup(props) {
      // ...
    }
  })
})

// or you can use SFC for redirecting to a mock component
mockComponent('MyComponent', () => import('./MockComponent.vue'))

// your tests here
```

> **Note**: You can't reference local variables in the factory function since they are hoisted. If you need to access Vue APIs or other variables, you need to import them in your factory function.

```tstwoslash
import { mockComponent } from '@nuxt/test-utils/runtime'

mockComponent('MyComponent', async () => {
  const { ref, h } = await import('vue')

  return defineComponent({
    setup(props) {
      const counter = ref(0)
      return () => h('div', null, counter.value)
    }
  })
})
```

#### `registerEndpoint`

`registerEndpoint` allows you create Nitro endpoint that returns mocked data. It can come in handy if you want to test a component that makes requests to API to display some data.

The first argument is the endpoint name (e.g. `/test/`).
The second argument is a factory function that returns the mocked data.

For example, to mock `/test/` endpoint, you can do:

```tstwoslash
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/test/', () => ({
  test: 'test-field'
}))
```

By default, your request will be made using the `GET` method. You may use another method by setting an object as the second argument instead of a function.

```tstwoslash
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/test/', {
  method: 'POST',
  handler: () => ({ test: 'test-field' })
})
```

> **Note**: If your requests in a component go to an external API, you can use `baseURL` and then make it empty using [Nuxt Environment Override Config](/docs/4.x/getting-started/configuration#environment-overrides) (`$test`) so all your requests will go to Nitro server.

#### Conflict with End-To-End Testing

`@nuxt/test-utils/runtime` and `@nuxt/test-utils/e2e` need to run in different testing environments and so can't be used in the same file.

If you would like to use both the end-to-end and unit testing functionality of `@nuxt/test-utils`, you can split your tests into separate files. You then either specify a test environment per-file with the special `// @vitest-environment nuxt` comment, or name your runtime unit test files with the `.nuxt.spec.ts` extension.

`app.nuxt.spec.ts`

```tstwoslash
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useStorage', () => {
  return () => {
    return { value: 'mocked storage' }
  }
})
```

`app.e2e.spec.ts`

```tstwoslash
import { setup, $fetch } from '@nuxt/test-utils/e2e'

await setup({
  setupTimeout: 10000,
})

// ...
```

### Using `@vue/test-utils`

If you prefer to use `@vue/test-utils` on its own for unit testing in Nuxt, and you are only testing components which do not rely on Nuxt composables, auto-imports or context, you can follow these steps to set it up.

1. Install the needed dependencies<code-group sync="pm">

```bash [npm]
npm i --save-dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

```bash [yarn]
yarn add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

```bash [pnpm]
pnpm add -D vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

```bash [bun]
bun add --dev vitest @vue/test-utils happy-dom @vitejs/plugin-vue
```

</code-group>
2. Create a `vitest.config.ts` with the following content:```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
plugins: [vue()],
test: {
environment: 'happy-dom',
},
});

`````
3. Add a new command for test in your `package.json````json
"scripts": {
  "build": "nuxt build",
  "dev": "nuxt dev",
  ...
  "test": "vitest"
},
`````

4. Create a simple `<HelloWorld>` component `components/HelloWorld.vue` with the following content:```vue
<template>
  <p>Hello world</p>
</template>

`````
5. Create a simple unit test for this newly created component `~/components/HelloWorld.spec.ts````tstwoslash
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
  it('component renders Hello world properly', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.text()).toContain('Hello world')
  })
})
`````

6. Run vitest command<code-group sync="pm">

```bash [npm]
npm run test
```

```bash [yarn]
yarn test
```

```bash [pnpm]
pnpm run test
```

```bash [bun]
bun run test
```

</code-group>

Congratulations, you're all set to start unit testing with `@vue/test-utils` in Nuxt! Happy testing!

## End-To-End Testing

For end-to-end testing, we support [Vitest](https://github.com/vitest-dev/vitest), [Jest](https://jestjs.io), [Cucumber](https://cucumber.io/) and [Playwright](https://playwright.dev/) as test runners.

### Setup

In each `describe` block where you are taking advantage of the `@nuxt/test-utils/e2e` helper methods, you will need to set up the test context before beginning.

```ts [test/my-test.spec.ts]twoslash
import { describe, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("My test", async () => {
  await setup({
    // test context options
  });

  test("my test", () => {
    // ...
  });
});
```

Behind the scenes, `setup` performs a number of tasks in `beforeAll`, `beforeEach`, `afterEach` and `afterAll` to set up the Nuxt test environment correctly.

Please use the options below for the `setup` method.

#### Nuxt Config

- `rootDir`: Path to a directory with a Nuxt app to be put under test.
  - Type: `string`
  - Default: `'.'`

- `configFile`: Name of the configuration file.
  - Type: `string`
  - Default: `'nuxt.config'`

#### Timings

- `setupTimeout`: The amount of time (in milliseconds) to allow for `setupTest` to complete its work (which could include building or generating files for a Nuxt application, depending on the options that are passed).
  - Type: `number`
  - Default: `60000`

#### Features

- `build`: Whether to run a separate build step.
  - Type: `boolean`
  - Default: `true` (`false` if `browser` or `server` is disabled, or if a `host` is provided)
- `server`: Whether to launch a server to respond to requests in the test suite.
  - Type: `boolean`
  - Default: `true` (`false` if a `host` is provided)
- `port`: If provided, set the launched test server port to the value.
  - Type: `number | undefined`
  - Default: `undefined`
- `host`: If provided, a URL to use as the test target instead of building and running a new server. Useful for running "real" end-to-end tests against a deployed version of your application, or against an already running local server (which may provide a significant reduction in test execution timings). See the [target host end-to-end example below](#target-host-end-to-end-example).
  - Type: `string`
  - Default: `undefined`
- `browser`: Under the hood, Nuxt test utils uses [`playwright`](https://playwright.dev) to carry out browser testing. If this option is set, a browser will be launched and can be controlled in the subsequent test suite.
  - Type: `boolean`
  - Default: `false`
- `browserOptions`
  - Type: `object` with the following properties
    - `type`: The type of browser to launch - either `chromium`, `firefox` or `webkit`
    - `launch`: `object` of options that will be passed to playwright when launching the browser. See [full API reference](https://playwright.dev/docs/api/class-browsertype#browser-type-launch).

- `runner`: Specify the runner for the test suite. Currently, [Vitest](https://vitest.dev) is recommended.
  - Type: `'vitest' | 'jest' | 'cucumber'`
  - Default: `'vitest'`

##### Target `host` end-to-end example

A common use-case for end-to-end testing is running the tests against a deployed application running in the same environment typically used for Production.

For local development or automated deploy pipelines, testing against a separate local server can be more efficient and is typically faster than allowing the test framework to rebuild between tests.

To utilize a separate target host for end-to-end tests, simply provide the `host` property of the `setup` function with the desired URL.

```ts
import { setup, createPage } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

describe("login page", async () => {
  await setup({
    host: "http://localhost:8787",
  });

  it("displays the email and password fields", async () => {
    const page = await createPage("/login");
    expect(await page.getByTestId("email").isVisible()).toBe(true);
    expect(await page.getByTestId("password").isVisible()).toBe(true);
  });
});
```

### APIs

#### `$fetch(url)`

Get the HTML of a server-rendered page.

```tstwoslash
import { $fetch } from '@nuxt/test-utils/e2e'

const html = await $fetch('/')
```

#### `fetch(url)`

Get the response of a server-rendered page.

```tstwoslash
import { fetch } from '@nuxt/test-utils/e2e'

const res = await fetch('/')
const { body, headers } = res
```

#### `url(path)`

Get the full URL for a given page (including the port the test server is running on.)

```tstwoslash
import { url } from '@nuxt/test-utils/e2e'

const pageUrl = url('/page')
// 'http://localhost:6840/page'
```

### Testing in a Browser

We provide built-in support using Playwright within `@nuxt/test-utils`, either programmatically or via the Playwright test runner.

#### `createPage(url)`

Within `vitest`, `jest` or `cucumber`, you can create a configured Playwright browser instance with `createPage`, and (optionally) point it at a path from the running server. You can find out more about the API methods available from [in the Playwright documentation](https://playwright.dev/docs/api/class-page).

```tstwoslash
import { createPage } from '@nuxt/test-utils/e2e'

const page = await createPage('/page')
// you can access all the Playwright APIs from the `page` variable
```

#### Testing with Playwright Test Runner

We also provide first-class support for testing Nuxt within [the Playwright test runner](https://playwright.dev/docs/intro).

<code-group sync="pm">

```bash [npm]
npm i --save-dev @playwright/test @nuxt/test-utils
```

```bash [yarn]
yarn add --dev @playwright/test @nuxt/test-utils
```

```bash [pnpm]
pnpm add -D @playwright/test @nuxt/test-utils
```

```bash [bun]
bun add --dev @playwright/test @nuxt/test-utils
```

</code-group>

You can provide global Nuxt configuration, with the same configuration details as the `setup()` function mentioned earlier in this section.

```ts [playwright.config.ts]
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";
import type { ConfigOptions } from "@nuxt/test-utils/playwright";

export default defineConfig<ConfigOptions>({
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  // ...
});
```

<read-more target="_blank" title="See full example config" to="https://github.com/nuxt/test-utils/blob/main/examples/app-playwright/playwright.config.ts">

</read-more>

Your test file should then use `expect` and `test` directly from `@nuxt/test-utils/playwright`:

```ts [tests/example.test.ts]
import { expect, test } from "@nuxt/test-utils/playwright";

test("test", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });
  await expect(page.getByRole("heading")).toHaveText("Welcome to Playwright!");
});
```

You can alternatively configure your Nuxt server directly within your test file:

```ts [tests/example.test.ts]
import { expect, test } from "@nuxt/test-utils/playwright";

test.use({
  nuxt: {
    rootDir: fileURLToPath(new URL("..", import.meta.url)),
  },
});

test("test", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });
  await expect(page.getByRole("heading")).toHaveText("Welcome to Playwright!");
});
```
