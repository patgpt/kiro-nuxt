---
inclusion: always
---

# State Management Guidelines

## Core Principles

- Use `useState()` for reactive, SSR-friendly shared state across components
- Never define `const state = ref()` outside of `<script setup>` or `setup()` function
- Always use `const useX = () => useState('x')` pattern for shared state
- State data must be JSON serializable (no classes, functions, or symbols)

## Best Practices

### State Initialization
- Use `callOnce()` utility for async state initialization in `app.vue`
- Initialize global state once on server-side to avoid hydration mismatches
- Use unique keys for `useState()` to avoid conflicts between components

### State Patterns
```typescript
// ✅ Correct - composable pattern
export const useCounter = () => useState<number>('counter', () => 0)

// ✅ Correct - async initialization
const websiteConfig = useState('config')
await callOnce(async () => {
  websiteConfig.value = await $fetch('/api/config')
})

// ❌ Wrong - global ref outside setup
export const globalState = ref({}) // Causes memory leaks
```

### State Management Libraries
- **Pinia**: Recommended for complex state management
- Install with `npx nuxt module add pinia`
- Use `defineStore()` for structured state management
- Combine with `callOnce()` for server-side initialization

### State Clearing
- Use `clearNuxtState()` to globally invalidate cached state
- Clear state in navigation guards or error handlers when needed
- Be mindful of state persistence across route changes

## Integration with Nuxt Features

### SSR Considerations
- State is serialized during SSR and hydrated on client
- Ensure all state values are serializable
- Use `useState()` instead of plain `ref()` for SSR compatibility

### Error Handling
- Clear state on critical errors to prevent inconsistent UI
- Use error boundaries to isolate state-dependent components
- Reset form state after successful submissions

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


We supply a module to handle everything for you, you only need to add it to modules in your nuxt.config.js file:


// nuxt.config.js
export default defineNuxtConfig({
  // ... other options
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
And that's it, use your store as usual!

Awaiting for actions in pages
As with onServerPrefetch(), you can call a store action within the callOnce() composable. This will allow Nuxt to run the action only once and avoids refetching data that is already present.


<script setup>
const store = useStore()
// we could also extract the data, but it's already present in the store
await callOnce('user', () => store.fetchUser())
</script>
Depending on your requirements, you can choose to run the action only once on the client, or on every navigation (which is closer to data fetching behavior of useFetch()/useAsyncData())


<script setup>
const store = useStore()
await callOnce('user', () => store.fetchUser(), { mode: 'navigation' })
</script>
TIP

If you want to use a store outside of setup() or an injection aware context (e.g. Navigation guards, other stores, Nuxt Middlewares, etc), remember to pass the pinia instance to useStore(), for the reasons alluded to here. Retrieving the pinia instance might vary.


import { useStore } from '~/stores/myStore'

// this line is usually inside a function that is able to retrieve
// the pinia instance
const store = useStore(pinia)
Fortunately, most of the time you don't need to go through this hassle.

Auto imports
By default @pinia/nuxt exposes a few auto imports:

usePinia(), which is similar to getActivePinia() but works better with Nuxt.
defineStore() to define stores
storeToRefs() when you need to extract individual refs from a store
acceptHMRUpdate() for hot module replacement
It also automatically imports all stores defined within your stores folder. It doesn't lookup for nested stores though. You can customize this behavior by setting the storesDirs option:


// nuxt.config.ts
export default defineNuxtConfig({
  // ... other options
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})
Note the folders are relative to the root of your project. If you change the srcDir option, you need to adapt the paths accordingly.

Defining a Store

Master this and much more with a free video from Mastering Pinia
Before diving into core concepts, we need to know that a store is defined using defineStore() and that it requires a unique name, passed as the first argument:


import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAlertsStore = defineStore('alerts', {
  // other options...
})
This name, also referred to as id, is necessary and is used by Pinia to connect the store to the devtools. Naming the returned function use... is a convention across composables to make its usage idiomatic.

defineStore() accepts two distinct values for its second argument: a Setup function or an Options object.

✨
Vibe code Vue apps with confidence
RuleKit
Option Stores
Similar to Vue's Options API, we can also pass an Options Object with state, actions, and getters properties.


export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.

Option stores should feel intuitive and simple to get started with.

Setup Stores
There is also another possible syntax to define stores. Similar to the Vue Composition API's setup function, we can pass in a function that defines reactive properties and methods and returns an object with the properties and methods we want to expose.


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
In Setup Stores:

ref()s become state properties
computed()s become getters
function()s become actions
Note that you must return all state properties in setup stores for Pinia to pick them up as state. In other words, you cannot have private state properties in stores. Not returning all state properties or making them readonly will break SSR, devtools, and other plugins.

Setup stores bring a lot more flexibility than Option Stores as you can create watchers within a store and freely use any composable. However, keep in mind that using composables will get more complex when using SSR.

Setup stores are also able to rely on globally provided properties like the Router or the Route. Any property provided at the App level can be accessed from the store using inject(), just like in components:


import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // this assumes `app.provide('appProvided', 'value')` was called
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
WARNING

Do not return properties like route or appProvided (from the example above) as they do not belong to the store itself and you can directly access them within components with useRoute() and inject('appProvided').

What syntax should I pick?
As with Vue's Composition API and Options API, pick the one that you feel the most comfortable with. Both have their strengths and weaknesses. Options stores are easier to work with while Setup stores are more flexible and powerful. If you want to dive deeper into the differences, check the Option Stores vs Setup Stores chapter in Mastering Pinia.

Using the store
We are defining a store because the store won't be created until use...Store() is called within a component <script setup> (or within setup() like all composables):


<script setup>
import { useCounterStore } from '@/stores/counter'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
</script>
TIP

If you are not using setup components yet, you can still use Pinia with map helpers.

You can define as many stores as you want and you should define each store in a different file to get the most out of Pinia (like automatically allowing your bundler to code split and providing TypeScript inference).

Once the store is instantiated, you can access any property defined in state, getters, and actions directly on the store. We will look at these in detail in the next pages but autocompletion will help you.

Note that store is an object wrapped with reactive, meaning there is no need to write .value after getters but, like props in setup, we cannot destructure it:


<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useCounterStore()
// ❌ This won't work because it breaks reactivity
// same as reactive: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive
const { name, doubleCount } = store
name // will always be "Eduardo" //
doubleCount // will always be 0 //

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
const doubleValue = computed(() => store.doubleCount)
</script>
Destructuring from a Store
In order to extract properties from the store while keeping its reactivity, you need to use storeToRefs(). It will create refs for every reactive property. This is useful when you are only using state from the store but not calling any action. Note you can destructure actions directly from the store as they are bound to the store itself too:


<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { name, doubleCount } = storeToRefs(store)
// the increment action can just be destructured
const { increment } = store
</script>

State
Master this and much more with the official video course by the author of Pinia
The state is, most of the time, the central part of your store. People often start by defining the state that represents their app. In Pinia the state is defined as a function that returns the initial state. This allows Pinia to work in both Server and Client Side.


import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
TIP

In order for Vue to properly detect state, you must declare every state piece in state, even if its initial value is undefined.

✨
Vibe code Vue apps with confidence
RuleKit
TypeScript
You don't need to do much in order to make your state compatible with TS: make sure strict, or at the very least, noImplicitThis, is enabled and Pinia will infer the type of your state automatically! However, there are a few cases where you should give it a hand with some casting:


export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // for initially empty lists
      userList: [] as UserInfo[],
      // for data that is not yet loaded
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
If you prefer, you can define the state with an interface and type the return value of state():


interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
Accessing the state
By default, you can directly read from and write to the state by accessing it through the store instance:


const store = useStore()

store.count++
Note you cannot add a new state property if you don't define it in state(). It must contain the initial state. e.g.: we can't do store.secondCount = 2 if secondCount is not defined in state().

Resetting the state
In Option Stores, you can reset the state to its initial value by calling the $reset() method on the store:


const store = useStore()

store.$reset()
Internally, this calls the state() function to create a new state object and replaces the current state with it.

In Setup Stores, you need to create your own $reset() method:


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
Usage with the Options API
Watch a free video lesson on Vue School
For the following examples, you can assume the following store was created:


// Example File Path:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
})
If you are not using the Composition API, and you are using computed, methods, ..., you can use the mapState() helper to map state properties as readonly computed properties:


import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // gives access to this.count inside the component
    // same as reading from store.count
    ...mapState(useCounterStore, ['count'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // you can also write a function that gets access to the store
      double: store => store.count * 2,
      // it can have access to `this` but it won't be typed correctly...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
Modifiable state
If you want to be able to write to these state properties (e.g. if you have a form), you can use mapWritableState() instead. Note you cannot pass a function like with mapState():


import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // gives access to this.count inside the component and allows setting it
    // this.count++
    // same as reading from store.count
    ...mapWritableState(useCounterStore, ['count']),
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
TIP

You don't need mapWritableState() for collections like arrays unless you are replacing the whole array with cartItems = [], mapState() still allows you to call methods on your collections.

Mutating the state
Apart from directly mutating the store with store.count++, you can also call the $patch method. It allows you to apply multiple changes at the same time with a partial state object:


store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
However, some mutations are really hard or costly to apply with this syntax: any collection modification (e.g. pushing, removing, splicing an element from an array) requires you to create a new collection. Because of this, the $patch method also accepts a function to group these kinds of mutations that are difficult to apply with a patch object:


store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
The main difference here is that $patch() allows you to group multiple changes into one single entry in the devtools. Note that both direct changes to state and $patch() are tracked in devtools and can be time traveled.

Replacing the state
You cannot exactly replace the state of a store as that would break reactivity. You can however patch it:


// this doesn't actually replace `$state`
store.$state = { count: 24 }
// it internally calls `$patch()`:
store.$patch({ count: 24 })
You can also set the initial state of your whole application by changing the state of the pinia instance. This is used during SSR for hydration.


pinia.state.value = {}
Subscribing to the state
You can watch the state and its changes through the $subscribe() method of a store, similar to Vuex's subscribe method. The advantage of using $subscribe() over a regular watch() is that subscriptions will trigger only once after patches (e.g. when using the function version from above).


cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
})
Flush timing
Under the hood, $subscribe() uses Vue's watch() function. You can pass the same options as you would with watch(). This is useful when you want to immediately trigger subscriptions after each state change:


cartStore.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
}, { flush: 'sync' })
Detaching subscriptions
By default, state subscriptions are bound to the component where they are added (if the store is inside a component's setup()). Meaning, they will be automatically removed when the component is unmounted. If you also want to keep them after the component is unmounted, pass { detached: true } as the second argument to detach the state subscription from the current component:


<script setup>
const someStore = useSomeStore()

// this subscription will be kept even after the component is unmounted
someStore.$subscribe(callback, { detached: true })
</script>
TIP

You can watch the whole state on the pinia instance with a single watch():


watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)

Getters
Master this and much more with the official video course by the author of Pinia
Getters are exactly the equivalent of computed values for the state of a Store. They can be defined with the getters property in defineStore(). They receive the state as the first parameter to encourage the usage of arrow function:


export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
✨
Vibe code Vue apps with confidence
RuleKit
Most of the time, getters will only rely on the state. However, they might need to use other getters. Because of this, we can get access to the whole store instance through this when defining a regular function but it is necessary to define the type of the return type (in TypeScript). This is due to a known limitation in TypeScript and doesn't affect getters defined with an arrow function nor getters not using this:


export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.count * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
})
Then you can access the getter directly on the store instance:


<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
Accessing other getters
As with computed properties, you can combine multiple getters. Access any other getter via this. In this scenario, you will need to specify a return type for the getter.


counterStore.ts

counterStore.js

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
Passing arguments to getters
Getters are just computed properties behind the scenes, so it's not possible to pass any parameters to them. However, you can return a function from the getter to accept any arguments:


export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
and use in component:


<script setup>
import { storeToRefs } from 'pinia'
import { useUserListStore } from './store'

const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// note you will have to use `getUserById.value` to access
// the function within the <script setup>
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
Note that when doing this, getters are not cached anymore. They are simply functions you invoke. You can, however, cache some results inside of the getter itself, which is uncommon but should prove more performant:


export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
Accessing other stores getters
To use another store's getters, you can directly use it inside of the getter:


import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
Usage with setup()
You can directly access any getter as a property of the store (exactly like state properties):


<script setup>
const store = useCounterStore()

store.count = 3
store.doubleCount // 6
</script>
Usage with the Options API
Watch a free video lesson on Vue School
For the following examples, you can assume the following store was created:


// Example File Path:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})
With setup()
While Composition API is not for everyone, the setup() hook can make using Pinia easier to work with in the Options API. No extra map helper functions needed!


<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    // **only return the whole store** instead of destructuring
    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
})
</script>
This is useful while migrating a component from the Options API to the Composition API but should only be a migration step. Always try not to mix both API styles within the same component.

Without setup()
You can use the same mapState() function used in the previous section of state to map to getters:


import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // gives access to this.doubleCount inside the component
    // same as reading from store.doubleCount
    ...mapState(useCounterStore, ['doubleCount']),
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // you can also write a function that gets access to the store
      double: (store) => store.doubleCount,
    }),
  },
}
Suggest changes to this page
Pager
Previous page
State
Actions
Master this and much more with the official video course by the author of Pinia
Actions are the equivalent of methods in components. They can be defined with the actions property in defineStore() and they are perfect to define business logic:


export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
✨
Vibe code Vue apps with confidence
RuleKit
Like getters, actions get access to the whole store instance through this with full typing (and autocompletion ✨) support. Unlike getters, actions can be asynchronous, you can await inside of actions any API call or even other actions! Here is an example using Mande. Note the library you use doesn't matter as long as you get a Promise. You could even use the native fetch function (browser only):


import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})
You are also completely free to set whatever arguments you want and return anything. When calling actions, everything will be automatically inferred!

Actions are invoked like regular functions and methods:


<script setup>
const store = useCounterStore()
// call the action as a method of the store
store.randomizeCounter()
</script>

<template>
  <!-- Even on the template -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
Accessing other stores actions
To consume another store, you can directly use it inside of the action:


import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
Usage with the Options API
Watch a free video lesson on Vue School
For the following examples, you can assume the following store was created:


// Example File Path:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
With setup()
While Composition API is not for everyone, the setup() hook can make Pinia easier to work with while using the Options API. No extra map helper functions needed!


<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
})
</script>
Without setup()
If you would prefer not to use Composition API at all, you can use the mapActions() helper to map actions properties as methods in your component:


import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment']),
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
Subscribing to actions
It is possible to observe actions and their outcome with store.$onAction(). The callback passed to it is executed before the action itself. after handles promises and allows you to execute a function after the action resolves. In a similar way, onError allows you to execute a function if the action throws or rejects. These are useful for tracking errors at runtime, similar to this tip in the Vue docs.

Here is an example that logs before running actions and after they resolve/reject.


const unsubscribe = someStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// manually remove the listener
unsubscribe()
By default, action subscriptions are bound to the component where they are added (if the store is inside a component's setup()). Meaning, they will be automatically removed when the component is unmounted. If you also want to keep them after the component is unmounted, pass true as the second argument to detach the action subscription from the current component:


<script setup>
const someStore = useSomeStore()

// this subscription will be kept even after the component is unmounted
someStore.$onAction(callback, true)
</script>
Suggest changes to this page
Pager
Previous page
Plugins
Master this and much more with the official video course by the author of Pinia
Pinia stores can be fully extended thanks to a low level API. Here is a list of things you can do:

Add new properties to stores
Add new options when defining stores
Add new methods to stores
Wrap existing methods
Intercept actions and its results
Implement side effects like Local Storage
Apply only to specific stores
✨
Vibe code Vue apps with confidence
RuleKit
Plugins are added to the pinia instance with pinia.use(). The simplest example is adding a static property to all stores by returning an object:


import { createPinia } from 'pinia'

// add a property named `secret` to every store that is created
// after this plugin is installed this could be in a different file
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)

// in another file
const store = useStore()
store.secret // 'the cake is a lie'
This is useful to add global objects like the router, modal, or toast managers.

Introduction
A Pinia plugin is a function that optionally returns properties to be added to a store. It takes one optional argument, a context:


export function myPiniaPlugin(context) {
  context.pinia // the pinia created with `createPinia()`
  context.app // the current app created with `createApp()`
  context.store // the store the plugin is augmenting
  context.options // the options object defining the store passed to `defineStore()`
  // ...
}
This function is then passed to pinia with pinia.use():


pinia.use(myPiniaPlugin)
Plugins are only applied to stores created after the plugins themselves, and after pinia is passed to the app, otherwise they won't be applied.

Augmenting a Store
You can add properties to every store by simply returning an object of them in a plugin:


pinia.use(() => ({ hello: 'world' }))
You can also set the property directly on the store but if possible use the return version so they can be automatically tracked by devtools:


pinia.use(({ store }) => {
  store.hello = 'world'
})
Any property returned by a plugin will be automatically tracked by devtools so in order to make hello visible in devtools, make sure to add it to store._customProperties in dev mode only if you want to debug it in devtools:


// from the example above
pinia.use(({ store }) => {
  store.hello = 'world'
  // make sure your bundler handles this. webpack and vite should do it by default
  if (process.env.NODE_ENV === 'development') {
    // add any keys you set on the store
    store._customProperties.add('hello')
  }
})
Note that every store is wrapped with reactive, automatically unwrapping any Ref (ref(), computed(), ...) it contains:


const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // each store has its individual `hello` property
  store.hello = ref('secret')
  // it gets automatically unwrapped
  store.hello // 'secret'

  // all stores are sharing the value `shared` property
  store.shared = sharedRef
  store.shared // 'shared'
})
This is why you can access all computed properties without .value and why they are reactive.

Adding new state
If you want to add new state properties to a store or properties that are meant to be used during hydration, you will have to add it in two places:

On the store so you can access it with store.myState
On store.$state so it can be used in devtools and be serialized during SSR.
On top of that, you will certainly have to use a ref() (or other reactive API) in order to share the value across different accesses:


import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // to correctly handle SSR, we need to make sure we are not overriding an
  // existing value
  if (!store.$state.hasOwnProperty('hasError')) {
    // hasError is defined within the plugin, so each store has their individual
    // state property
    const hasError = ref(false)
    // setting the variable on `$state`, allows it be serialized during SSR
    store.$state.hasError = hasError
  }
  // we need to transfer the ref from the state to the store, this way
  // both accesses: store.hasError and store.$state.hasError will work
  // and share the same variable
  // See https://vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')

  // in this case it's better not to return `hasError` since it
  // will be displayed in the `state` section in the devtools
  // anyway and if we return it, devtools will display it twice.
})
Note that state changes or additions that occur within a plugin (that includes calling store.$patch()) happen before the store is active and therefore do not trigger any subscriptions.

Resetting state added in plugins
By default, $reset() will not reset state added by plugins but you can override it to also reset the state you add:


import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // this is the same code as above for reference
  if (!store.$state.hasOwnProperty('hasError')) {
    const hasError = ref(false)
    store.$state.hasError = hasError
  }
  store.hasError = toRef(store.$state, 'hasError')

  // make sure to set the context (`this`) to the store
  const originalReset = store.$reset.bind(store)

  // override the $reset function
  return {
    $reset() {
      originalReset()
      store.hasError = false
    },
  }
})
Adding new external properties
When adding external properties, class instances that come from other libraries, or simply things that are not reactive, you should wrap the object with markRaw() before passing it to pinia. Here is an example adding the router to every store:


import { markRaw } from 'vue'
// adapt this based on where your router is
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
Calling $subscribe inside plugins
You can use store.$subscribe and store.$onAction inside plugins too:


pinia.use(({ store }) => {
  store.$subscribe(() => {
    // react to store changes
  })
  store.$onAction(() => {
    // react to store actions
  })
})
Adding new options
It is possible to create new options when defining stores to later on consume them from plugins. For example, you could create a debounce option that allows you to debounce any action:


defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // this will be read by a plugin later on
  debounce: {
    // debounce the action searchContacts by 300ms
    searchContacts: 300,
  },
})
The plugin can then read that option to wrap actions and replace the original ones:


// use any debounce library
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // we are overriding the actions with new ones
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
Note that custom options are passed as the 3rd argument when using the setup syntax:


defineStore(
  'search',
  () => {
    // ...
  },
  {
    // this will be read by a plugin later on
    debounce: {
      // debounce the action searchContacts by 300ms
      searchContacts: 300,
    },
  }
)
TypeScript
Everything shown above can be done with typing support, so you don't ever need to use any or @ts-ignore.

Typing plugins
A Pinia plugin can be typed as follows:


import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
Typing new store properties
When adding new properties to stores, you should also extend the PiniaCustomProperties interface.


import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // you can define simpler values too
    simpleNumber: number

    // type the router added by the plugin above (#adding-new-external-properties)
    router: Router
  }
}
It can then be written and read safely:


pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: we haven't typed this correctly
  store.simpleNumber = ref(Math.random())
})
PiniaCustomProperties is a generic type that allows you to reference properties of a store. Imagine the following example where we copy over the initial options as $options (this would only work for option stores):


pinia.use(({ options }) => ({ $options: options }))
We can properly type this by using the 4 generic types of PiniaCustomProperties:


import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
TIP

When extending types in generics, they must be named exactly as in the source code. Id cannot be named id or I, and S cannot be named State. Here is what every letter stands for:

S: State
G: Getters
A: Actions
SS: Setup Store / Store
Typing new state
When adding new state properties (to both, the store and store.$state), you need to add the type to PiniaCustomStateProperties instead. Differently from PiniaCustomProperties, it only receives the State generic:


import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
Typing new creation options
When creating new options for defineStore(), you should extend the DefineStoreOptionsBase. Differently from PiniaCustomProperties, it only exposes two generics: the State and the Store type, allowing you to limit what can be defined. For example, you can use the names of the actions:


import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // allow defining a number of ms for any of the actions
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
TIP

There is also a StoreGetters type to extract the getters from a Store type. You can also extend the options of setup stores or option stores only by extending the types DefineStoreOptions and DefineSetupStoreOptions respectively.

Nuxt
When using pinia alongside Nuxt, you will have to create a Nuxt plugin first. This will give you access to the pinia instance:


// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Note this has to be typed if you are using TS
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
INFO

The above example is using TypeScript, you have to remove the type annotations PiniaPluginContext and Plugin as well as their imports if you are using a .js file.

Existing plugins
You can check existing Pinia plugins on GitHub with the topic pinia-plugin.

Suggest changes to this page
Pager
Previous page
Using a store outside of a component

Master this and much more with a free video from Mastering Pinia
Pinia stores rely on the pinia instance to share the same store instance across all calls. Most of the time, this works out of the box by just calling your useStore() function. For example, in setup(), you don't need to do anything else. But things are a bit different outside of a component. Behind the scenes, useStore() injects the pinia instance you gave to your app. This means that if the pinia instance cannot be automatically injected, you have to manually provide it to the useStore() function. You can solve this differently depending on the kind of application you are writing.

✨
Vibe code Vue apps with confidence
RuleKit
Single Page Applications
If you are not doing any SSR (Server Side Rendering), any call of useStore() after installing the pinia plugin with app.use(pinia) will work:


import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  fails because it's called before the pinia is created
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ works because the pinia instance is now active
const userStore = useUserStore()
The easiest way to ensure this is always applied is to defer calls of useStore() by placing them inside functions that will always run after pinia is installed.

Let's take a look at this example of using a store inside of a navigation guard with Vue Router:


import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ Depending on the order of imports this will fail
const store = useUserStore()

router.beforeEach((to, from, next) => {
  // we wanted to use the store here
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
SSR Apps
When dealing with Server Side Rendering, you will have to pass the pinia instance to useStore(). This prevents pinia from sharing global state between different application instances.

There is a whole section dedicated to it in the SSR guide, this is just a short explanation.

Suggest changes to this page
Pager
Previous page
