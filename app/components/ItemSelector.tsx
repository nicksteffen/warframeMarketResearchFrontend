"use client";
import React, { useState, useCallback} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Item, ItemsList } from '@/app/types/Item';
import { addItemsToUserList } from '../actions/userActions';
import { Box, Button, ListItem } from '@mui/material';

interface ItemSelectorProps  {
  onButtonClick: (itemId: string) => void;
  input_options: ItemsList
}

export default function ItemSelector({ input_options, onButtonClick } : ItemSelectorProps) {
  // {input_options: ItemsList} ) {
  const [item, setItem] = useState< Item | null>(null);

  const handleChange = (
    event: React.SyntheticEvent,
    newItem : Item | null,
  ) => {
    setItem(newItem);
  }

  const handleAddItem = useCallback(async (selectedItem: Item | null) => {
    if (!selectedItem) {
      console.error('No item selected');
      return;
    }
    console.log("Adding item id");
    console.log(selectedItem._id);
    onButtonClick(selectedItem._id);
    // try {
    //   await addItemsToUserList([selectedItem._id]);
    // } catch (error) {
    //   console.error('Failed to add item:', error);
    // }
  }, []);

  const onClick = useCallback(() => {
    handleAddItem(item);
  }, [handleAddItem, item]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Autocomplete
      autoComplete={true}
      value={item}
      options={input_options.items}
      getOptionLabel={(item) => item.item_name}
        sx={{ width: 300 }}
      onChange={handleChange}
      renderOption={(props, option) => (
        <ListItem {...props} key={option._id}>{option.item_name}</ListItem>
      )}
      renderInput={(params) => <TextField {...params} label="Choose an option" />}
    />
      <Button
      variant="contained"
      onClick={onClick}
        disabled={!item}
      sx={{
          ml: 0,
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
          '&.Mui-disabled': {
            bgcolor: 'grey.400',
          },
          height: 56,
          minWidth: 100,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
      }}
    >
      Add Item
    </Button>
    </Box>
  );
}