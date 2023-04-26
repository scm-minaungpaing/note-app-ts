import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from 'react-router-dom'
import NewNote from "./pages/NewNote"
import { NoteData, RawNote, Tag } from "./types/Type"
import { useLocalStorage } from "./hooks"
import { useMemo } from "react"
import { v4 as uuid } from 'uuid'
import NoteList from "./components/NoteList"
import { NoteLayout } from "./components/NoteLayout"
import { Note } from "./components/Note"
import EditNote from "./pages/EditNote"

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuid(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, id: uuid(), tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  return (
    <Container className="py-3">
      <Routes>
        <Route path="/" element={
          <NoteList
            notes={notesWithTags}
            availableTags={tags}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />} />
        <Route path="/new" element={
          <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
        } />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={
            <EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}


export default App