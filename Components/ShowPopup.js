import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";

const ShowPopup = ({ show, popupInfo, handleClose }) => {
  const router = useRouter();
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Body> {popupInfo?.msg} </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          variant="primary"
          onClick={() =>
            popupInfo.success == true ? router.push("/signin") : handleClose()
          }
        >
          {popupInfo.success == true ? "Sign In" : "Ok"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowPopup;
