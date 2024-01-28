export type Routes = {
  _basePath?: string
} & {
  [key: string]: string | ((...args: any[]) => string | Routes) | Routes
}

/**
 * Convert string to kebab-case
 *
 * @example
 * toKebabCase("HelloWorld") // hello-world
 * */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Join paths
 *
 * @example
 * mergePaths("hello", "world") // /hello/world
 * */
export const mergePaths = (...paths: string[]): string => {
  const joinedPaths = paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/(^\/|\/$)/g, '')

  return `/${joinedPaths}`
}

/**
 * Create routes schema
 *
 * @example
 * Basic usage
 *
 * const routes = createRoutes({
 *   index: "/",
 *   dashboard: {
 *    index: "/",
 *    profile: "/profile",
 *   },
 * }); // { index: "/", dashboard: { index: "/dashboard", profile: "/dashboard/profile" } }
 *
 * @example
 * Overriding base path by using _basePath
 *
 * const routes = createRoutes({
 *  auth: {
 *   _basePath: "",
 *   login: "/login",
 *   register: "/register",
 *  },
 * }); // { auth: { login: "/login", register: "/register" } }
 *
 * @example
 * Using functions
 *
 * const routes = createRoutes({
 *  users: {
 *    update: (userId: string) => `/${userId}/update`,
 *  },
 * });
 * routes.users.update(1); // /users/1/update
 * */
export const createRoutes = <R extends Routes = Routes>(routes: R, basePath: string = ''): R => {
  const result: Routes = {}

  Object.entries(routes).forEach(([key, value]) => {
    if (typeof value === 'object') {
      if (value._basePath === undefined) {
        result[key] = createRoutes(value, mergePaths(basePath, toKebabCase(key)))
      } else {
        result[key] = createRoutes(value, mergePaths(basePath, value._basePath))
      }
    } else if (typeof value === 'string') {
      result[key] = mergePaths(basePath, value)
    } else if (typeof value === 'function') {
      result[key] = (...args: any[]) => {
        const path = value(...args)
        if (typeof path === 'string') {
          return mergePaths(basePath, path)
        } else if (path._basePath === undefined) {
          return createRoutes(path, mergePaths(basePath, toKebabCase(key)))
        } else {
          return createRoutes(path, mergePaths(basePath, path._basePath))
        }
      }
    }
  })

  return result as R
}
