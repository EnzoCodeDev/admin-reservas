import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { urlApi } from "../../config/config";
import swal from "sweetalert"; // Importar SweetAlert

const NewHotel = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para evitar múltiples envíos
  const navigate = useNavigate();

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

    if (isSubmitting) return; // Evitar múltiples clics

    setIsSubmitting(true);

    try {
      console.log(info);
      const camposObligatorios = ['name', 'type', 'city', 'address', 'distance', 'title', 'desc', 'cheapestPrice'];

      for (const campo of camposObligatorios) {
        if (!info[campo]) {
          swal({
            title: "Error",
            text: `El campo "${campo}" es obligatorio.`,
            icon: "error",
            button: "Intentar de nuevo",
          });
          setIsSubmitting(false);
          return false;
        }
      }

      const newHotel = {
        ...info,
        rooms,
      };

      await axios.post(`${urlApi}/hotels`, newHotel);

      swal({
        title: "¡Guardado correctamente!",
        text: "El lugar se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        navigate("/hotels");
      });
    } catch (err) {
      console.error(err);
      swal({
        title: "Error",
        text: "Hubo un problema al guardar el lugar.",
        icon: "error",
        button: "Intentar de nuevo",
      });
    } finally {
      setIsSubmitting(false);
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
              <button onClick={handleClick} disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
