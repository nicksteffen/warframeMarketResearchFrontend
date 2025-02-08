//import Link from 'next/link';

"use client";
import NavLinks from '@/app/tracking/nav-links';
import React, { useState } from "react";
import { Drawer, List, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./SideNav.module.css";



export default function SideNav() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
        return;
        }
        setOpen(state);
    };
    return (
        <div className={styles.sidenav}>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} className={styles.drawer}>
                <List className={styles.drawer_list}>
                    <NavLinks/>
                </List>
            </Drawer>

        
        </div>

    )

}
