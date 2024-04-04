import { useSession } from "next-auth/react";
import Loader from "./Loader";
import Style from "../styles/requireAuthentication.module.css";

/*
HOC for checking component is authenticated or not 
*/
export function requireAuthentication(Component) {
  return function requireAuthentication() {
    const { data: session, status } = useSession();

    const loginErrorMessage = (
      <div className={Style.requireAuthenticationContainer}>
        Please
        <span>
          {" "}
          <a href="/signin">login</a>{" "}
        </span>{" "}
        in order to view this part of the application.
      </div>
    );

    if (status == "loading") {
      return <Loader />;
    }

    return status === "authenticated" ? (
      <Component session={session} />
    ) : (
      loginErrorMessage
    );
  };
}

export default requireAuthentication;
