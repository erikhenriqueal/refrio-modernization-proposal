import React from "react";

const BASE =
  "inline-block p-2 border-2 shadow-md shadow-primary-900/35 cursor-pointer outline-none ";

const VARIANTS = {
  primary:
    BASE +
    "transition-colors ease-in-out duration-200 " +
    "bg-primary-500 border-primary-400 text-neutral-50 " +
    "hover:bg-primary-600 hover:border-primary-500 hover:text-neutral-100 " +
    "active:*:scale-95",
  // Same as navbar language selector
  secondary:
    BASE +
    "transition-colors ease-in-out duration-100 " +
    "bg-neutral-50 border-primary-100 " +
    "hover:bg-primary-100 hover:border-primary-100 " +
    "active:*:scale-95",
  // Same as navbar achors
  underline:
    "relative p-2 " +
    "transition-colors duration-200 ease-out " +
    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2] after:origin-left after:scale-x-0 after:bg-primary-600 " +
    "after:transition after:duration-200 after:ease-out " +
    "hover:text-primary-600 hover:after:scale-x-100 ",
};

const SHAPES = {
  roundy: "rounded-full",
  square: "aspect-square",
};

interface VariantProps {
  variant: keyof typeof VARIANTS;
  shapes?: (keyof typeof SHAPES)[];
}

type ButtonProps = VariantProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export function Button({
  variant,
  shapes,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${VARIANTS[variant]} ${shapes?.map((s) => SHAPES[s]).join(" ")} ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

type AnchorProps = VariantProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Anchor({
  variant,
  shapes,
  href,
  className,
  children,
  ...props
}: AnchorProps) {
  return (
    <a
      href={href}
      className={`${VARIANTS[variant]} ${shapes?.map((s) => SHAPES[s]).join(" ")} ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
