// import { FormatListBulleted } from '@mui/icons-material';
//import Icon from '@mui/material/Icon';






// export default function NavLinks() {
//     return (
//       <>
//         {links.map((link) => {
//           return (
//             <a
//               key={link.name}
//               href={link.href}
//               className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//             >
//               {/* <LinkIcon className="w-6" /> */}
//               <FormatListBulleted></FormatListBulleted>
//               <p className="hidden md:block">{link.name}</p>
//             </a>
//           );
//         })}
//       </>
//     );
  // }

"use client";
import React from "react";
import Link from "next/link";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import {Widgets, Settings, FormatListBulleted} from '@mui/icons-material'; 

const links = [
    {
        order: 0,
        name: "Mods",
        href: "/tracking/mods",
        icon: <Widgets/>,
        // icon: AdjustmentsHorizontalIcon
    },
    {
        order: 1,
        name: "Prime Parts",
        href: "/tracking/prime-parts",
        icon: <Settings/>,
        // icon: PuzzlePieceIcon
    },
    {
        order: 2,
        name: "My List",
        href: "/tracking/my-list",
        icon: <FormatListBulleted/>,

    }
]

const NavLinks = () => {
  return (
    // <div className={styles.nav_links}>

      
    // </div>
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
