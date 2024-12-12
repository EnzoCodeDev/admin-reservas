import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert"; // Importa SweetAlert
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto de autenticación

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Accedemos al dispatch del AuthContext para manejar el estado del usuario

 //Cerrar sesión
  const handleLogout = async () => {
    const confirm = await swal({
      title: "¿Estás seguro?",
      text: "Vas a cerrar sesión.",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: false,
          visible: true,
          className: "swal-button swal-button--cancel",
          closeModal: true,
        },
        confirm: {
          text: "Cerrar sesión",
          value: true,
          visible: true,
          className: "swal-button swal-button--danger",
          closeModal: true,
        },
      },
      dangerMode: true,
    });

    if (confirm) {
      dispatch({ type: "LOGOUT" });

      localStorage.removeItem("authToken");

      swal("¡Hasta pronto!", "Has cerrado sesión con éxito.", "success");
      navigate("/login");
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Panel de control</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTAS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleAltIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <LocationOnIcon className="icon" /> {/* Cambia el ícono aquí */}
              <span>Lugares</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <MeetingRoomIcon className="icon" />
              <span>Salas</span>
            </li>
          </Link>
          <p className="title">CERRAR SESIÓN</p>
          <li className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Salir</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
