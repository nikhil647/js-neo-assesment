import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteConfirmationModal = (props) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header>
        <Modal.Title>Are You Sure ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deleted Task Can not be recovered back</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.deleteTask}>
          Yes
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
