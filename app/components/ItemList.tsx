// import { DataGrid, GridColDef } from '@mui/x-data-grid';
"use client"
import Paper from '@mui/material/Paper';
import {ItemsList} from '@/app/types/Item';
import { DataGrid, GridColDef, GridRowSelectionModel, GridCallbackDetails, GridRenderCellParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';


interface ItemListProps {
  items: ItemsList; // Replace `ItemsList` with the actual type of `items`
  handleSelectionChange?: Dispatch<SetStateAction<string[]>>; // Optional
  additionalCols?: GridColDef[]; // Optional
}

// Use the defined type in the function signature
export default function ItemList({ items, handleSelectionChange, additionalCols }: ItemListProps) {
  const rows = items.items.map((item) => new Object({...item , id: item._id}));

  const handleSelectionChangeModel = (selectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
    const selectedIds = selectionModel.map((id) => id.toString());
    // todo, need to either remove or do something with 'details'
    console.log("handle details");
    console.log(details);
    // todo remove the ! after changing typing to remove the option of undefined
    if (handleSelectionChange) {
      handleSelectionChange(selectedIds);
    }
  };

  // const columns: GridColDef[] = [
  const baseCols: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'item_name', headerName: 'Item name', width: 130 },
    { field: 'median_price', headerName: 'Median price', width: 130, type: 'number'},
    { field: 'volume', headerName: 'Volume sold ', width: 130, type: 'number'},
    { field: 'market_link',
      headerName: "Market Link", 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="contained" color="primary" >
          <Link href={params.row.market_link}  target="_blank">
            Warframe Market
            
          </Link>
        </Button>
      ),
    },
    { field: 'wiki_link', 
      headerName: "Wiki Link", 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="contained" color="primary" >
          <Link href={params.row.wiki_link}  target="_blank">
            WIKI

          </Link>
        </Button>
      ),
    },
  ];


  const columns: GridColDef[] = additionalCols ? baseCols.concat(additionalCols) : baseCols;



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