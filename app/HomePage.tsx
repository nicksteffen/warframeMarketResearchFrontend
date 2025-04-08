import { Box, Button, Container, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import SearchList from "./components/SearchList";

export default function HomePage() {


  return (
      <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Warframe Farming Tracker
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Research and track mods and prime parts for your Warframe farming journey.
        </Typography>

      <SearchList />

        {/* Navigation Buttons */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          <Grid>
            <Button href="/tracking/prime-parts" variant="contained" color="primary" size="large">
              Prime Parts
            </Button>
          </Grid>
          <Grid>
            <Button href="/tracking/mods" variant="contained" color="primary" size="large">
              Mods
            </Button>
          </Grid>
          <Grid>
            <Button href="/tracking/my-list" variant="contained" color="secondary" size="large">
              My List
            </Button>
          </Grid>
        </Grid>

        {/* Login Button */}
        <Box sx={{ mt: 4 }}>
          <Button href="/login" variant="outlined" color="primary">
            Login
          </Button>
        </Box>
    </Box>


  </Container>
  )
};