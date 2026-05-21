import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogIn,
  Wrench,
  Handshake,
  AlertTriangle,
  ScanLine,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";
import Login from "./pages/Login";
import Servicio from "./pages/Servicio";
import Prestamo from "./pages/Prestamo";
import Incidencia from "./pages/Incidencia";
import Escaneo from "./pages/Escaneo";

type Page = "home" | "login" | "servicio" | "prestamo" | "incidencia" | "escaneo";

const pages: { id: Page; label: string; icon: typeof LogIn; desc: string }[] = [
  { id: "login", label: "Inicio de Sesión", icon: LogIn, desc: "Autenticación de usuarios del sistema" },
  { id: "servicio", label: "Solicitud de Servicio", icon: Wrench, desc: "Registro de solicitudes de soporte técnico" },
  { id: "prestamo", label: "Préstamo de Equipo", icon: Handshake, desc: "Gestión de préstamos de equipamiento" },
  { id: "incidencia", label: "Reporte de Incidencia", icon: AlertTriangle, desc: "Notificación de fallas o problemas" },
  { id: "escaneo", label: "Escaneo de Equipo", icon: ScanLine, desc: "Registro de escaneo y verificación de equipos" },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = (): ReactNode => {
    switch (page) {
      case "login":
        return <Login />;
      case "servicio":
        return <Servicio />;
      case "prestamo":
        return <Prestamo />;
      case "incidencia":
        return <Incidencia />;
      case "escaneo":
        return <Escaneo />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-eternum-gray-1 font-sans text-eternum-text">
      {/* Header */}
      <header className="bg-eternum-dark border-b border-eternum-primary/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-eternum-accent" />
            <div>
              <h1 className="text-lg font-serif italic text-white leading-tight">
                SGRSI
              </h1>
              <p className="text-xs text-eternum-gray-3 font-mono tracking-wider uppercase">
                Formularios del Sistema
              </p>
            </div>
          </div>
          {page !== "home" && (
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-eternum-light hover:text-white
                         bg-eternum-primary/20 hover:bg-eternum-primary/40 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {page === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Hero */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif italic text-eternum-dark mb-3">
                  Formularios <span className="text-eternum-primary">Principales</span>
                </h2>
                <p className="text-eternum-gray-4 max-w-xl mx-auto">
                  Seleccioná el tipo de formulario que querés completar. Todos
                  incluyen validación del lado del cliente.
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <motion.button
                      key={p.id}
                      onClick={() => setPage(p.id)}
                      className="group flex flex-col items-start gap-3 p-6 bg-white rounded-xl border border-eternum-gray-2
                                 hover:border-eternum-primary/40 hover:shadow-lg hover:shadow-eternum-primary/5
                                 transition-all duration-200 text-left cursor-pointer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 rounded-lg bg-eternum-light/50 group-hover:bg-eternum-primary/10 transition-colors">
                        <Icon className="w-6 h-6 text-eternum-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-eternum-dark group-hover:text-eternum-primary transition-colors">
                          {p.label}
                        </h3>
                        <p className="text-sm text-eternum-gray-4 mt-1">
                          {p.desc}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer info */}
              <div className="mt-12 pt-6 border-t border-eternum-gray-2 text-center text-xs text-eternum-gray-3">
                <span className="font-mono tracking-wider uppercase">
                  [FS-E1] Formularios con validación cliente · Equipo Eternum · ITI CETP 2026
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
