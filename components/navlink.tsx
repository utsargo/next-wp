import React from "react";
import ClientLink from "./client-link";

interface navlinkProps {
    href: string;
    linkText: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavLink = ({ href, linkText, onClick }: navlinkProps) => {
    return (
        <ClientLink href={href} activeClassName='text-slate-600 font-bold' commonClassName=" hover:text-gray-600 px-3 py-2 rounded-md text-md no-underline hover:no-underline" inactiveClassName="font-medium text-gray-800" onClick={onClick}>
              {linkText}
        </ClientLink>
    );
}

export default NavLink;