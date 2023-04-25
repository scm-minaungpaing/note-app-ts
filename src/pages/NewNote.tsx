import NoteForm from "../components/NoteForm"
import { NoteData, Tag } from "../types/Type"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (data: Tag) => void
  availableTags: Tag[]
}

const NewNote = ({onSubmit, onAddTag, availableTags}: NewNoteProps) => {
  return (
    <>
        <div>NewNote</div>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote