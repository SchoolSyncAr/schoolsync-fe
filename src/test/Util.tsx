import { RouteObject } from 'react-router-dom'

export const selectAppRoutes = (routes: RouteObject[] = [], paths: string[]) => {
  return routes.filter((route) => paths.some((path) => route.path && route.path.includes(path)))
}
