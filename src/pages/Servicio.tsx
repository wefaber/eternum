import { useState } from "react";
import { motion } from "motion/react";
import { Wrench, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

type TipoServicio = "" | "laboratorio" | "instalacion" | "configuracion" | "otro";

interface Errors {
  tipo?: string;
  laboratorio?: string;
  software?: string;
  equipo?: string;
  descripcion?: string;
}

export default function Servicio() {
  const [tipo, setTipo] = useState<TipoServicio>("");
  const [laboratorio, setLaboratorio] = useState("");
  const [software, setSoftware] = useState("");
  const [equipo, setEquipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!tipo) {
      e.tipo = "Seleccioná el tipo de servicio";
    } else {
      switch (tipo) {
        case "laboratorio":
          if (!laboratorio.trim()) e.laboratorio = "Indicá el número de laboratorio";
          break;
        case "instalacion":
          if (!software.trim()) e.software = "Indicá el software a instalar";
          break;
        case "configuracion":
          if (!equipo.trim()) e.equipo = "Indicá el número de equipo";
          break;
        case "otro":
          if (!descripcion.trim()) e.descripcion = "Describí el servicio solicitado";
          else if (descripcion.trim().length < 20)
            e.descripcion = "Describí con más detalle (mín. 20 caracteres)";
          break;
      }
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
          Solicitud enviada
        </h2>
        <p className="text-eternum-gray-4">
          Tu solicitud de servicio fue registrada con estado <strong>pendiente</strong>.
        </p>
      </motion.div>
    );
  }

  const tipos = [
    { value: "laboratorio", label: "Preparación de laboratorio" },
    { value: "instalacion", label: "Instalación de software" },
    { value: "configuracion", label: "Configuración de equipo" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <Wrench className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Solicitud de <span className="text-eternum-primary">Servicio Técnico</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Solicitá una intervención técnica en el instituto
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Tipo de servicio" required error={errors.tipo}>
          <Select
            value={tipo}
            onChange={(v) => {
              setTipo(v as TipoServicio);
              setLaboratorio("");
              setSoftware("");
              setEquipo("");
              setDescripcion("");
              setErrors({});
            }}
            placeholder="Seleccioná el tipo de intervención"
            options={tipos}
          />
        </Field>

        {tipo === "laboratorio" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Field label="N° de laboratorio" required error={errors.laboratorio}>
              <Input
                value={laboratorio}
                onChange={setLaboratorio}
                placeholder="Ej: Laboratorio 2"
              />
            </Field>
          </motion.div>
        )}

        {tipo === "instalacion" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Field label="Software a instalar" required error={errors.software}>
              <Input
                value={software}
                onChange={setSoftware}
                placeholder="Ej: AutoCAD 2026, Visual Studio Code"
              />
            </Field>
          </motion.div>
        )}

        {tipo === "configuracion" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Field label="N° de equipo" required error={errors.equipo}>
              <Input
                value={equipo}
                onChange={setEquipo}
                placeholder="Número de serie o etiqueta del equipo"
              />
            </Field>
          </motion.div>
        )}

        {tipo === "otro" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Field label="Descripción del servicio" required error={errors.descripcion}>
              <TextArea
                value={descripcion}
                onChange={setDescripcion}
                placeholder="Describí en detalle el servicio solicitado..."
                rows={4}
              />
            </Field>
          </motion.div>
        )}

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
