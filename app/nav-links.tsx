"use client";
import React from "react";
import Link from "next/link";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import SideNavLinks from "./types/SideNavLinks";


const links = SideNavLinks;

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
