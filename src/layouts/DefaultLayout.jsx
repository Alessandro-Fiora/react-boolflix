import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="page-wrapper">
      <header>
        <Navbar />
      </header>

      <main className="d-flex flex-direction-column justify-content-center">
        <Outlet />
      </main>

      <footer className="text-bg-dark bg-gradient py-4">
        <div className="container">Boolflix spa</div>
      </footer>
    </div>
  );
}
