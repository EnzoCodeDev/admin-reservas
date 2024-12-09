import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { urlApi } from "../../config/config";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import swal from "sweetalert"; // Importar SweetAlert

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = "1".split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`${urlApi}/rooms/${hotelId}`, { ...info, roomNumbers });

      // Mostrar popup con SweetAlert
      swal({
        title: "¡Guardado correctamente!",
        text: "La sala se ha guardado con éxito.",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        navigate("/rooms"); // Redirige a la lista de habitaciones después de cerrar el popup
      });
    } catch (err) {
      console.log(err);

      // Mostrar error con SweetAlert
      swal({
        title: "Error",
        text: "Hubo un problema al guardar la habitación.",
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
              <button onClick={handleClick}>Agregar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
