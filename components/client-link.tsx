// components/ClientLink.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';

interface ClientLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName: string;
  inactiveClassName?: string;
  commonClassName: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ClientLink = ({ href, children, activeClassName, inactiveClassName, commonClassName, onClick, ...props }: ClientLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisited(true);
    }
  }, [isActive]);

  const alterclassName = isActive ? activeClassName : visited ? inactiveClassName : '';
  const className = `${commonClassName} ${alterclassName}`;

  return (
    <Link href={href} {...props} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default ClientLink;
