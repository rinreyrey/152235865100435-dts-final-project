import * as React from "react";
import { Button,Link,Card,Grid, Typography } from "@mui/material";
import Copyright from "./Copyright";

export default function Footer() {
    return (
        <>
        <Card className="footer">
            <Copyright sx={{ mt: 1 }}/>
        </Card>
        </>
    );
}