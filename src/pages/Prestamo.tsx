import { useState } from "react";
import { motion } from "motion/react";
import { Handshake, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  solicitante?: string;
  equipoSerie?: string;
  responsable?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  componentes?: string;
}

export default function Prestamo() {
  const [solicitante, setSolicitante] = useState("");
  const [equipoSerie, setEquipoSerie] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [componentes, setComponentes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!solicitante.trim()) e.solicitante = "El nombre del solicitante es obligatorio";
    if (!equipoSerie.trim()) e.equipoSerie = "El número de serie del equipo es obligatorio";
    if (!responsable.trim()) e.responsable = "El nombre del responsable es obligatorio";
    if (!fechaDesde) e.fechaDesde = "Indicá la fecha y hora de préstamo";
    if (!fechaHasta) e.fechaHasta = "Indicá la fecha prevista de devolución";
    else {
      const desde = new Date(fechaDesde);
      const hasta = new Date(fechaHasta);
      if (hasta < desde) e.fechaHasta = "La devolución debe ser posterior al préstamo";
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
          El equipo <strong>{equipoSerie}</strong> fue prestado a{" "}
          <strong>{solicitante}</strong> correctamente.
        </p>
      </motion.div>
    );
  }

  const today = new Date().toISOString().slice(0, 16);

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
          Registrá el préstamo temporal de un equipo del inventario
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Usuario solicitante" required error={errors.solicitante}>
          <Input
            value={solicitante}
            onChange={setSolicitante}
            placeholder="Nombre del solicitante"
          />
        </Field>

        <Field label="Equipo (n° de serie)" required error={errors.equipoSerie}>
          <Input
            value={equipoSerie}
            onChange={setEquipoSerie}
            placeholder="Número de serie del equipo"
          />
        </Field>

        <Field label="Responsable del préstamo" required error={errors.responsable}>
          <Input
            value={responsable}
            onChange={setResponsable}
            placeholder="Técnico o administrador que registra"
          />
        </Field>

        <Field label="Fecha y hora de préstamo" required error={errors.fechaDesde}>
          <Input
            type="datetime-local"
            value={fechaDesde}
            onChange={setFechaDesde}
          />
        </Field>

        <Field label="Fecha prevista de devolución" required error={errors.fechaHasta}>
          <Input
            type="datetime-local"
            value={fechaHasta}
            onChange={setFechaHasta}
          />
        </Field>

        <Field label="Componentes adicionales (opcional)">
          <TextArea
            value={componentes}
            onChange={setComponentes}
            placeholder="Cables, adaptadores, periféricos incluidos..."
            rows={2}
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
