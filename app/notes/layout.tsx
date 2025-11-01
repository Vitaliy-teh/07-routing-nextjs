// import Sidebar from "@/components/SidebarNotes/SidebarNotes";
// import css from "./LayoutNotes.module.css"

// export default function NotesLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className={css.container}>
//       <Sidebar />
//       <main className={css.main}>{children}</main>
//     </div>
//   );
// }

import SidebarNotes  from "@/components/SidebarNotes/SidebarNotes";
import styles from "./LayoutNotes.module.css";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>

      <div className={styles.notesWrapper}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
