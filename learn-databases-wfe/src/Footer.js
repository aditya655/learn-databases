import React from "react";
import {Box,Typography,useTheme} from "@material-ui/core";

function Footer(props) {
    const theme = useTheme();
    return (
        <footer style={{background: theme.palette.primary.main}}>
            <Box color={"white"}>
                <Typography>
                    Capstone Project
                </Typography>
            </Box>
        </footer>
    );
}
export default Footer;
