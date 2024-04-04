import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Styles from "../styles/mycustomecard.module.css";
import { formatDate } from "../helper/helper";
import { useEditTaskMutation, useDeleteTaskMutation } from "../redux/tasks";
import { useDispatch } from "react-redux";
import { visible } from "../redux/widget";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

//import ErrorMessagePopup from "./ErrorMessagePopup";
// import useErrorPopup from '../helper/useErrorPopup';

function MyCustomeCard({
  title,
  priorityValue,
  date,
  _id,
  stage,
  leftArrorDisable,
  rightArrowDisable,
  index,
  onDragEnd,
  onDragColStart,
}) {
  const [editTask, { isError: isEditError }] = useEditTaskMutation();
  const [deleteTask, { isError: isDeleteError }] = useDeleteTaskMutation();

  //const [errorPopupVisible, setErrorPopupVisible] = useErrorPopup(isEditError);

  const dispatch = useDispatch();
  const [showModal, setModalShow] = useState(false);

  const onStageChange = (val) => {
    editTask({ title, priorityValue, date, _id, stage: stage - val });
  };

  const openEditView = () => {
    dispatch(
      visible({
        flag: true,
        widgetdata: { title, priorityValue, date, _id, stage },
        mode: "EDIT",
      })
    );
  };

  const deleteEditView = () => {
    setModalShow(true);
  };

  const deleteTaskMethod = () => {
    //deleteTask({ title, priorityValue, date, _id, stage });
    deleteTask({ _id });
    setModalShow(false);
    dispatch(
      visible({
        flag: false,
        widgetdata: null,
        mode: "",
      })
    );
  };
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("title", title);
    ev.dataTransfer.setData("priorityValue", priorityValue);
    ev.dataTransfer.setData("date", date);
    onDragColStart();
  };

  return (
    <>
      {/* <Draggable key={_id} draggableId={_id} index={index}>
        {(provided) => (
          <div
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          > */}
      <Card
        bg={"light"}
        key={"Light"}
        text={"dark"}
        className="mb-2"
        draggable
        onDragStart={(e) => onDragStart(e, _id)}
        onDragEnd={onDragEnd}
      >
        <Card.Header>
          <i> {date && formatDate(new Date(date))} </i>
          <Badge
            pill
            bg={priorityValue == "High" ? "danger" : "primary"}
            className={Styles.stageStyling}
          >
            {priorityValue}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Card.Title> {title} </Card.Title>
        </Card.Body>
        <Card.Footer>
          <div className={Styles.cardFooterContainer}>
            <div className={Styles.ArrowContainer}>
              <ArrowLeftCircleIcon
                style={
                  leftArrorDisable
                    ? { opacity: "0.5", pointerEvents: "none" }
                    : {}
                }
                onClick={() => onStageChange(1)}
              />
              <ArrowRightCircleIcon
                style={
                  rightArrowDisable
                    ? { opacity: "0.5", pointerEvents: "none" }
                    : {}
                }
                onClick={() => onStageChange(-1)}
              />
            </div>

            <div className={Styles.btnContainer}>
              <Button variant="primary" size="sm" onClick={openEditView}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={deleteEditView}>
                Delete
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      {/* </div>
        )}
      </Draggable> */}

      <DeleteConfirmationModal
        show={showModal}
        handleClose={() => setModalShow(false)}
        deleteTask={() => {
          deleteTaskMethod();
        }}
      />
      {/* TO:DO */}
      {/* <ErrorMessagePopup
        show={errorPopupVisible}
        handleClose={() => setErrorPopupVisible(false)}
      /> */}
    </>
  );
}

export default MyCustomeCard;
