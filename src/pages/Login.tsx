import { useState } from "react";
import { motion } from "motion/react";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { Field, Input } from "../components/FormFields";

interface Errors {
  usuario?: string;
  password?: string;
}

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!usuario.trim()) e.usuario = "El usuario es obligatorio";
    if (!password) e.password = "La contraseña es obligatoria";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
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
        className="max-w-md mx-auto text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-eternum-accent/20 flex items-center justify-center">
          <LogIn className="w-8 h-8 text-eternum-accent" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark mb-2">
          Sesión iniciada
        </h2>
        <p className="text-eternum-gray-4">
          Bienvenido, <strong className="text-eternum-primary">{usuario}</strong>.
          Redirigiendo al panel principal...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-eternum-primary/10 flex items-center justify-center">
          <LogIn className="w-7 h-7 text-eternum-primary" />
        </div>
        <h2 className="text-2xl font-serif italic text-eternum-dark">
          Inicio de <span className="text-eternum-primary">Sesión</span>
        </h2>
        <p className="text-sm text-eternum-gray-4 mt-1">
          Ingresá tus credenciales para acceder al sistema SGRSI
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-eternum-gray-2 p-6 space-y-5"
      >
        <Field label="Nombre de usuario" required error={errors.usuario}>
          <Input
            value={usuario}
            onChange={setUsuario}
            placeholder="usuario"
          />
        </Field>

        <Field label="Contraseña" required error={errors.password}>
          <div className="relative">
            <Input
              value={password}
              onChange={setPassword}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-eternum-gray-3 hover:text-eternum-primary cursor-pointer"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </Field>

        <motion.button
          type="submit"
          className="w-full py-2.5 bg-eternum-primary hover:bg-eternum-primary/90 text-white rounded-lg
                     font-medium transition-colors cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Ingresar
        </motion.button>
      </form>
    </div>
  );
}
