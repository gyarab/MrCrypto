import React, { PureComponent } from "react";
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
    subject: "SMA",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "EMA",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "BOB",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "WMA",
    A: 99,
    B: 100,
    fullMark: 150
  }
];

export default class RadarMaker extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    return (
      <ResponsiveContainer width="20%" aspect={10}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
