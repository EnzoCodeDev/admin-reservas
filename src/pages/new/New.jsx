import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { urlApi } from "../../config/config";
import swal from "sweetalert";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const newUser = {
        ...info,
        img: "",
      };

      await axios.post(`${urlApi}/users`, newUser);

      // Mostrar SweetAlert de éxito
      swal({
        title: "¡Guardado correctamente!",
        text: "El usuario se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        window.location.href = "/admin-reservas/users";
      });
    } catch (err) {
      console.log(err);

       // Mostrar SweetAlert de error
       swal({
        title: "Error",
        text: "Hubo un problema al guardar el usuario.",
        icon: "error",
        button: "Intentar de nuevo",
      });
    }
  };

  console.log(info);
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
