"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  fetchNotes,
  deleteNote,
  type FetchNotesResponse,
} from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Modal } from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchTerm}
          onChange={(searchValue) => {
            setSearchTerm(searchValue);
            setPage(1);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 1}
            currentPage={page}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}

          
      {isLoading && <Loader />}
      {error && <ErrorMessage message="Failed to load notes." />}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      ) : (
        !isLoading && !error && <EmptyState />
      )}
    </div>
  );
}
