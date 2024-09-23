import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState("online");

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnlineStatus("online");
    });
  }, []);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus("offline");
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
