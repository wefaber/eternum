import { useState } from "react";
import { motion } from "motion/react";
import { Wrench, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  solicitante?: string;
  area?: string;
  tipo?: string;
  descripcion?: string;
  prioridad?: string;
}

export default function Servicio() {
  const [solicitante, setSolicitante] = useState("");
  const [area, setArea] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!solicitante.trim()) e.solicitante = "El nombre es obligatorio";
    if (!area) e.area = "Seleccioná un área";
    if (!tipo) e.tipo = "Seleccioná un tipo de servicio";
    if (!descripcion.trim()) e.descripcion = "Describí el servicio solicitado";
    else if (descripcion.trim().length < 20)
      e.descripcion = "Describí con más detalle (mín. 20 caracteres)";
    if (!prioridad) e.prioridad = "Seleccioná una prioridad";
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
          Solicitud registrada
        </h2>
        <p className="text-eternum-gray-4">
          Tu solicitud de servicio fue enviada al área de soporte.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <Wrench className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Solicitud de <span className="text-eternum-primary">Servicio</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Registrá una solicitud de soporte técnico o servicio
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

        <Field label="Área" required error={errors.area}>
          <Select
            value={area}
            onChange={setArea}
            placeholder="Seleccioná un área"
            options={[
              { value: "administracion", label: "Administración" },
              { value: "docencia", label: "Docencia" },
              { value: "alumnos", label: "Alumnos" },
              { value: "sistemas", label: "Sistemas" },
              { value: "otro", label: "Otro" },
            ]}
          />
        </Field>

        <Field label="Tipo de servicio" required error={errors.tipo}>
          <Select
            value={tipo}
            onChange={setTipo}
            placeholder="Seleccioná un tipo"
            options={[
              { value: "hardware", label: "Reparación de hardware" },
              { value: "software", label: "Instalación / actualización de software" },
              { value: "red", label: "Conectividad de red" },
              { value: "cuenta", label: "Gestión de cuentas de usuario" },
              { value: "otro", label: "Otro" },
            ]}
          />
        </Field>

        <Field label="Descripción del servicio" required error={errors.descripcion}>
          <TextArea
            value={descripcion}
            onChange={setDescripcion}
            placeholder="Describí en detalle el servicio solicitado..."
            rows={4}
          />
        </Field>

        <Field label="Prioridad" required error={errors.prioridad}>
          <Select
            value={prioridad}
            onChange={setPrioridad}
            placeholder="Seleccioná una prioridad"
            options={[
              { value: "baja", label: "Baja — Sin urgencia" },
              { value: "media", label: "Media — Requiere atención" },
              { value: "alta", label: "Alta — Urgente" },
              { value: "critica", label: "Crítica — Bloqueante" },
            ]}
          />
        </Field>

        <motion.button
          type="submit"
          className="w-full py-2.5 bg-eternum-primary hover:bg-eternum-primary/90 text-white rounded-lg
                     font-medium transition-colors cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Enviar solicitud
        </motion.button>
      </form>
    </div>
  );
}
