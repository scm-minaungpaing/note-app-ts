import { useMemo, useState } from 'react'
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { SimplyfiedNote, Tag } from '../types/Type'
import NoteCard from './NoteCard'
import EditTagModal from './EditTagModal'

type NodeListProps = {
	availableTags: Tag[],
	notes: SimplyfiedNote[],
	updateTag: (id: string, label: string) => void
	deleteTag: (id: string) => void
}

const NoteList = ({ availableTags, notes, updateTag, deleteTag }: NodeListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState("")
	const [editTagModalIsOpen, setEditTagModalIsOpen] = useState<boolean>(false)

	const filteredNotes = useMemo(() => {
		return notes.filter(note => {
			return (
				(title === "" || note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
			)
		})
	}, [title, selectedTags, notes])

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col><h1>Notes</h1></Col>
				<Col xs="auto">
					<Stack gap={2} direction='horizontal'>
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button onClick={() => setEditTagModalIsOpen(true)} variant='outline-secondary'>Edit Tags</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className='mb-4'>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control placeholder="Enter title" type='text' value={title} onChange={e => setTitle(e.target.value)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id }
								})}
								options={availableTags.map(tag => {
									return { label: tag.label, value: tag.id }
								})}
								onChange={tags => {
									setSelectedTags(tags.map(tag => {
										return { label: tag.label, id: tag.value }
									}))
								}}
								isMulti />
						</Form.Group>
					</Col>
				</Row>
			</Form>
			{notes.length > 0 ?
				<Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
					{
						filteredNotes.map(note =>
							<Col key={note.id}>
								<NoteCard id={note.id} title={note.title} tags={note.tags} />
							</Col>
						)
					}
				</Row> : <Card>
					<Card.Body>
						<h1 className='text-center py-5'> There is no data!</h1>
					</Card.Body>
				</Card>
			}
			<EditTagModal
				show={editTagModalIsOpen}
				handleClose={() => setEditTagModalIsOpen(false)}
				availableTags={availableTags}
				onUpdateTag={updateTag}
				onDeleteTag={deleteTag}
			/>
		</>
	)
}

export default NoteList