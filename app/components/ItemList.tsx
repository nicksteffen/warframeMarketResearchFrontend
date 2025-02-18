// import { DataGrid, GridColDef } from '@mui/x-data-grid';
"use client"
import Paper from '@mui/material/Paper';
import {ItemsList} from '@/app/types/Item';
import { DataGrid, GridColDef, GridRowSelectionModel, GridCallbackDetails } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';


// type HandleRowSelectionModelChangeFunction = (
//   selectionModel : GridRowSelectionModel,
//   details : GridCallbackDetails
// ) => void;
// }


// export default async function ItemList({ items, handleSelectionChange } : {items: ItemsList, handleSelectionChange: any}) {
export default function ItemList({ items, handleSelectionChange } : {items: ItemsList, handleSelectionChange: 
  Dispatch<SetStateAction<string[]>> | undefined }) {
  // GridRowSelectionModel}) {
  // HandleRowSelectionModelChangeFunction | undefined}) {
  // func }) {
  const rows = items.items.map((item) => new Object({...item , id: item._id}));

  const handleSelectionChangeModel = (selectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
    const selectedIds = selectionModel.map((id) => id.toString());
    // todo, need to either remove or do something with 'details'
    console.log(details);
    // todo remove the ! after changing typing to remove the option of undefined
    handleSelectionChange!(selectedIds);
    // const selectedRows = selectedIds.map((id) => rows.find((row) => row.id === id));
    // console.log(selectedRows)ItemsList;
  };

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
          onRowSelectionModelChange={handleSelectionChangeModel}
          // getRowId={(row) => row._id}
        />
      </Paper>
    </>
  );
}