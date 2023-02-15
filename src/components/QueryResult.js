import React from "react";
import { CircularProgress } from "@material-ui/core";

const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <p>Nothing to show...</p>;
  }

  if (data) {
    return children;
  }
};

export default QueryResult;
