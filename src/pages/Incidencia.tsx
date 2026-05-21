import { useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  reporta?: string;
  ubicacion?: string;
  tipo?: string;
  descripcion?: string;
  criticidad?: string;
}

export default function Incidencia() {
  const [reporta, setReporta] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [criticidad, setCriticidad] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!reporta.trim()) e.reporta = "El nombre es obligatorio";
    if (!ubicacion.trim()) e.ubicacion = "Indicá la ubicación";
    if (!tipo) e.tipo = "Seleccioná el tipo de incidencia";
    if (!descripcion.trim()) e.descripcion = "Describí la incidencia";
    else if (descripcion.trim().length < 20)
      e.descripcion = "Describí con más detalle (mín. 20 caracteres)";
    if (!criticidad) e.criticidad = "Seleccioná la criticidad";
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
          Incidencia reportada
        </h2>
        <p className="text-eternum-gray-4">
          Tu reporte fue enviado al equipo de soporte.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Reporte de <span className="text-red-500">Incidencia</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Reportá una falla, error o problema en el sistema
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Reporta" required error={errors.reporta}>
          <Input
            value={reporta}
            onChange={setReporta}
            placeholder="Nombre y apellido"
          />
        </Field>

        <Field label="Ubicación" required error={errors.ubicacion}>
          <Input
            value={ubicacion}
            onChange={setUbicacion}
            placeholder="Aula, laboratorio, oficina..."
          />
        </Field>

        <Field label="Tipo de incidencia" required error={errors.tipo}>
          <Select
            value={tipo}
            onChange={setTipo}
            placeholder="Seleccioná un tipo"
            options={[
              { value: "hardware", label: "Falla de hardware" },
              { value: "software", label: "Error de software" },
              { value: "red", label: "Problema de red / conectividad" },
              { value: "electrico", label: "Problema eléctrico" },
              { value: "seguridad", label: "Incidente de seguridad" },
              { value: "otro", label: "Otro" },
            ]}
          />
        </Field>

        <Field label="Descripción" required error={errors.descripcion}>
          <TextArea
            value={descripcion}
            onChange={setDescripcion}
            placeholder="Describí la incidencia en detalle..."
            rows={4}
          />
        </Field>

        <Field label="Criticidad" required error={errors.criticidad}>
          <Select
            value={criticidad}
            onChange={setCriticidad}
            placeholder="Seleccioná la criticidad"
            options={[
              { value: "baja", label: "Baja — No afecta operaciones" },
              { value: "media", label: "Media — Afecta parcialmente" },
              { value: "alta", label: "Alta — Sin solución alternativa" },
              { value: "critica", label: "Crítica — Sistema detenido" },
            ]}
          />
        </Field>

        <motion.button
          type="submit"
          className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg
                     font-medium transition-colors cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Reportar incidencia
        </motion.button>
      </form>
    </div>
  );
}
