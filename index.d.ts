import React from 'react'

export interface Theme {
  mainColor: string;
  scrollerBackgroundColor: string;
  labelFontSize: number;
}

export interface Item {
  value: number;
  color: string;
}

export interface Bar {
  label?: string;
  text?: string;
  items: Item[]
}

export interface BarChartProps {
  bars: Bar[];
  barWidth: number;
  barSpace: number;
  centerBarIndex: number;
  onBarSelect: (centerBarIndex: number) => void;
  selectCenterBarOnScroll: boolean;
  showScroll: boolean;
  theme: Theme;
}

export declare class BarChart extends React.Component<BarChartProps, any> {}