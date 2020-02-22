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
    subject: 'SMA', A: 100-38.589, B: 100, fullMark: 100,
  },
  {
    subject: 'BOB', A: 100-32.984, B: 100, fullMark: 100,
  },
  {
    subject: 'EMA', A: 100-29.155, B: 100, fullMark: 100,
  },
  {
    subject: 'TMA', A:100-40.257, B: 100, fullMark: 100,
  },
  {
    subject: 'WMA', A:100-29.797, B: 100, fullMark: 100,
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
