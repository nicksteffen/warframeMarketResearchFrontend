// import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {ItemsList} from '@/app/types/Item';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export default async function ItemList({ items } : {items: ItemsList }) {
  const rows = items.items.map((item) => new Object({...item , id: item._id}));

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'item_name', headerName: 'Item name', width: 130 },
    { field: 'median_price', headerName: 'Median price', width: 130, type: 'number'},
    { field: 'volume', headerName: 'Volume sold ', width: 130, type: 'number'},
    { field: 'wiki_link', headerName: "Wiki Link", width: 130},
    { field: 'market_link', headerName: "Market Link", width: 130},

  ];
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10,25, 50]}
          checkboxSelection
          sx={{ border: 0 }}
          // getRowId={(row) => row._id}
        />
      </Paper>
    </>
  );
}