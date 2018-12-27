import * as React from "react"

export interface Theme {
  mainColor: string;
  scrollerBackgroundColor: string;
  labelFontSize: number
}

export interface Item {
  value: number;
  color: string;
}

export interface Bar {
  label?: string;
  items: Item[]
}

export interface BarChartProps {
  bars: Bar[];
  barWidth: number;
  barSpace: number;
  centerBarIndex: boolean;
  onBarSelect: (centerBarIndex: number) => void;
  selectCenterBarOnScroll: boolean;
  showScroll: boolean;
}

export declare class BarChart extends React.Component<BarChartProps, any> {}
