import { Grid, Typography } from "@mui/material"

export const MainLayout = ({ children }) => {
  return (
    <Grid
    container
    // spacion={ 0 }
    // direction="column"
    alignItems="center"
    // justifyContent="center"
    // sx={{ minHeight: '100vh', backgroundColor: 'primary.main', pt: 4 }}
   >
    <Grid item>
      { children }
    </Grid>
  </Grid>

  )
}
