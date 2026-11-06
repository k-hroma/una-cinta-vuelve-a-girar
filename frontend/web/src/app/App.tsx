/* 
Rol: componente raíz. Hoy es un pasamanos: solo renderiza AppRouter.
[POSIBLE CAMBIO POST-REFACTOR] Es el lugar candidato para providers (tema, servicio de datos, etc.). Hoy no tiene lógica.
Lo importa: main.tsx.
*/

import { AppRouter } from '../router/AppRouter';

function App() {
  return <AppRouter />;
}

export default App;
