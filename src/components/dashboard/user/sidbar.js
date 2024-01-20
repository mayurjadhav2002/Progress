import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SidebarNav({ className, items, ...props }) {
  const location = useLocation();

  return (
    <nav
      className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 ${className}`}
      {...props}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={`justify-start  px-2 py-1 ${
            location.pathname === item.href
              ? 'bg-muted hover:bg-muted  rounded-md'
              : 'hover:bg-transparent hover:underline'
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default SidebarNav;
