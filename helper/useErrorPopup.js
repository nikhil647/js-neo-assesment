import { useState, useEffect } from "react";

function useErrorPopup(error) {
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);

  useEffect(() => {
    if (error?.status == "FETCH_ERROR") {
      setErrorPopupVisible(true);
    }
  }, [error]);

  return [errorPopupVisible, setErrorPopupVisible];
}

export default useErrorPopup;