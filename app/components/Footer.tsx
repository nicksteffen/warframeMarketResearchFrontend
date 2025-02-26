import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export default function Footer() {
    return (
        <Paper sx={{marginTop: 'calc(10% + 60px)',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            }} component="footer" square variant="outlined">
            <Box sx={{ mt: 8, py: 4, borderTop: '1px solid #ddd', textAlign: 'center' }}>
                <Typography variant="body1" component="p" gutterBottom>
                Useful Links:
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid>
                        <Button
                        href="https://warframe.market"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        color="primary"
                        >
                        Warframe Market
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                        href="https://wiki.warframe.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        color="primary"
                        >
                        Official Warframe Wiki
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}