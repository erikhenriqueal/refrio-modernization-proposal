"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> {
  action?: string | React.ReactNode;
  onOpen?: (state: boolean) => void;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function Dropdown({
  action,
  onOpen,
  className,
  containerRef: container,
  children,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<NodeJS.Timeout>(null);

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (triggerRef.current) {
      const { left, bottom } = triggerRef.current.getBoundingClientRect();
      setCoords({ x: left, y: bottom });
    }
    setIsOpen(true);
    onOpen?.(true);
  };
  const close = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      onOpen?.(false);
    }, 80);
  }, [onOpen]);

  // Automatically close dropdown clicking outside it
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [triggerRef, close]);

  return (
    <span
      ref={triggerRef}
      className="relative block w-max *:inline-block"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        open();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        close();
      }}
      onClick={() => {
        if (isOpen) close();
        else open();
      }}
    >
      {action}
      <IoIosArrowDown
        size="1.5rem"
        className={`transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-180" : ""}`}
      />
      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <ul
              className={`absolute top-full left-0 flex flex-col ${className ?? ""}`}
              style={{ top: coords.y, left: coords.x }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                open();
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                close();
              }}
              {...props}
            >
              {children}
            </ul>,
            container?.current ?? document.body,
          )
        : null}
    </span>
  );
}
