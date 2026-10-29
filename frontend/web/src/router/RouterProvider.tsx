import { RouterProvider as RRDRouterProvider } from "react-router/dom";
import { router } from "./router.config";

export function AppRouter() {
  return <RRDRouterProvider router={router} />;
}