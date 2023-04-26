import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../types/Type"

type EditTagModalProps = {
	availableTags: Tag[]
	show: boolean
	handleClose: () => void
	onUpdateTag: (id: string, label: string) => void
	onDeleteTag: (id: string) => void
}

const EditTagModal = ({ availableTags, show, handleClose, onUpdateTag, onDeleteTag }: EditTagModalProps) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{availableTags.length > 0 ?
					<Form>
						<Stack gap={2}>
							{
								availableTags.map(tag => (
									<Row key={tag.id}>
										<Col>
											<Form.Control type="text" value={tag.label} onChange={e => onUpdateTag(tag.id, e.target.value)} />
										</Col>
										<Col xs="auto">
											<Button onClick={() => onDeleteTag(tag.id)} variant="outline-danger">&times;</Button>
										</Col>
									</Row>
								))
							}
						</Stack>
					</Form>
					: <h6>There is no tags</h6>}
			</Modal.Body>
		</Modal>
	)
}

export default EditTagModal