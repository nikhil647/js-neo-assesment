import Col from "react-bootstrap/Col";
import Styles from "../styles/alltaskcontainer.module.css";
import MyCustomeCard from "./MyCustomeCard";
import React, { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDeleteTaskMutation, useEditTaskMutation } from "../redux/tasks";
import { XCircleIcon } from "@heroicons/react/24/solid";

function renderCustomeCard(
  cardData,
  leftArrorDisable,
  rightArrowDisable,
  index,
  onDragEnd,
  onDragColStart
) {
  return (
    <MyCustomeCard
      title={cardData.title}
      priorityValue={cardData.priorityValue}
      stage={cardData.stage}
      date={cardData.date}
      _id={cardData._id}
      leftArrorDisable={leftArrorDisable}
      rightArrowDisable={rightArrowDisable}
      index={index}
      onDragEnd={onDragEnd}
      onDragColStart={onDragColStart}
    />
  );
}

function AllTaskContainer({ taskList }) {
  const [showModal, setModalShow] = useState(false);
  const [deleteTask, { isError: isDeleteError }] = useDeleteTaskMutation();
  const [editTask, { isError: isEditError }] = useEditTaskMutation();
  const [deleteId, setDeleteID] = useState(null);
  const [deleteWindowVisible, setDeleteWindowVisible] = useState(false);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    setDeleteID(id);
    setModalShow(true);
  };

  const onDropColumn = (ev, stage) => {
    const id = ev.dataTransfer.getData("id");
    const title = ev.dataTransfer.getData("title");
    const priorityValue = ev.dataTransfer.getData("priorityValue");
    const date = ev.dataTransfer.getData("date");

    editTask({ title, date, priorityValue, stage: stage, _id: id });
  };

  const onDragEnd = (e) => {
    setDeleteWindowVisible(false);
  };
  const onDragColStart = () => {
    setDeleteWindowVisible(true);
  };

  return (
    <>
      <div
        className="col-lg-3 col-md-6 col-12"
        onDrop={(e) => onDropColumn(e, "0")}
        onDragOverCapture={(e) => onDragOver(e)}
      >
        <h4> Backlog </h4>
        {React.Children.toArray(
          taskList
            ?.filter((cardData) => cardData.stage == 0)
            ?.map((cardData, index) =>
              renderCustomeCard(
                cardData,
                true,
                false,
                index,
                onDragEnd,
                onDragColStart
              )
            )
        )}
      </div>

      <div
        className="col-lg-3 col-md-6 col-12"
        onDrop={(e) => onDropColumn(e, "1")}
        onDragOverCapture={(e) => onDragOver(e)}
      >
        <h4> To Do </h4>
        {React.Children.toArray(
          taskList
            ?.filter((cardData) => cardData.stage == 1)
            ?.map((cardData, index) =>
              renderCustomeCard(
                cardData,
                false,
                false,
                index,
                onDragEnd,
                onDragColStart
              )
            )
        )}
      </div>

      <div
        className="col-lg-3 col-md-6 col-12"
        onDrop={(e) => onDropColumn(e, "2")}
        onDragOverCapture={(e) => onDragOver(e)}
      >
        <h4> On Going </h4>
        {React.Children.toArray(
          taskList
            ?.filter((cardData) => cardData.stage == 2)
            ?.map((cardData, index) =>
              renderCustomeCard(
                cardData,
                false,
                false,
                index,
                onDragEnd,
                onDragColStart
              )
            )
        )}
      </div>

      <div
        className="col-lg-3 col-md-6 col-12"
        onDrop={(e) => onDropColumn(e, "3")}
        onDragOverCapture={(e) => onDragOver(e)}
      >
        <h4> Done </h4>
        {React.Children.toArray(
          taskList
            ?.filter((cardData) => cardData.stage == 3)
            ?.map((cardData, index) =>
              renderCustomeCard(
                cardData,
                false,
                true,
                index,
                onDragEnd,
                onDragColStart
              )
            )
        )}
      </div>

      {deleteWindowVisible && (
        <div
          onDrop={(e) => onDrop(e, "complete")}
          onDragOverCapture={(e) => onDragOver(e)}
          className={Styles.recycleBin}
        >
          <XCircleIcon />
        </div>
      )}

      <DeleteConfirmationModal
        show={showModal}
        handleClose={() => setModalShow(false)}
        deleteTask={() => {
          deleteTask({ _id: deleteId });
          setModalShow(false);
        }}
      />
    </>
  );
}

export default React.memo(AllTaskContainer);
