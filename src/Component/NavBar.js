import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    makeStyles,
} from "@material-ui/core";
import {Link, useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(1),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(5),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));
//https://javascript.works-hub.com/learn/how-to-create-a-responsive-navbar-using-material-ui-and-react-router-f9a01
function Navbar(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleLogout =async()=>{
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <div className={classes.navlinks}>

                    <Link to="#" className={classes.link}>
                       Eduvate
                    </Link>
                    <Link to="/courseList" className={classes.link}>
                        CourseList
                    </Link>
                    <Link to="/profile" className={classes.link}>
                        Profile
                    </Link>

                    <Link to="/" className={classes.link} onClick={handleLogout}>
                        Logout
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;