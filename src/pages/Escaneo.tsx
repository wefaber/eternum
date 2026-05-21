import { useState } from "react";
import { motion } from "motion/react";
import { ScanLine, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  tecnico?: string;
  equipo?: string;
  tipoEscaneo?: string;
  resultados?: string;
  estado?: string;
}

export default function Escaneo() {
  const [tecnico, setTecnico] = useState("");
  const [equipo, setEquipo] = useState("");
  const [tipoEscaneo, setTipoEscaneo] = useState("");
  const [resultados, setResultados] = useState("");
  const [estado, setEstado] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!tecnico.trim()) e.tecnico = "El nombre del técnico es obligatorio";
    if (!equipo.trim()) e.equipo = "Identificá el equipo";
    if (!tipoEscaneo) e.tipoEscaneo = "Seleccioná el tipo de escaneo";
    if (!resultados.trim()) e.resultados = "Registrá los resultados del escaneo";
    if (!estado) e.estado = "Seleccioná el estado del equipo";
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
          Escaneo registrado
        </h2>
        <p className="text-eternum-gray-4">
          Los resultados del escaneo fueron guardados correctamente.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <ScanLine className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Escaneo de <span className="text-eternum-primary">Equipo</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Registrá los resultados del escaneo y verificación de un equipo
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Técnico responsable" required error={errors.tecnico}>
          <Input
            value={tecnico}
            onChange={setTecnico}
            placeholder="Nombre del técnico"
          />
        </Field>

        <Field label="Equipo" required error={errors.equipo}>
          <Input
            value={equipo}
            onChange={setEquipo}
            placeholder="N° de serie / inventario / etiqueta"
          />
        </Field>

        <Field label="Tipo de escaneo" required error={errors.tipoEscaneo}>
          <Select
            value={tipoEscaneo}
            onChange={setTipoEscaneo}
            placeholder="Seleccioná un tipo"
            options={[
              { value: "hardware", label: "Escaneo de hardware" },
              { value: "software", label: "Escaneo de software" },
              { value: "seguridad", label: "Escaneo de seguridad" },
              { value: "rendimiento", label: "Escaneo de rendimiento" },
              { value: "completo", label: "Escaneo completo" },
            ]}
          />
        </Field>

        <Field label="Resultados" required error={errors.resultados}>
          <TextArea
            value={resultados}
            onChange={setResultados}
            placeholder="Detallá los resultados del escaneo, hallazgos, anomalías..."
            rows={4}
          />
        </Field>

        <Field label="Estado del equipo" required error={errors.estado}>
          <Select
            value={estado}
            onChange={setEstado}
            placeholder="Seleccioná el estado"
            options={[
              { value: "operativo", label: "Operativo — Funciona correctamente" },
              { value: "condicional", label: "Condicional — Funciona con observaciones" },
              { value: "reparacion", label: "En reparación — Requiere mantenimiento" },
              { value: "baja", label: "De baja — No reparable" },
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
          Registrar escaneo
        </motion.button>
      </form>
    </div>
  );
}
