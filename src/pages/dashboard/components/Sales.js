import React, { useState, useEffect } from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
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
  surveyColumns,
  reasonColumns,
  commentColumns,
  MUItableOptions,

  lineChartData, 
  surveyData,
  reasonData,
  commentData,

  historicalReasonData,
  currentStatusData,
  otherCarData,
  reactTableProps,
  } from "./Mock";

export default function Sales(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [activeIndex, setActiveIndexId] = useState(0);
  var [currentMonth, setCurrentMonth] = useState("aug");    // TODO: Set automatically to current month

  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  return (
    <>
      <PageTitle title="Översikt" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Offertuppföljning" upperTitle disableWidgetMenu>
              <Typography> 
                Andel i % som svarat ja till <i> "Efter besöket/erhållen offert, kontaktade säljaren dig för att följa upp?"</i> <br/>
                Värdena är dels kopplade till dig som säljare, dels aggregerat för alla säljare kopplat till återförsäljare {props.user.afnr}. <br/>
                Data från de 12 senaste månaderna presenteras.
              </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width="100%"
                height={300}
                data={lineChartData}
                margin={{
                  top: 20,
                  right: 40,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} unit="%"/>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ind"
                  name="Individuellt"
                  stroke={theme.palette.info.main}
                />
                <Line
                  type="monotone"
                  dataKey="af"
                  name="Återförsäljare"
                  stroke={theme.palette.primary.main}
                />
                <Line
                  type="monotone"
                  dataKey="all"
                  name="Genomsnitt Sverige"
                  stroke={theme.palette.success.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" color="textSecondary"> 
            Period: 
          </Typography>

          <Select
            value={currentMonth}
            onChange={e => setCurrentMonth(e.target.value)}
            input={
              <OutlinedInput
                labelWidth={0}
                classes={{
                  notchedOutline: classes.mainChartSelectRoot,
                  input: classes.mainChartSelect,
                }}
              />
            }
            autoWidth
          >
            <MenuItem value="jan">Januari</MenuItem>
            <MenuItem value="feb">Februari</MenuItem>
            <MenuItem value="mar">Mars</MenuItem>
            <MenuItem value="apr">April</MenuItem>
            <MenuItem value="maj">Maj</MenuItem>
            <MenuItem value="jun">Juni</MenuItem>
            <MenuItem value="jul">Juli</MenuItem>
            <MenuItem value="aug">Augusti</MenuItem>
            <MenuItem value="sep">September</MenuItem>
            <MenuItem value="okt">Oktober</MenuItem>
            <MenuItem value="nov">November</MenuItem>
            <MenuItem value="dec">December</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Widget title="Kundfeedback" upperTitle disableWidgetMenu>
            <Typography> 
              Värdena som presenteras här är från de kunder du gav en offert till under månad X, samt aggregerat för alla säljare kopplade till ÅF nummmer {props.user.afnr}.
            </Typography>
            <ReactTable
              data = {surveyData}
              columns = {surveyColumns}
              showPagination = {false}
              defaultPageSize = {Object.keys(surveyData).length}
              sortable = {false}
              resizable = {false}
            />
          </Widget>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h5" color="textSecondary"> 
            Värdena som presenteras nedanför är aggregerat för alla säljare kopplade till ÅF nummer {props.user.data.afnr} 
          </Typography>
        </Grid>

        <Grid item xs={6} >
          <Widget title="Kommentarer" upperTitle disableWidgetMenu>
            <ReactTable
              data = {commentData}
              columns = {commentColumns}
              showPagination = {true}
              defaultPageSize = {4}
              showPageSizeOptions = {false}
              resizable = {false}

              className = '-highlight'
              previousText = 'Föregående'
              nextText = 'Nästa'
              pageText = 'Sida'
              ofText = 'av'

              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    setDialogTitle("Kommentar från " + rowInfo.original.date);
                    setDialogText(rowInfo.original.comment);
                    setOpenDialog(true);
                  }
                }
              }}
            />
          </Widget>
        </Grid>

        <Grid item xs={6} >
          <Widget title="Varför blev det inte en affär?" upperTitle disableWidgetMenu>
            <ReactTable
              data = {reasonData}
              columns = {reasonColumns}
              showPagination = {false}
              defaultPageSize = {Object.keys(reasonData).length}
              sortable = {false}
              resizable = {false}
            />
          </Widget>
        </Grid>
          
        <Grid item xs={6} margin={4}>
          <Widget title="Kundens status" disableWidgetMenu>
            <Grid container direction="row" justify="space-evenly" alignItems="center">
              <Grid item>
                <BarChart
                  width={120}
                  height={250}
                  data={currentStatusData}
                >
                  <YAxis domain={[0, 100]} interval="preserveStartEnd" unit="%"/>
                  <Bar dataKey="q4" stackId = "x" fill={theme.palette.primary.main} />
                  <Bar dataKey="q3" stackId = "x" fill={theme.palette.success.main} />
                  <Bar dataKey="q2" stackId = "x" fill={theme.palette.warning.main} />
                  <Bar dataKey="q1" stackId = "x" fill={theme.palette.secondary.main} />
                </BarChart>
              </Grid>
              <Grid item zeroMinWidth>
                <div className={classes.legendItemContainer}>
                  <Dot color="secondary" size="large" />
                  <Typography noWrap>
                    {currentStatusData[0].q1}% Avser köpa bil inom de närmaste månaderna
                  </Typography>
                </div>
                <br/>
                <div className={classes.legendItemContainer}>
                  <Dot color="warning" size="large" />
                  <Typography noWrap>
                    {currentStatusData[0].q2}% Inte dags ännu, samlar information
                  </Typography>
                </div>
                <br/>
                <div className={classes.legendItemContainer}>
                  <Dot color="success" size="large" />
                  <Typography noWrap>
                    {currentStatusData[0].q3}% Ändrade förutsättningar, köp inte aktuellt
                  </Typography>
                </div>
                <br/>
                <div className={classes.legendItemContainer}>
                  <Dot color="primary" size="large" />
                  <Typography noWrap>
                    {currentStatusData[0].q4}% Har köpt/leasat någon annan bil istället
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item xs={6}>
          <Widget title="Konkurrenter" disableWidgetMenu>
            <Typography variant="textSecondary" color="textSecondary" > 
              Av de <b> {currentStatusData[0].q4}% </b> som köpt/least någon annan bil, vad köpte/leasar de?
            </Typography>
            <div align="center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={200} height={300}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={otherCarData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill={theme.palette.primary.main}
                    dataKey="value"
                    onMouseEnter={(e, id) => setActiveIndexId(id)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Widget>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}


// ################################################################

function renderActiveShape(props) {
  var RADIAN = Math.PI / 180;
  var {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  var sin = Math.sin(-RADIAN * midAngle);
  var cos = Math.cos(-RADIAN * midAngle);
  var sx = cx + (outerRadius + 10) * cos;
  var sy = cy + (outerRadius + 10) * sin;
  var mx = cx + (outerRadius + 30) * cos;
  var my = cy + (outerRadius + 30) * sin;
  var ex = mx + (cos >= 0 ? 1 : -1) * 22;
  var ey = my;
  var textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Antal ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Andel ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}
                