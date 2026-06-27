import React from "react";

interface MultiSideProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  children: React.ReactNode[];
}

export function MultiSide({ className, children, ...props }: MultiSideProps) {
  return (
    <div
      className={`w-full grid grid-cols-[minmax(0,auto)] md:grid-cols-[repeat(2,minmax(0,auto))] md:justify-center gap-4 ${className}`}
      {...props}
    >
      {children.map((child, i) => (
        <div
          key={i}
          className={`flex items-center ${i % 2 == 0 ? "flex-row" : "ml-auto md:ml-0 flex-row-reverse text-right"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
