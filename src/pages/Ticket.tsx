import { useState } from "react";
import { motion } from "motion/react";
import { TicketCheck, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  titulo?: string;
  categoria?: string;
  accionAfectada?: string;
  descripcion?: string;
}

const categorias = [
  { value: "hardware", label: "Falla de hardware" },
  { value: "software", label: "Error de software" },
  { value: "red", label: "Problema de red / conectividad" },
  { value: "cuenta", label: "Gestión de cuentas y accesos" },
  { value: "seguridad", label: "Incidente de seguridad" },
  { value: "otro", label: "Otro" },
];

const acciones = [
  { value: "pc_lab1", label: "PC Laboratorio 1" },
  { value: "pc_lab2", label: "PC Laboratorio 2" },
  { value: "pc_lab3", label: "PC Laboratorio 3" },
  { value: "servidor", label: "Servidor" },
  { value: "proyector", label: "Proyector" },
  { value: "impresora", label: "Impresora" },
  { value: "red_wifi", label: "Red WiFi" },
  { value: "red_cable", label: "Red cableada" },
  { value: "sistema", label: "Sistema SGRSI" },
  { value: "otro", label: "Otra" },
];

export default function Ticket() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [accionAfectada, setAccionAfectada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!titulo.trim()) e.titulo = "El título es obligatorio";
    else if (titulo.trim().length < 5)
      e.titulo = "El título debe tener al menos 5 caracteres";
    if (!categoria) e.categoria = "Seleccioná una categoría";
    if (!accionAfectada) e.accionAfectada = "Seleccioná la acción afectada";
    if (!descripcion.trim()) e.descripcion = "La descripción es obligatoria";
    else if (descripcion.trim().length < 20)
      e.descripcion = "Describí con más detalle (mín. 20 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-eternum-accent/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-eternum-accent" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark mb-2">
          Ticket creado
        </h2>
        <p className="text-eternum-gray-4">
          Tu ticket fue registrado con estado <strong>pendiente</strong>.
          Un técnico lo tomará a la brevedad.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-50 flex items-center justify-center">
          <TicketCheck className="w-7 h-7 text-amber-600" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Reporte de <span className="text-amber-600">Ticket</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Creá un ticket de incidencia para la mesa de ayuda
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Título del ticket" required error={errors.titulo}>
          <Input
            value={titulo}
            onChange={setTitulo}
            placeholder="Ej: PC del laboratorio 1 no enciende"
          />
        </Field>

        <Field label="Categoría" required error={errors.categoria}>
          <Select
            value={categoria}
            onChange={setCategoria}
            placeholder="Seleccioná una categoría"
            options={categorias}
          />
        </Field>

        <Field label="Acción / Equipo afectado" required error={errors.accionAfectada}>
          <Select
            value={accionAfectada}
            onChange={setAccionAfectada}
            placeholder="Seleccioná el recurso afectado"
            options={acciones}
          />
        </Field>

        <Field label="Descripción del problema" required error={errors.descripcion}>
          <TextArea
            value={descripcion}
            onChange={setDescripcion}
            placeholder="Describí el problema en detalle: qué ocurre, desde cuándo, cómo reproducirlo..."
            rows={4}
          />
        </Field>

        <div className="text-xs text-eternum-gray-3 bg-eternum-gray-1 rounded-lg p-3">
          El ticket se creará automáticamente con estado <strong>pendiente</strong>
          {" "}y quedará disponible en la lista OOL para que un técnico lo tome.
        </div>

        <motion.button
          type="submit"
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg
                     font-medium transition-colors cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Crear ticket
        </motion.button>
      </form>
    </div>
  );
}
