import { useEffect, useRef, useState } from "react";

import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function useOutsideAlerter(ref: any, close: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        close(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
function DropDown({ button, list }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);
  return (
    <div className={styles.dropDown}>
      <div className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {button()}
      </div>
      {isOpen && (
        <div className={styles.list} ref={wrapperRef}>
          {list()}
        </div>
      )}
    </div>
  );
}

export { DropDown };
