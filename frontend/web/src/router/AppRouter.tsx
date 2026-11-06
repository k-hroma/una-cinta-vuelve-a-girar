/*
Rol: adaptador: envuelve el RouterProvider de la librería (importado de react-router/dom, la variante para navegador) y le pasa el router ya construido.
*/

import { RouterProvider } from 'react-router/dom';
import { router } from './router.config';

export function AppRouter() {
  return <RouterProvider router={router} />;
}
