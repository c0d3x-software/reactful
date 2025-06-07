import { Path } from "../shared"
import { isStream } from "./stream"

export const isRoute = (request: Request) =>
   isRequestRoute(request)
   && isPathRoute(new Path(request.url))
   && request.url.equal(/\.[\w\d]+$/) == false
   && request.url.includes('?jsx=true') == false

const isRequestRoute = (request: Request) => isStream(request) == false

const isPathRoute = (path: Path) =>
   path.route.startsWith("/")
   && !path.route.startsWith("/api/")
   && !path.route.startsWith("/assets/")
   && !path.route.equal(/\.[\w\d]+$/)