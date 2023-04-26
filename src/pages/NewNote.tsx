import { Col, Row } from "react-bootstrap"
import NoteForm from "../components/NoteForm"
import { NoteData, Tag } from "../types/Type"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (data: Tag) => void
  availableTags: Tag[]
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col><h1>Notes</h1></Col>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
      </Row>
    </>
  )
}

export default NewNote