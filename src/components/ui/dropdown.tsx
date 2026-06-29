"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> {
  action?: string | React.ReactNode;
  setOpen?: (state: boolean) => void;
}

export function Dropdown({
  action,
  setOpen,
  className,
  children,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (setOpen) setOpen(true);
    setIsOpen(true);
  };
  const handleClose = () => {
    if (setOpen) setOpen(false);
    setIsOpen(false);
  };

  return (
    <span
      className="relative block w-max *:inline-block"
      onPointerEnter={handleOpen}
      onPointerLeave={handleClose}
    >
      {action}
      <IoIosArrowDown
        size="1.5rem"
        className={`transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-180" : ""}`}
      />
      {isOpen ? (
        <ul
          className={`absolute top-full left-0 flex flex-col ${className ?? ""}`}
          {...props}
        >
          {children}
        </ul>
      ) : null}
    </span>
  );
}
