import React from "react";
import { Home, Widgets, Settings, FormatListBulleted, Login, AutoAwesome} from '@mui/icons-material'; 

enum SidelinkNavOrder {
  HOME = 0,
  MODS = 1,
  PRIME_PARTS = 2,
  ARCANES = 3,
  LOGIN = 4,
  MY_LISTS = 5,
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
        order: SidelinkNavOrder.ARCANES,
        name: "Arcanes",
        href: "/tracking/arcanes",
        icon: <AutoAwesome/>,
    },
    {
       order: SidelinkNavOrder.LOGIN,
        name: "Login",
        href: "/login",
        icon: <Login/>,
    },
    {
       order: SidelinkNavOrder.MY_LISTS,
       name: "My Lists",
       href: "/lists",
       icon: <FormatListBulleted/>,
    },

]

export default SideNavLinks;