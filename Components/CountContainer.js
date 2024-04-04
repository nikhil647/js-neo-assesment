import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Styles from "../styles/countContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { visible } from "../redux/widget";

export default function CountContainer({ data }) {
  const dispatch = useDispatch();

  const { shouldVisible } = useSelector(({ widget }) => {
    return {
      shouldVisible: widget.flag,
    };
  });

  const totalCount = data?.length;
  const totalComplete = data?.filter((cardData) => cardData.stage == 3).length;
  const totalPending = totalCount - totalComplete;

  return (
    <>
      <Col md="3" xs="12">
        <strong> Total Count: {totalCount} </strong>
      </Col>
      <Col md="3" xs="12">
        <strong> Total Completed: {totalComplete} </strong>
      </Col>
      <Col md="3" xs="12">
        <strong> Total Pending: {totalPending}</strong>
      </Col>
      <Col
        md="3"
        xs="12"
        className="d-flex justify-content-center align-items-center"
      >
        <Button
          variant="primary"
          size="md"
          name="buttonAdd"
          aria-label="button3"
          disabled={shouldVisible}
          className={Styles.btnAdd}
          onClick={() => {
            //Add action call
            dispatch(visible({ flag: true, widgetdata: null, mode: "ADD" }));
          }}
        >
          <PlusCircleIcon /> Add Task
        </Button>
      </Col>
    </>
  );
}
