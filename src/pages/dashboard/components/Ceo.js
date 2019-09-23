import React, { useState, useEffect } from "react";
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Sector,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./../styles";

// components
import Widget from "../../../components/Widget";
import PageTitle from "../../../components/PageTitle";
import { Typography } from "../../../components/Wrappers";
import Dot from "../../../components/Sidebar/components/Dot";
import MUIDataTable from "mui-datatables";
import PercentageChart from "./../components/PercentageChart"

// Mock-data
import {
  lineChartData, 
  surveyData,
  reasonData,
  historicalReasonData,
  currentStatusData,
  otherCarData,
  } from "./Mock";

export default function Ceo(props) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <>
      <PageTitle title="Översikt" />
      TODO
    </>
  );
}
                