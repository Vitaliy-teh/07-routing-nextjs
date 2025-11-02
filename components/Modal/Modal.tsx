// "use client";

// import { useEffect, useState, type ReactNode } from "react";
// import { createPortal } from "react-dom";
// import css from "./Modal.module.css";

// interface ModalProps {
//   children: ReactNode;
//   onClose: () => void;
// }

// export const Modal = ({ children, onClose }: ModalProps) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleEscape);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "";
//     };
//   }, [mounted, onClose]);


//   if (!mounted) return null;

//   return createPortal(
//     <div
//       className={css.backdrop}
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };



"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => setVisible(true), 10);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mounted]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`${css.backdrop} ${visible ? css.backdropVisible : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${css.modal} ${visible ? css.modalVisible : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
