import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}