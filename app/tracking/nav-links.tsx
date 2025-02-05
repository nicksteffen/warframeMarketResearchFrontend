import { FormatListBulleted } from '@mui/icons-material';
import Icon from '@mui/material/Icon';

const links = [
    {
        name: "Mods",
        href: "/tracking/mods",
        // icon: AdjustmentsHorizontalIcon
        icon: FormatListBulleted
    },
    {
        name: "Prime Parts",
        href: "/tracking/prime-parts",
        // icon: PuzzlePieceIcon
        icon: FormatListBulleted
    },
    {
        name: "My List",
        href: "/tracking/my-list",
        icon: FormatListBulleted

    }
]


export default function NavLinks() {
    return (
      <>
        {links.map((link) => {
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              {/* <LinkIcon className="w-6" /> */}
              <FormatListBulleted></FormatListBulleted>
              <p className="hidden md:block">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }