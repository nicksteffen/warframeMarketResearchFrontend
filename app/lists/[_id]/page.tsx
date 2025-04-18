import { Typography, Box } from '@mui/material';
import ListManager from '@/app/components/ListManager';
import { getList, getUserListItems } from '@/app/actions/userActions';
import { UserList } from '@/app/types/UserList';
import { ItemsList } from '@/app/types/Item';



export default async function ListPage({ params }: {params: Promise<{_id : string}>} ) {
  const _id = (await params)._id;
  // Fetch the UserList
  console.log(`id is ${_id}`);
  const userList : UserList | null = await getList(_id);
  if (!userList) {
    return (
      <Typography variant="h6" color="error">
        List not found
      </Typography>
    );
  }

  // Fetch the Items using item_ids
  console.log("userlist")
  console.log(userList)
//   const itemsList = await getUserListItems(userList.item_ids);
// todo, need to figure out how to make the items object come back in a way that matches UserList
// todo ... this might mean that the JS and PYTHON models just need to match
  const itemsList : ItemsList | null = await getUserListItems(userList.items);
  // const itemsList : ItemsList | null = await getUserListItems(userList.item_ids);
  console.log("itemsList is returned as");
  console.log(itemsList)
  if (!itemsList?.items) {
    return (
      <Typography variant="h6" color="error">
        
        No items found in this list
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {userList.name}
      </Typography>
      <ListManager list_id={_id} grid_items={itemsList} />
    </Box>
  );
}