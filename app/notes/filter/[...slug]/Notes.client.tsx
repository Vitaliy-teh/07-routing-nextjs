'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotes } from '@/lib/api';
import { Tag } from '@/types/note';
import css from './page.module.css';

interface NotesClientProps {
  tag: Tag | string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', { searchText, currentPage, tag }],
    queryFn: () => fetchNotes({ searchText, page: currentPage, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchText(newQuery);
  }, 300);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox value={searchText} onSearch={changeSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              />
            )}
            <button className={css.button} onClick={toggleModal}>
              Create note +
            </button>
          </header>

          {isModalOpen && (
            <Modal onClose={toggleModal}>
              <NoteForm onClose={toggleModal} />
            </Modal>
          )}
          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}