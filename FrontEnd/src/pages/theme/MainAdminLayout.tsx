import { Grid, Typography } from "@mui/material"
import { PublicNavBar } from "../../components/Header/PublicNavBar"

export const MainAdminLayout = ({ children }) => {
  return (
    <Grid>
      <PublicNavBar/>
      <Grid item sx={{ mx: 'auto', px: 5, pt: 5 }}>
        { children }
      </Grid>
    </Grid>
  )
}