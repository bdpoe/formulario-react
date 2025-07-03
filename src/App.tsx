import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

function App() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const [formKey, setFormKey] = useState(0); // clave para reiniciar el formulario
  const [state, handleSubmit] = useForm("xyzjvwww"); // reemplaza con tu ID real

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dni") {
      if (/^\d{0,8}$/.test(value)) {
        setUser({ ...user, dni: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const volverAlFormulario = () => {
    setUser({ nombre: "", apellido: "", dni: "" });
    setFormKey(prev => prev + 1); // cambia la clave para reiniciar el formulario
  };

  if (state.succeeded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <div>
          <h2>¡Gracias! Tu formulario fue enviado con éxito.</h2>
          <button onClick={volverAlFormulario} style={{ marginTop: "10px" }}>
            REGRESAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={formKey} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div>
        <h1>Formulario</h1>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={handleInputChange}
              value={user.nombre}
              required
            />
            <ValidationError prefix="Nombre" field="nombre" errors={state.errors} />
          </fieldset>

          <fieldset>
            <label htmlFor="apellido">Apellido: </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              onChange={handleInputChange}
              value={user.apellido}
              required
            />
            <ValidationError prefix="Apellido" field="apellido" errors={state.errors} />
          </fieldset>

          <fieldset>
            <label htmlFor="dni">DNI: </label>
            <input
              type="text"
              id="dni"
              name="dni"
              onChange={handleInputChange}
              value={user.dni}
              required
            />
            <ValidationError prefix="DNI" field="dni" errors={state.errors} />
          </fieldset>

          <button type="submit" disabled={state.submitting}>
            ENVIAR
          </button>
        </form>

        <button
          style={{ marginTop: "10px" }}
          onClick={() => setUser({ nombre: "", apellido: "", dni: "" })}
        >
          LIMPIAR
        </button>
      </div>
    </div>
  );
}

export default App;
