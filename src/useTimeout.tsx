import { useEffect } from "react";

export const useTimeout = (callback: Function, delay: number) => {
  useEffect(() => {
    const id = setTimeout(callback, delay);
    return () => clearTimeout(id);
  }, [callback, delay]);
};
