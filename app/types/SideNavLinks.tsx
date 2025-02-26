import React from "react";
import { Home, Widgets, Settings, FormatListBulleted, Login} from '@mui/icons-material'; 

enum SidelinkNavOrder {
  HOME = 0,
  MODS = 1,
  PRIME_PARTS = 2,
  MY_LIST = 3,
  LOGIN = 4
}

interface SideNavLink {
  order: SidelinkNavOrder;
  name: string;
  href: string;
  icon: React.ReactNode;
}


const SideNavLinks: SideNavLink[] = [
    {
       order: SidelinkNavOrder.HOME,
        name: "Home",
        href: "/",
        icon : <Home/>,
    },
    {
        order: SidelinkNavOrder.MODS,
        name: "Mods",
        href: "/tracking/mods",
        icon: <Widgets/>,
    },
    {
        order: SidelinkNavOrder.PRIME_PARTS,
        name: "Prime Parts",
        href: "/tracking/prime-parts",
        icon: <Settings/>,
    },
    {
        order: SidelinkNavOrder.MY_LIST,
        name: "My List",
        href: "/tracking/my-list",
        icon: <FormatListBulleted/>,

    },
    {
       order: SidelinkNavOrder.LOGIN,
        name: "Login",
        href: "/login",
        icon: <Login/>,
    },

]

export default SideNavLinks;