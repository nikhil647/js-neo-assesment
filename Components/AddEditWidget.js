import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import React from "react";
import Styles from "../styles/AddEditWidget.module.css";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useAddTaskMutation, useEditTaskMutation } from "../redux/tasks";
import { visible } from "../redux/widget";

export default function AddEditWidget() {
  const [title, setTaskTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [priorityValue, setPriorityValue] = useState("Low");
  const [stage, setStage] = useState(0);
  const [ind, setId] = useState(null);

  const dispatch = useDispatch();
  const [addTask] = useAddTaskMutation();
  const [editTask] = useEditTaskMutation();

  const { shouldVisible, _id, widgetdata, mode } = useSelector(({ widget }) => {
    let _id = null;
    if (widget.mode == "EDIT") {
      _id = widget?.widgetdata?._id;
    }

    return {
      shouldVisible: widget.flag,
      _id: _id,
      widgetdata: widget?.widgetdata,
      mode: widget.mode,
    };
  });

  useEffect(() => {
    if (mode == "EDIT") {
      setTaskTitle(widgetdata?.title);
      setTitleError(false);
      setDate(new Date(widgetdata?.date));
      setPriorityValue(widgetdata?.priorityValue);
      setStage(widgetdata?.stage);
      setId(widgetdata?._id);
    } else {
      setTaskTitle("");
      setTitleError(false);
      setDate(new Date());
      setPriorityValue("Low");
      setStage(0);
      setId(null);
    }
  }, [mode, _id]);

  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="form-control"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      aria-label="date1"
    />
  ));

  const handleSubmit = () => {
    if (title == "") {
      setTitleError(true);
    } else {
      if (mode == "EDIT") {
        editTask({ title, date, priorityValue, stage: stage, _id: ind });
      } else {
        addTask({ title, date, priorityValue, stage: 0 });
      }
      setTaskTitle("");
      setDate(new Date());
      setPriorityValue("Low");
      dispatch(visible({ flag: false, widgetdata: null, mode: "" }));
    }
  };

  // if (shouldVisible) {
  return (
    <Row className={Styles.widgetContainer}>
      <Col md="3" xs="12" className="form-group">
        <label htmlFor="Title1">Title</label>
        <input
          type="text"
          className="form-control"
          id="Title1"
          placeholder="Add Task here"
          value={title}
          onChange={(e) => {
            setTaskTitle(e.target.value);
            setTitleError(false);
          }}
        />
        {titleError && (
          <span className={Styles.redError}> Please Enter Title </span>
        )}
      </Col>

      <Col md="3" xs="12" className="form-group">
        <label htmlFor="deadline">DeadLine date</label>
        <DatePicker
          id="deadline"
          selected={date}
          onChange={(date) => setDate(date)}
          customInput={<CustomInput />}
          dateFormat="dd/MM/yyyy"
        />
      </Col>

      <Col md="3" xs="12" className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          value={priorityValue}
          onChange={(e) => setPriorityValue(e.target.value)}
          className="form-control"
          name="priority"
          id="priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </Col>

      <Col
        md="3"
        xs="12"
        className="d-flex justify-content-center align-items-start mt-3"
      >
        <Button
          variant="primary"
          size="lg"
          className={Styles.submitBtnStyle}
          onClick={handleSubmit}
        >
          {mode == "EDIT" ? "Edit" : "Add"}
        </Button>
      </Col>
    </Row>
  );
  // }
  // return <div />;
}
// return <div />;
