import { Button, Col, Row } from 'react-bootstrap'
import NotesTable from '../components/Notes/NotesTable';
import { useState } from 'react';
import NotesModal from '../components/Notes/NoteModal';

const Notes = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Col xs={12} md={10} className="mx-auto p-3 mb-5 mt-5">
        <Row className='my-5'>
          <Col className='text-end'>
            <h4 className='text-primary'>My Notes</h4>
          </Col>
          <Col xs={3} className="col text-end">
            <Button variant="primary" onClick={handleShow}>
              Add Note
            </Button>
          </Col>
        </Row >

        <Row>
          <NotesTable />
        </Row>
      </Col>

      <NotesModal show={show} handleOpen={handleShow} handleClose={handleClose} />
    </>
  );
}

export default Notes;