import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../config/config";
import swal from "sweetalert";

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username: info.username,
        email: info.email,
        phone: info.phone,
        country: info.country,
      };
  
      console.log("Enviando usuario:", newUser);
  
      const response = await axios.post(`${urlApi}/users`, newUser);
  
      console.log("Respuesta del servidor:", response);
  
      swal({
        title: "¡Guardado correctamente!",
        text: "El usuario se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        window.location.href = "/admin-reservas/users";
      });
    } catch (err) {
      console.error("Error del servidor:", err.response);
  
      swal({
        title: "Error",
        text: err.response?.data?.message || "Hubo un problema al guardar el usuario.",
        icon: "error",
        button: "Intentar de nuevo",
      });
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
              <button onClick={handleClick}>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
