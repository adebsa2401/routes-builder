# Routes builder

A set of utilities to set up routes schema for a web application.

```ts
import {createRoutes} from "@adebsa2401/routes-builder";

const routes = createRoutes({
  index: "/",
  dashboard: {
    index: "/",
    profile: "/profile",
  },
});

console.log(routes) // { index: "/", dashboard: { index: "/dashboard", profile: "/dashboard/profile" } }
```

# Installation

```bash
npm install @adebsa2401/routes-builder
# or
yarn add @adebsa2401/routes-builder
# or
pnpm add @adebsa2401/routes-builder
```

# Usage

## `createRoutes`

```ts
import {createRoutes} from "@adebsa2401/routes-builder";
```

```ts
const routes = createRoutes({
  index: "/",
  dashboard: {
    index: "/",
    profile: "/profile",
  },
});

console.log(routes) // { index: "/", dashboard: { index: "/dashboard", profile: "/dashboard/profile" } }
```

By default, the `createRoutes` function will use the `"/"` as the root path. You can change it by passing a second argument `basePath`.

```ts
const routes = createRoutes(
  {
    index: "/",
    dashboard: {
      index: "/",
      profile: "/profile",
    },
  },
  "/app",
);

console.log(routes) // { index: "/app", dashboard: { index: "/app/dashboard", profile: "/app/dashboard/profile" } }
```

By default, a block key is prepended to the path. You can disable it by using a `_basePath: ""` or `_basePath: "/"` attribute inside the block

```ts
const routes = createRoutes({
  index: "/",
  auth: {
    _basePath: "",
    login: "/login",
    register: "/register",
  },
});

console.log(routes) // { index: "/", auth: { login: "/login", register: "/register" } }
```

You can also set a custom block prefix by using the `_basePath` attribute.

```ts
const routes = createRoutes({
  index: "/",
  auth: {
    _basePath: "/authentication",
    login: "/login",
    register: "/register",
  },
});

console.log(routes) // { index: "/", auth: { login: "/authentication/login", register: "/authentication/register" } }
```

You can also set up dynamic routes by using functions.

```ts
const routes = createRoutes({
  index: "/",
  dashboard: {
    index: "/",
    profile: "/profile",
    user: (id: string) => `/user/${id}`,
  },
});

console.log(routes) // { index: "/", dashboard: { index: "/dashboard", profile: "/dashboard/profile", user: (id: string) => `/dashboard/user/${id}` } }
```

And of course functions can also return blocks.

```ts
const routes = createRoutes({
  index: "/",
  dashboard: {
    index: "/",
    profile: "/profile",
    user: (id: string) => ({
      _basePath: `/user/${id}`,
      index: "/",
      update: "/update",
    }),
  },
});

console.log(routes) // { index: "/", dashboard: { index: "/dashboard", profile: "/dashboard/profile", user: { index: "/dashboard/user/:id", update: "/dashboard/user/:id/update" } } }
```

## 👥 Author

👤 **Ben Salès**

- Email: [adebsa2401@gmail.com](mailto:adebsa2401@gmail.com)
- GitHub: [@adebsa2401](https://github.com/adebsa2401)
- LinkedIn: [adebsa](https://www.linkedin.com/in/adebsa)
