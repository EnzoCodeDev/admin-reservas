import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const navigate = useNavigate();
  let data;

  const diff = 12.4;

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        amount: 5,
        linkText1: "Ver Usuarios",
        linkText2: "Crear Usuario",
        linkRoute1: "/users",
        linkRoute2: "/users/new",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      data = {
        title: "LUGARES",
        amount: 5,
        linkText1: "Ver Lugares",
        linkText2: "Crear Lugar",
        linkRoute1: "/hotels",
        linkRoute2: "/hotels/new",
        icon: (
          <LocationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              color: "blue",
            }}
          />
        ),
      };
      break;
    case "room":
      data = {
        title: "SALAS",
        amount: 11,
        linkText1: "Ver Salas",
        linkText2: "Crear Sala",
        linkRoute1: "/rooms",
        linkRoute2: "/rooms/new",
        icon: (
          <MeetingRoomOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      data = null;
  }

  if (!data) return null;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <button className="btn" onClick={() => navigate(data.linkRoute1)}>
          {data.linkText1}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(data.linkRoute2)}>
          {data.linkText2}
        </button>
      </div>
      <div className="right">
        <div className="percentage positive">
          +{diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
