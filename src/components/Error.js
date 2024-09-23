import React from "react";
import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  return (
    <h2>
      {err.status + " "}:{" " + err.statusText}
    </h2>
  );
};

export default Error;
