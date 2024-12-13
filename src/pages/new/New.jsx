import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../../config/config";
import swal from "sweetalert";

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    phone: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para controlar el envío

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evitar múltiples clics mientras se realiza el envío

    setIsSubmitting(true); // Marcar que el envío está en curso

    try {
      const camposObligatorios = ['username', 'password', 'email', 'country', 'phone', 'city'];

      for (const campo of camposObligatorios) {
        if (!info[campo] || info[campo].trim() === "") {
          swal({
            title: "Error",
            text: `El campo "${campo}" es obligatorio.`,
            icon: "error",
            button: "Intentar de nuevo",
          });
          setIsSubmitting(false); // Restablecer estado si falta un campo
          return;
        }
      }

      const newUser = {
        username: info.username,
        password: info.password,
        email: info.email,
        phone: info.phone,
        country: info.country,
        city: info.city,
      };

      await axios.post(`${urlApi}/auth/register`, newUser);

      swal({
        title: "¡Guardado correctamente!",
        text: "El usuario se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        navigate("/users");
      });
    } catch (err) {
      swal({
        title: "Error",
        text: err.response?.data?.message || "Hubo un problema al guardar el usuario.",
        icon: "error",
        button: "Intentar de nuevo",
      });
    } finally {
      setIsSubmitting(false); // Restablecer estado después del envío
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick} disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
