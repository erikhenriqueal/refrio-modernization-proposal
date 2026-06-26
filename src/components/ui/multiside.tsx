import React from "react";

interface MultiSideProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  children: React.ReactNode[];
}

export function MultiSide({ className, children, ...props }: MultiSideProps) {
  return (
    <div className={`w-full grid grid-cols-2 gap-4 ${className}`} {...props}>
      {children.map((child, i) => (
        <div
          key={i}
          className={`flex items-center ${i % 2 == 0 ? "flex-row" : "flex-row-reverse text-right"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
