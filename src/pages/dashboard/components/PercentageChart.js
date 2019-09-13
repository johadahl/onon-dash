import React from 'react';
import { useTheme } from "@material-ui/styles";

import {
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
} from 'recharts';

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 1);
};

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);
  const style = {
    padding:10,
    backgroundColor: 'white',
    display: 'inline-block',
  };
  const labels = payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${getPercent(entry.value, total)} (${entry.value}st)`}
           </li>
          ))

  return (
    <div className="customized-tooltip-content" style={style}>
      <p className="total">{`${label} (Totalt antal svar: ${total})`}</p>
      <ul className="list">
        {labels.reverse()}
      </ul>
    </div>
  );
};

export default function PercentageCharts(props) {
    var theme = useTheme();

    return (
      <>
      <AreaChart
        width={400}
        height={200}
        data={props.data}
        stackOffset="expand"
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area type="monotone" dataKey="d" stackId="1" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} />
        <Area type="monotone" dataKey="c" stackId="1" stroke={theme.palette.success.main} fill={theme.palette.success.main} />
        <Area type="monotone" dataKey="b" stackId="1" stroke={theme.palette.warning.main} fill={theme.palette.warning.main} />
        <Area type="monotone" dataKey="a" stackId="1" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} />
      </AreaChart>
    </> 
    );
}