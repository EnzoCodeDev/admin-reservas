import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import swal from "sweetalert"; // Importar SweetAlert para confirmaciones

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // Detecta si es "rooms", "hotels" o "users"
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Estado para manejar las filas seleccionadas
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // Elimina una fila individual con confirmación
  const handleDelete = async (id) => {
    const confirm = await swal({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro de forma permanente.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    });

    if (!confirm) return; // Si el usuario cancela, no hace nada

    try {
      await axios.delete(`/${path}/${id}`); // Solicitud DELETE
      setList(list.filter((item) => item._id !== id)); // Actualiza la lista local
      swal("Eliminado", "El registro ha sido eliminado con éxito.", "success");
    } catch (err) {
      console.error(`Error eliminando ${path}:`, err);
      swal("Error", "Hubo un problema al intentar eliminar el registro.", "error");
    }
  };

  // Elimina las filas seleccionadas con confirmación
  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return; // Asegúrate de que haya filas seleccionadas

    const confirm = await swal({
      title: "¿Estás seguro?",
      text: `Esta acción eliminará ${selectedRows.length} registros de forma permanente.`,
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    });

    if (!confirm) return; // Si el usuario cancela, no hace nada

    try {
      await Promise.all(
        selectedRows.map((id) => axios.delete(`/${path}/${id}`)) // DELETE en bulk
      );
      setList(list.filter((item) => !selectedRows.includes(item._id))); // Filtra eliminados
      setSelectedRows([]); // Limpia las filas seleccionadas
      swal(
        "Eliminados",
        `${selectedRows.length} registros han sido eliminados con éxito.`,
        "success"
      );
    } catch (err) {
      console.error(`Error eliminando ${path} en bulk:`, err);
      swal("Error", "Hubo un problema al intentar eliminar los registros.", "error");
    }
  };

  // Define las acciones individuales (botón rojo para eliminar)
  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Eliminar
            </div>
          </div>
        );
      },
    },
  ];

  // Mapea el path al título correspondiente
  const titleMap = {
    users: "Usuarios",
    rooms: "Salas",
    hotels: "Lugares",
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {titleMap[path] || "Datos"} {/* Muestra el título dinámico basado en el path */}
        <Link to={`/${path}/new`} className="link">
          {path === "rooms"
            ? "Nueva Sala"
            : path === "hotels"
            ? "Nuevo Lugar"
            : "Nuevo Usuario"}
        </Link>
        {selectedRows.length > 0 && (
          <button
            className="deleteButton bulkDelete"
            onClick={handleDeleteSelected}
          >
            Eliminar seleccionados
          </button>
        )}
      </div>
      {list.length > 0 ? (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          onSelectionModelChange={(ids) => setSelectedRows(ids)} // Captura las filas seleccionadas
          getRowId={(row) => row._id}
          loading={loading} // Agrega estado de carga
        />
      ) : (
        <h1>{loading ? "Cargando datos..." : "No hay datos disponibles"}</h1>
      )}
    </div>
  );
};

export default Datatable;
