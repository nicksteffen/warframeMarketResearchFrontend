"use client";
import React, { useState, useCallback, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Item, ItemsList } from '@/app/types/Item';
import { Box, Button, ListItem } from '@mui/material';
import { getAllItems } from '../actions/userActions';

interface ItemSelectorProps  {
  onButtonClick: (itemId: string) => void;
  // input_options?: ItemsList ;
  // list_id?: string;
}

export default function ItemSelector({ onButtonClick } : ItemSelectorProps) {
  const emptyItems: ItemsList = {items: []};
  const [item, setItem] = useState< Item | null>(null);
  const [allItems, setAllItems] = useState <ItemsList | null>(emptyItems);

  // todo input options remains for now, so that if we want to filter lists at some point, we can
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

  }, [onButtonClick]);

  const onClick = useCallback(() => {
    handleAddItem(item);
  }, [handleAddItem, item]);


  const getInputOptions = useCallback(async () => {
    const emptyItems: ItemsList = {items: []};
    const all_items = await getAllItems();
    if (all_items) {
      setAllItems(all_items);
    } else {
      setAllItems(emptyItems)
    }

  }, [])

  useEffect(() => {
    getInputOptions();
  }, [getInputOptions]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Autocomplete
      autoComplete={true}
      value={item}
      // options={input_options.items}
      options={allItems ? allItems.items : []}
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