import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { urlApi } from "../../config/config";
import { useNavigate } from "react-router-dom"; 
import swal from "sweetalert"; 

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar envíos
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evita múltiples clics mientras se procesa
    setIsSubmitting(true);

    const roomNumbers = "1".split(",").map((room) => ({ number: room }));

    if (!hotelId) {
      swal({
        title: "Error",
        text: "No se puede guardar la sala sin seleccionar un lugar.",
        icon: "error",
        button: "Intentar de nuevo",
      });
      setIsSubmitting(false);
      return;
    }

    if (!info.title || !info.desc || !info.price || !info.maxPeople || !hotelId) {
      swal({
        title: "Error",
        text: "Faltan datos requeridos para guardar la sala.",
        icon: "error",
        button: "Intentar de nuevo",
      });
      setIsSubmitting(false);
      return false;
    }

    try {
      await axios.post(`${urlApi}/rooms/${hotelId}`, { ...info, roomNumbers });

      swal({
        title: "¡Guardado correctamente!",
        text: "La sala se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        navigate("/rooms");
      });
    } catch (err) {
      swal({
        title: "Error",
        text: "Hubo un problema al guardar la sala.",
        icon: "error",
        button: "Intentar de nuevo",
      });
    } finally {
      setIsSubmitting(false); // Restablece el estado después de finalizar la solicitud
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Agrega una nueva sala</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Escoge un Lugar</label>
                <select
                  id="hotelId"
                  onChange={(e) => {
                    setHotelId(e.target.value);
                  }}
                >
                  <option value={undefined} disabled selected>
                    Seleccionar un lugar
                  </option>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick} disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
