// import { Link } from "react-router-dom"
import { PublicNavBar } from "../../components/Header/PublicNavBar"
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";

export const HomePage = () => {
  return (
    <div>
        <PublicNavBar/>
        <h1>HomePage</h1>
        <Button variant="contained" color="primary" component={RouterLink} to="/login">
            Login
        </Button>
        <Button variant="outlined" color="error" component={RouterLink} to="/registrar">
            Registrar
        </Button>
    </div>
  )
}
