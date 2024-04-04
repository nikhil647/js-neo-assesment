import React from "react";
import Styles from "../styles/loader.module.css";

function Loader() {
  return (
    <div className={Styles.loaderContainer}>
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );
}

export default Loader;
