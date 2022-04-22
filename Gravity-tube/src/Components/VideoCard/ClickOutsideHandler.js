import { useEffect, useRef } from "react";

export const ClickOutsideHandler = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let clickOutside = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });
  return domNode;
};
