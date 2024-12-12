import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { urlApi } from "../../config/config";
import swal from "sweetalert"; // Importar SweetAlert

const NewHotel = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newHotel = {
        ...info,
        rooms,
      };

      await axios.post(`${urlApi}/hotels`, newHotel);

      // Mostrar SweetAlert de éxito
      swal({
        title: "¡Guardado correctamente!",
        text: "El lugar se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        // Opcional: redirigir a otra página
        window.location.href = "/admin-reservas/hotels";
      });
    } catch (err) {
      console.error(err);

      // Mostrar SweetAlert de error
      swal({
        title: "Error",
        text: "Hubo un problema al guardar el lugar.",
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
          <h1>Agregar un nuevo Lugar</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Destacado</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Sí</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Salas</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "Cargando salas..."
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
