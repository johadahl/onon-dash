import React, { useState } from "react";
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  LinearProgress,
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
  LabelList,
  Sector,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import MUIDataTable from "mui-datatables";
import PercentageChart from "./components/PercentageChart"

// Mock-data
const lineChartData = [
  {
    name: "Okt",
    ind: 40,
    af: 60,
    all: 50,
  },
  {
    name: "Nov",
    ind: 42,
    af: 58,
    all: 51,
  },
  {
    name: "Dec",
    ind: 45,
    af: 62,
    all: 57,
  },
  {
    name: "Jan",
    ind: 66,
    af: 70,
    all: 51,
  },
  {
    name: "Feb",
    ind: 74,
    af: 65,
    all: 62,
  },
  {
    name: "Mar",
    ind: 60,
    af: 57,
    all: 76,
  },
  {
    name: "Apr",
    ind: 55,
    af: 64,
    all: 68,
  },
  {
    name: "Maj",
    ind: 65,
    af: 72,
    all: 64,
  },
  {
    name: "Jun",
    ind: 68,
    af: 76,
    all: 67,
  },
  {
    name: "Jul",
    ind: 72,
    af: 70,
    all: 77,
  },
  {
    name: "Aug",
    ind: 88,
    af: 80,
    all: 89,
  },
];

const surveyData = [
  ["Kundomhändertagandet, totalt sett?", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Mottagandet vid besöket", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Säljarens vänlighet", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Säljarens kunnande", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Förklaring av bilens egenskaper", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Förklaring av offerten", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Säljarens engagemang?", "4.38", "+", "4.15", "+", "3.82", "4.5"],
  ["Villighet att acceptera inbytet", "4.38", "+", "4.15", "+", "3.82", "4.5"],
];

const reasonData = [
  { 
    qid: 1, 
    name: "Säljaren hörde inte av sig", 
    af: 24, 
    trend: "+", 
    sve: 14, 
    color: "secondary" },
  { 
    qid: 2, 
    name: "Fann ingen produkt som tilltalade mig", 
    af: 11, 
    trend: "-", 
    sve: 16, 
    color: "warning" },
  { 
    qid: 3, 
    name: "Jag sökte endast information", 
    af: 39, 
    trend: "+", 
    sve: 40, 
    color: "success" },
  { 
    qid: 4, 
    name: "Fick bättre erbjudande från annat håll", 
    af: 27, 
    trend: "-", 
    sve: 30, 
    color: "primary" },
];

const historicalReasonData = [
  {
    month: '2018.10', a: 40, b: 24, c: 19, d:23 
  },
  {
    month: '2018.11', a: 30, b: 13, c: 22, d:12
  },
  {
    month: '2018.12', a: 20, b: 98, c: 22, d:15
  },
  {
    month: '2019.01', a: 27, b: 39, c: 20, d: 19
  },
  {
    month: '2019.02', a: 31, b: 39, c: 20, d: 19
  },
  {
    month: '2019.03', a: 36, b: 23, c: 35, d: 19
  },
  {
    month: '2019.04', a: 23, b: 54, c: 20, d: 45
  },
  {
    month: '2019.05', a: 17, b: 34, c: 65, d: 19
  },
  {
    month: '2019.06', a: 40, b: 87, c: 20, d: 45
  },
  {
    month: '2019.07', a: 36, b: 45, c: 56, d: 19
  },
  {
    month: '2019.08', a: 24, b: 65, c: 20, d: 19
  }
];

const currentStatusData = [
  {q1: 31, q2: 15, q3: 15, q4:39}
]

const otherCarData = [
  {name:"Volkswagen", value:17},
  {name:"Volvo", value:13},
  {name:"Audi", value:9},
  {name:"BMW", value:4},
  {name:"Kia", value:17},
  {name:"Skoda", value:0},
  {name:"Annat", value:39},
];

// #################################################################

// Chart settings
const surveyColumns = [{
  name: "question",
  label: "Fråga"},
  {
  name: "ind",
  label:"Individuellt"},
  {
  name:"indtrend",
  label:"Trend"},
  {
  name:"af",
  label:"Återförsäljare"},
  {
  name:"aftrend",
  label:"Trend"},
  {
  name:"sve",
  label:"Landssnitt"},
  {
  name:"top",
  label:"Top 20%"}]

const tableOptions = {
  selectableRows:'none',
  print:false,
  pagination:false,
  viewColumns:false,
  search:false,
  download:false,
  filter:false,
  elevation:0  
};

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [activeIndex, setActiveIndexId] = useState(0);
  var [mainChartState, setMainChartState] = useState("aug");    // TODO: Set automatically to current month
  var afnr = 40033
  var fname = "Rolf Thomander"

  return (
    <>
      <PageTitle title="Rolf Thomander - 44033" />
      <Grid container spacing={4}>
      
        <Grid item xs={12}>
          <Widget title="Offertuppföljning" upperTitle disableWidgetMenu>
              <Typography> 
                Andel i % som svarat ja till <i> "Efter besöket/erhållen offert, kontaktade säljaren dig för att följa upp?"</i> <br/>
                Värdena är dels kopplade till dig som säljare, dels aggregerat för alla säljare kopplat till återförsäljare {afnr}. <br/>
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
                <YAxis domain={[0, 100]}/>
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
            value={mainChartState}
            onChange={e => setMainChartState(e.target.value)}
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
            <MenuItem value="nov">Oktober</MenuItem>
            <MenuItem value="dec">Oktober</MenuItem>
          </Select>
        </Grid>
          <Grid item xs={12}>
            <Widget title="Kundfeedback" upperTitle disableWidgetMenu>
              <Typography> 
                Värdena som presenteras här är från de kunder du gav en offert till under månad X, samt aggregerat för alla säljare kopplade till ÅF nummmer {afnr}.
              </Typography>
              <MUIDataTable
                data={surveyData}
                columns={surveyColumns}
                options={tableOptions}
              />
            </Widget>
          </Grid>

          <Grid item xs={12} >
            <Widget title="Varför blev det inte en affär?" upperTitle disableWidgetMenu>
              <Typography> 
                Värdena som presenteras här är aggregerat för alla kopplade till ÅF nummmer {afnr}
              </Typography>
              
              <Grid container direction="row" alignContent="center" spacing={4}>
                
                <Grid item xs={6} align="center">
                  <PercentageChart data={historicalReasonData}/>
                </Grid>

                <Grid item xs={6}>
                  <div className={classes.pieChartLegendWrapper}>
                    <table padding="10">
                      <tr>
                        <th></th>
                        <th> Andel </th>
                        <th> Landssnitt </th>
                      </tr>
                      {reasonData.map(({ id, name, af, sve, color }, index) => (
                        <tr>
                          <td>
                            <div key={color} className={classes.legendItemContainer}>
                              <Dot color={color} size="large" />
                              <Typography style={{ whiteSpace: "nowrap" }}>
                                &nbsp;{name}&nbsp;
                              </Typography>
                            </div>
                          </td>
                          <td>
                            <Typography style={{ whiteSpace: "nowrap" }}>
                              &nbsp;{af}%
                            </Typography>
                          </td>
                          <td>
                            <Typography style={{ whiteSpace: "nowrap" }}>
                              &nbsp;{sve}%
                            </Typography>
                          </td>
                        </tr>
                      ))}
                      </table>
                  </div>
                </Grid>
              </Grid>

            </Widget>
          </Grid>
          

          <Grid item xs={6} >
            <Widget title="Kundens status" disableWidgetMenu>
              <Typography variant="textSecondary" color="textSecondary" > 
                Valfri text som beskriver innehållet och som sträcker sig över hela rutan. <br/> 
                Värdena som presenteras här är aggregerat för alla kopplade till ÅF nummmer {afnr}
              </Typography>
                <Grid container spacing={4} direction="row" justify="space-evenly" alignItems="center">
                  <Grid item>
                    <BarChart
                      width={120}
                      height={200}
                      data={currentStatusData}
                    >
                      <YAxis domain={[0, 100]} interval="preserveStartEnd" unit="%"/>
                      <Bar dataKey="q4" stackId = "x" fill={theme.palette.primary.main} />
                      <Bar dataKey="q3" stackId = "x" fill={theme.palette.success.main} />
                      <Bar dataKey="q2" stackId = "x" fill={theme.palette.warning.main} />
                      <Bar dataKey="q1" stackId = "x" fill={theme.palette.secondary.main} />
                    </BarChart>
                  </Grid>
                  <Grid item>
                    <div className={classes.legendItemContainer}>
                      <Dot color="secondary" size="large" />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        {currentStatusData[0].q1}% Avser köpa bil inom de närmaste månaderna
                      </Typography>
                    </div>
                    <br/>
                    <div className={classes.legendItemContainer}>
                      <Dot color="warning" size="large" />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        {currentStatusData[0].q2}% Inte dags ännu, samlar information
                      </Typography>
                    </div>
                    <br/>
                    <div className={classes.legendItemContainer}>
                      <Dot color="success" size="large" />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        {currentStatusData[0].q3}% Ändrade förutsättningar, köp inte aktuellt
                      </Typography>
                    </div>
                    <br/>
                    <div className={classes.legendItemContainer}>
                      <Dot color="primary" size="large" />
                      <Typography style={{ whiteSpace: "nowrap" }}>
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
                