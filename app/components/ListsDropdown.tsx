'use client';
import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { getLists } from '@/app/actions/userActions';
import { SelectChangeEvent } from '@mui/material/Select';


interface ListsDropdownProps {
    onSelectionChange: (selectedListId : string | null) => void;
}

interface List {
    _id: string
    name: string
  }

export default function ListsDropdown({onSelectionChange}: ListsDropdownProps) {
// const ListsDropdown: React.FC<ListsDropdownProps> = ({ onSelectionChange }) => {
    const [lists, setLists] = useState<List[]>([]);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const fetchedLists = await getLists();
                console.log("fetched lists");
                console.log(fetchedLists);

                if (fetchedLists && fetchedLists.length > 0) {
                    setLists(fetchedLists);
                }
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };

        fetchLists();
    }, []);

    const handleChange = (
        // event: React.SyntheticEvent,
        event: SelectChangeEvent,
        // value : List | null,
      ) => {

    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log("handle change");
        const value = event.target.value as string;
        // const list_id = value ? value._id : null;
        // setSelectedListId(list_id);
        // onSelectionChange(list_id);
        setSelectedListId(value);
        onSelectionChange(value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="lists-dropdown-label">Select a List</InputLabel>
            <Select
                labelId="lists-dropdown-label"
                value={selectedListId || ''}
                label="Select a List"
                onChange={handleChange}
            >
                {lists.map((list) => (
                    <MenuItem key={list._id} value={list._id}>
                        {list.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

// export default ListsDropdown;