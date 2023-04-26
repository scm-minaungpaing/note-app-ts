import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import { NoteData, Tag } from "../types/Type";
import { v4 as uuid } from "uuid";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
} & Partial<NoteData>

function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) {
	const Navigate = useNavigate()

	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags
		})
		Navigate('..')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control placeholder="Enter title..." ref={titleRef} required defaultValue={title} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableSelect
								onCreateOption={label => {
									const newTag = { id: uuid(), label }
									onAddTag(newTag)
									setSelectedTags(prev => [...prev, newTag])
								}}
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
				<Form.Group controlId="markdown">
					<Form.Label>Body ( with markdown syntax )</Form.Label>
					<Form.Control ref={markdownRef} required as="textarea" rows={15} defaultValue={markdown} />
				</Form.Group>
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-secondary">Cancel</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}

export default NoteForm