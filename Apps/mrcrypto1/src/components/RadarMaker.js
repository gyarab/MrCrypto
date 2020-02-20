import React, { PureComponent } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    subject: 'SMA', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'WMA', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'EMA', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'TMA', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'BOB', A: 85, B: 90, fullMark: 150,
  },

];

export default class RadarMaker extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

   render() {
     return (
       <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
         <PolarGrid />
         <PolarAngleAxis dataKey="subject" />
         <PolarRadiusAxis />
         <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
       </RadarChart>
     );
   }
}
