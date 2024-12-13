import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Ingresos Totales</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={25} text={"25%"} strokeWidth={5} />
        </div>
        <p className="title">Ventas realizadas hoy</p>
        <p className="amount">$2,500</p>
        <p className="desc">
          Procesando transacciones anteriores. Los últimos pagos pueden no estar incluidos.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Objetivo</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$9,000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Semana Pasada</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$4,300</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mes Pasado</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$23,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
