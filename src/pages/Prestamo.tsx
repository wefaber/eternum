import { useState } from "react";
import { motion } from "motion/react";
import { Handshake, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  solicitante?: string;
  documento?: string;
  equipo?: string;
  motivo?: string;
  fechaDevolucion?: string;
}

export default function Prestamo() {
  const [solicitante, setSolicitante] = useState("");
  const [documento, setDocumento] = useState("");
  const [equipo, setEquipo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!solicitante.trim()) e.solicitante = "El nombre es obligatorio";
    if (!documento.trim()) e.documento = "El documento es obligatorio";
    if (!equipo) e.equipo = "Seleccioná el tipo de equipo";
    if (!motivo.trim()) e.motivo = "Indicá el motivo del préstamo";
    if (!fechaDevolucion) e.fechaDevolucion = "Indicá la fecha estimada de devolución";
    else {
      const fecha = new Date(fechaDevolucion);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fecha < hoy) e.fechaDevolucion = "La fecha debe ser a partir de hoy";
    }
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
          Préstamo registrado
        </h2>
        <p className="text-eternum-gray-4">
          El préstamo de equipo fue registrado correctamente.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <Handshake className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Préstamo de <span className="text-eternum-primary">Equipo</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Registrá el préstamo de un equipo o dispositivo
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Solicitante" required error={errors.solicitante}>
          <Input
            value={solicitante}
            onChange={setSolicitante}
            placeholder="Nombre y apellido"
          />
        </Field>

        <Field label="Documento de identidad" required error={errors.documento}>
          <Input
            value={documento}
            onChange={setDocumento}
            placeholder="Cédula de identidad"
          />
        </Field>

        <Field label="Tipo de equipo" required error={errors.equipo}>
          <Select
            value={equipo}
            onChange={setEquipo}
            placeholder="Seleccioná un equipo"
            options={[
              { value: "notebook", label: "Notebook" },
              { value: "pc", label: "PC de escritorio" },
              { value: "tablet", label: "Tablet" },
              { value: "proyector", label: "Proyector" },
              { value: "periferico", label: "Periférico (mouse, teclado, etc.)" },
              { value: "otro", label: "Otro" },
            ]}
          />
        </Field>

        <Field label="Motivo del préstamo" required error={errors.motivo}>
          <TextArea
            value={motivo}
            onChange={setMotivo}
            placeholder="Indicá el motivo del préstamo..."
            rows={3}
          />
        </Field>

        <Field label="Fecha estimada de devolución" required error={errors.fechaDevolucion}>
          <Input
            type="date"
            value={fechaDevolucion}
            onChange={setFechaDevolucion}
          />
        </Field>

        <motion.button
          type="submit"
          className="w-full py-2.5 bg-eternum-primary hover:bg-eternum-primary/90 text-white rounded-lg
                     font-medium transition-colors cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Registrar préstamo
        </motion.button>
      </form>
    </div>
  );
}
