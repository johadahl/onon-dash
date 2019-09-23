import React, { useState, useEffect } from "react";
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./../styles";

// components
import Widget from "../../../components/Widget";
import PageTitle from "../../../components/PageTitle";
import { Typography } from "../../../components/Wrappers";

// Mock-data
import {
  lineChartData, 
  surveyData,
  reasonData,
  historicalReasonData,
  currentStatusData,
  otherCarData,
  } from "./Mock";

export default function President(props) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <>
      <PageTitle title="Översikt" />
      TODO
    </>
  );
}
