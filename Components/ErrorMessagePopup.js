import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorMessagePopup = (props) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      {/* <Modal.Header>
        <Modal.Title>Are You Sure ?</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>Something Went Wrong</Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>        
        <Button variant="primary" onClick={props.handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorMessagePopup;
