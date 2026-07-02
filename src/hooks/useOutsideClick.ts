"use client";

import { useEffect } from "react";

export function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void,
) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      const clickedInside = refs.some((ref) => ref.current?.contains(target));

      if (!clickedInside) callback();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [refs, callback]);
}
