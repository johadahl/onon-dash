import React, { useState } from "react";
import {
  Grid,
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
    name: "Fann ingen produkt som tilltalade mig", 
    af: 24, 
    trend: "+", 
    sve: 14, 
    color: "warning" },
  { 
    qid: 2, 
    name: "Säljaren hörde inte av sig", 
    af: 11, 
    trend: "-", 
    sve: 16, 
    color: "secondary" },
  { 
    qid: 3, 
    name: "Jag sökte endast information", 
    af: 39, 
    trend: "+", 
    sve: 40, 
    color: "primary" },
  { 
    qid: 4, 
    name: "Fick bättre erbjudande från annat håll", 
    af: 27, 
    trend: "-", 
    sve: 30, 
    color: "success" },
];

const alternativeData = [
  {name:"Volkswagen", value:17},
  {name:"Volvo", value:13},
  {name:"Audi", value:9},
  {name:"BMW", value:4},
  {name:"Kia", value:17},
  {name:"Skoda", value:0},
  {name:"Annat", value:39},
];

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


  return (
    <>
      <PageTitle title="Mia Pettersson - 44033" button="Senaste Rapporten" />
      <Grid container spacing={4}>
      
        <Grid item xs={12}>
          <Widget title="Offertuppföljning" upperTitle disableWidgetMenu>
              <Typography> 
                Andel som svarat ja till <i> "Efter besöket/erhållen offert, kontaktade säljaren dig för att följa upp?"</i>
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
                  stroke={theme.palette.warning.main}
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

        <Grid item xs={12}>
          <Widget title="Kundfeedback" upperTitle disableWidgetMenu>
            <Typography> 
              Valfri text som beskriver resultatet och hur det ska tolkas
            </Typography>
            <MUIDataTable
              data={surveyData}
              columns={surveyColumns}
              options={tableOptions}
            />
          </Widget>
        </Grid>

        <Grid item xs={6} >
          <Widget title="Varför blev det inte en affär?" upperTitle disableWidgetMenu>
            <Typography> 
              Valfri text som beskriver resultatet och hur det ska tolkas.
            </Typography>
            <br/>
              <Grid container direction="column" alignContent="center" spacing={4}>
                
                <Grid item xs={6}>
                  <ResponsiveContainer width="100%" height={144}>
                    <PieChart margin={{ left: theme.spacing(2) }}>
                      <Pie
                        data={reasonData}
                        innerRadius={40}
                        outerRadius={70}
                        dataKey="af"
                      >
                        {reasonData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={theme.palette[entry.color].main}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>

                <Grid item xs={6}>
                  <div className={classes.pieChartLegendWrapper}>
                    <table padding-right="10">
                      <tr>
                        <th></th>
                        <th> Andel </th>
                        <th> Trend </th>
                        <th> Landssnitt </th>
                      </tr>
                      {reasonData.map(({ id, name, af, trend, sve, color }, index) => (
                        <tr>
                          <td>
                            <div key={color} className={classes.legendItemContainer}>
                              <Dot color={color} />
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
                              &nbsp;{trend}
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
        

        <Grid item xs={6} spacing={4}>
          <Widget title="Andel som har köpt/leasat någon annan bil istället:" upperTitle disableWidgetMenu>
            <Typography variant="h1" color="warning" className={classes.text} align="center"> 
              39%
            </Typography>
            <br/>
            <Typography variant="h5" color="textSecondary"> 
              Vad köpte de istället?
            </Typography>
            <div align="center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={200} height={300}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={alternativeData}
                    cx={200}
                    cy={150}
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
                