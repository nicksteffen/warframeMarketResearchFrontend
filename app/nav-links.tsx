"use client";
import React from "react";
import Link from "next/link";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { Home, Widgets, Settings, FormatListBulleted, Login} from '@mui/icons-material'; 

const links = [
    {
       order: -1,
        name: "Home",
        href: "/",
        icon: <Home/>,
    },
    {
        order: 0,
        name: "Mods",
        href: "/tracking/mods",
        icon: <Widgets/>,
    },
    {
        order: 1,
        name: "Prime Parts",
        href: "/tracking/prime-parts",
        icon: <Settings/>,
    },
    {
        order: 2,
        name: "My List!",
        href: "/tracking/my-list",
        icon: <FormatListBulleted/>,

    },
    {
       order: 3,
        name: "Login",
        href: "/login",
        icon: <Login/>,
    },

]

const NavLinks = () => {
  return (
    <>
    {links.map((link) => {
      return (
      <ListItemButton key={link.order} component={Link} href={link.href}>
        <ListItemIcon>
          {link.icon}

        </ListItemIcon>
        <ListItemText primary={link.name}/>

      </ListItemButton>
      )
    })}
    </>
  );
};

export default NavLinks;
