import { useState } from "react";
import { motion } from "motion/react";
import { PackagePlus, CheckCircle } from "lucide-react";
import { Field, Input, Select, TextArea } from "../components/FormFields";

interface Errors {
  modelo?: string;
  marca?: string;
  serie?: string;
  tipo?: string;
  estado?: string;
  observaciones?: string;
}

export default function Inventario() {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!modelo.trim()) e.modelo = "El modelo es obligatorio";
    if (!marca.trim()) e.marca = "La marca es obligatoria";
    if (!serie.trim()) e.serie = "El número de serie es obligatorio";
    if (!tipo) e.tipo = "Seleccioná el tipo de equipo";
    if (!estado) e.estado = "Seleccioná el estado inicial";
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
          Equipo registrado
        </h2>
        <p className="text-eternum-gray-4">
          El equipo <strong>{marca} {modelo}</strong> (serie: {serie})
          {" "}fue agregado al inventario como <strong>{estado}</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <PackagePlus className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Alta de <span className="text-eternum-primary">Equipo</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Registrá un nuevo equipo en el inventario del instituto
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Marca" required error={errors.marca}>
          <Input
            value={marca}
            onChange={setMarca}
            placeholder="Ej: HP, Dell, Lenovo"
          />
        </Field>

        <Field label="Modelo" required error={errors.modelo}>
          <Input
            value={modelo}
            onChange={setModelo}
            placeholder="Ej: ProBook 450 G10"
          />
        </Field>

        <Field label="Número de serie" required error={errors.serie}>
          <Input
            value={serie}
            onChange={setSerie}
            placeholder="Número de serie único del equipo"
          />
        </Field>

        <Field label="Tipo de equipo" required error={errors.tipo}>
          <Select
            value={tipo}
            onChange={setTipo}
            placeholder="Seleccioná el tipo"
            options={[
              { value: "notebook", label: "Notebook" },
              { value: "pc_escritorio", label: "PC de escritorio" },
              { value: "all_in_one", label: "All-in-One" },
              { value: "tablet", label: "Tablet" },
              { value: "monitor", label: "Monitor" },
              { value: "proyector", label: "Proyector" },
              { value: "impresora", label: "Impresora" },
              { value: "periferico", label: "Periférico" },
              { value: "red", label: "Equipo de red" },
              { value: "otro", label: "Otro" },
            ]}
          />
        </Field>

        <Field label="Estado inicial" required error={errors.estado}>
          <Select
            value={estado}
            onChange={setEstado}
            placeholder="Seleccioná el estado"
            options={[
              { value: "disponible", label: "Disponible" },
              { value: "prestado", label: "Prestado" },
              { value: "en_servicio", label: "En servicio" },
              { value: "de_baja", label: "De baja" },
            ]}
          />
        </Field>

        <Field label="Observaciones (opcional)">
          <TextArea
            value={observaciones}
            onChange={setObservaciones}
            placeholder="Notas adicionales sobre el equipo..."
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
          Registrar equipo
        </motion.button>
      </form>
    </div>
  );
}
