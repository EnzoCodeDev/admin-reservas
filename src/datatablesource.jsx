export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "País",
    width: 100,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Teléfono",
    width: 170,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Nombre",
    width: 270,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 100,
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 300,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Título",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Descripción",
    width: 200,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Máximo de personas",
    width: 150,
  },
];
