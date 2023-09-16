import React, {useState, useContext} from "react";
import { ContextGlobal } from "./utils/global.context";

const Form = () => {
  const { state } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleName = (e) => {
    const nameValue = e.target.value;

    if (nameValue.trim() === "" || nameValue.trim() !== nameValue || nameValue.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: true,
      }));
      setFormData((prevData) => ({
        ...prevData,
        name: nameValue, 
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: false,
      }));
      setFormData((prevData) => ({
        ...prevData,
        name: nameValue,
      }));
    }
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true,
      }));
      setFormData((prevData) => ({
        ...prevData,
        email: emailValue, 
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: false,
      }));
      setFormData((prevData) => ({
        ...prevData,
        email: emailValue,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setSuccessMessage(`${formData.name}, tu correo de contacto ha sido enviado correctamente.`);
  
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className={state.theme}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Ingresa tu nombre" value={formData.name} onChange={handleName}/>
        {errors.name && <span className="error">El nombre es inválido</span>}

        <input type="email" name="email" placeholder="Ingresa tu email" value={formData.email} onChange={handleEmail}/>
        {errors.email && <span className="error">El correo electrónico es inválido</span>}

        <button type="submit">Enviar</button>
      </form>
      <div className="success-message">{successMessage}</div>
    </div>
  );
};

export default Form;
