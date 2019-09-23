import React from "react";

// Table settings
export const MUItableOptions = {
  selectableRows:'none',
  print:false,
  pagination:false,
  viewColumns:false,
  search:false,
  download:false,
  filter:false,
  elevation:0  
};

export const surveyColumns = [
  {
  Header: "Fråga",
  accessor: "question"},
  {
  Header: () => (<div style={{textAlign:"center"}}>Individuellt</div>),
  Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
  accessor: "ind",
  maxWidth: 100,
  getProps: (state, rowInfo, column) => {
    var color = rowInfo.row.ind >= rowInfo.original.top ? '#b3ff99' 
      : rowInfo.row.ind >= rowInfo.original.sve ? '#ffff80' 
      : '#ff9999';
    return {
      style: {
        background: color,
        },
      }
    }
  },
  {
  Header: () => (<div style={{textAlign:"center"}}>Trend</div>),
  Cell: row => <div style={{ textAlign: "center" }}><b>{row.value}</b></div>,
  accessor: "indtrend",
  maxWidth: 100,
  getProps: (state, rowInfo, column) => {
    return {
      style: {
        color: rowInfo && rowInfo.row.indtrend === "↗" ? '#008000' : '#cc0000',
        },
      }
    }
  },
  {
  Header: () => (<div style={{textAlign:"center"}}>ÅF</div>),
  Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
  accessor: "af",
  maxWidth: 100
  },
  {
  Header: () => (<div style={{textAlign:"center"}}>Landssnitt</div>),
  Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
  accessor: "sve",
  maxWidth: 100
  },
  {
  Header: () => (<div style={{textAlign:"center"}}>Topp 20%</div>),
  Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
  accessor: "top",
  maxWidth: 100
}];


export const commentColumns = [
  {
  Header: "",
  accessor: "comment",
  Cell: row => <div><span title={row.value}>{row.value}</span></div>
  },
  {
  Header: "Datum",
  accessor: "date",
  maxWidth: 150,
  style: {textAlign: "center"}
  }];

export const reasonColumns = [
  {
  Header: "Svar",
  accessor: "answer"
  },
  {
  Header: "ÅF",
  accessor: "af",
  Cell: row => <div>{row.value}%</div>,
  style: {textAlign: "center"},
  maxWidth: 50
  },
  {
  Header: "Trend",
  accessor: "trend",
  getProps: (state, rowInfo, column) => {
    return {
      style: {
        color: rowInfo && rowInfo.row.trend === "↗" ? '#cc0000' : '#008000',
        },
      }
    },
  style: {textAlign: "center"},
  maxWidth: 50,
  },
  {
  Header: "Landssnitt",
  accessor: "sve",
  Cell: row => <div>{row.value}%</div>,
  style: {textAlign: "center"},
  maxWidth: 80,

  },
  {
  Header: "Topp 20%",
  accessor: "top",
  Cell: row => <div>{row.value}%</div>,
  style: {textAlign: "center"},
  maxWidth: 80
}];


// #################################################################

// Mock-data
export const lineChartData = [
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

export const surveyData = [
  {
  question: "Kundomhändertagandet, totalt sett?",
  ind: 4.38,
  indtrend: "↗",
  af: 4.15,
  sve: 3.82,
  top: 4.50
  },
  {
  question: "Mottagandet vid besöket",
  ind: 4.37,
  indtrend: "↘",
  af: 4.38,
  sve: 4.38,
  top: 4.6,
  },
  {
  question: "Säljarens vänlighet",
  ind: 4.77,
  indtrend: "↗",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  },
  {
  question: "Säljarens kunnande",
  ind: 4.77,
  indtrend: "↘",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  },
  {
  question: "Förklaring av bilens egenskaper",
  ind: 4.77,
  indtrend: "↘",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  },
  {
  question: "Förklaring av offerten",
  ind: 4.77,
  indtrend: "↗",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  },
  {
  question: "Säljarens engagemang?",
  ind: 4.77,
  indtrend: "↘",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  },
  {
  question: "Villighet att acceptera inbytet",
  ind: 4.77,
  indtrend: "↗",
  af: 4.50,
  sve: 4.57,
  top: 4.70,
  }]

export const commentData = [
  {
    comment: "En vänlig kommentar som är rätt lång och utsvävande text. Denna person hade massvis att berätta.",
    date: "2019-02-01",
  },
  {
    comment: "Kort kommentar 1",
    date: "2019-04-21",
  },
  {
    comment: "Kort kommentar 2",
    date: "2019-04-22",
  },
  {
    comment: "Kort kommentar 3",
    date: "2019-04-23",
  },
  {
    comment: "Kort kommentar 4",
    date: "2019-04-24",
  },
  {
    comment: "Kort kommentar 5",
    date: "2019-04-25",
  },
  {
    comment: "Kort kommentar 6",
    date: "2019-04-26",
  },
  {
    comment: "Kort kommentar 7",
    date: "2019-04-27",
  },
  {
    comment: "Kort kommentar 8",
    date: "2019-04-28",
  },
  {
    comment: "Kort kommentar 9",
    date: "2019-04-29",
  },
  {
    comment: "Kort kommentar 10 av 10",
    date: "2019-04-30",
  },
  ];

export const reasonData = [
{
  answer: "Säljaren hörde inte av sig",
  af:24,
  trend: "↗",
  sve: 14,
  top: 15},
{
  answer: "Fann ingen produkt som tilltalade mig",
  af:11,
  trend: "↘",
  sve: 16,
  top: 13},
{
  answer: "Jag sökte endast information",
  af:39,
  trend: "↗",
  sve: 40,
  top: 35},
{
  answer: "Fick bättre erbjudande från annat håll",
  af:26,
  trend: "↘",
  sve: 30,
  top: 37},
];


export const historicalReasonData = [
  {month: '2018.10', a: 40, b: 24, c: 19, d: 23},
  {month: '2018.11', a: 30, b: 13, c: 22, d: 12},
  {month: '2018.12', a: 20, b: 98, c: 22, d: 15},
  {month: '2019.01', a: 27, b: 39, c: 20, d: 19},
  {month: '2019.02', a: 31, b: 39, c: 20, d: 19},
  {month: '2019.03', a: 36, b: 23, c: 35, d: 19},
  {month: '2019.04', a: 23, b: 54, c: 20, d: 45},
  {month: '2019.05', a: 17, b: 34, c: 65, d: 19},
  {month: '2019.06', a: 40, b: 87, c: 20, d: 45},
  {month: '2019.07', a: 36, b: 45, c: 56, d: 19},
  {month: '2019.08', a: 24, b: 65, c: 20, d: 19}
];

export const currentStatusData = [
  {q1: 31, q2: 15, q3: 15, q4:39}
]

export const otherCarData = [
  {name:"Volkswagen", value:17},
  {name:"Volvo", value:13},
  {name:"Audi", value:9},
  {name:"BMW", value:4},
  {name:"Kia", value:17},
  {name:"Skoda", value:0},
  {name:"Annat", value:39},
];
