// import React from "react";

// export default function FilterLayout({
//   children,
//   sidebar,
// }: {
//   children: React.ReactNode;
//   sidebar: React.ReactNode;
// }) {
//   return (
//     <div>
//       <aside>{sidebar}</aside>
//       <main>{children}</main>
//     </div>
//   );
// }



import React from "react";
import css from "./LayoutNotes.module.css"

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}