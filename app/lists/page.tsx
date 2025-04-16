'use client'
import { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material'
import { Delete, ArrowForward } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { getLists, createList, deleteList } from '@/app/actions/userActions'
import Grid from '@mui/material/Grid2';

interface List {
  _id: string
  name: string
}

export default function ListsPage() {
  const [lists, setLists] = useState<List[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newListName, setNewListName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchLists = async () => {
      const fetchedLists = await getLists()
      if (fetchedLists) setLists(fetchedLists)
    }
    fetchLists()
  }, [])

  const handleCreateList = async () => {
    const createdList = await createList(newListName)
    if (createdList) {
      setLists([...lists, createdList])
      setNewListName('')
      setOpenDialog(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <Typography variant="h4">My Lists</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Create New List
        </Button>
      </div>

      <Grid container spacing={3}>
        {lists.map((list) => (
          <Grid size={{xs:12, sm:6, md:4}} key={list._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {list.name}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton 
                    color="error"
                    onClick={async () => {
                      const success = await deleteList(list._id)
                      if (success) {
                        setLists(lists.filter(l => l._id !== list._id))
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => router.push(`/lists/${list._id}`)}
                    // onClick={() => {
                        // console.log(list);
                        // console.log(list._id);
                    // }}
                  >
                    <ArrowForward />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateList}
            disabled={!newListName.trim()}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}