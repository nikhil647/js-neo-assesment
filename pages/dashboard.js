import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddEditWidget from "../Components/AddEditWidget";
import CountContainer from "../Components/CountContainer";
import AllTaskContainer from "../Components/AllTaskContainer";
import { useGetTasksQuery } from "../redux/tasks";
import useErrorPopup from "../helper/useErrorPopup";

import Styles from "../styles/dashboard.module.css";
import Loader from "../Components/Loader";
import ErrorMessagePopup from "../Components/ErrorMessagePopup";
import requireAuthentication from "../Components/requireAuthentication";

/**
 *
 * Main Dashboard Page
 */

function Dashboard({ session }) {
  const { data, error, isFetching, isLoading, status } = useGetTasksQuery();
  const [errorPopupVisible, setErrorPopupVisible] = useErrorPopup(error);

  return (
    <>
      {isFetching && <Loader />}
      <Container fluid="sm">
        <Row className={Styles.countContainer}>
          <CountContainer data={data} />
        </Row>

        <AddEditWidget />

        <Row className={Styles.taskContainer}>
          <AllTaskContainer taskList={data} />
        </Row>
      </Container>
      <ErrorMessagePopup
        show={errorPopupVisible}
        handleClose={() => setErrorPopupVisible(false)}
      />
    </>
  );
}

export default Dashboard;
// requireAuthentication
