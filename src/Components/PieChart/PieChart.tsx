import React from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from 'const/colors';

interface IPieChart {
  series: number[];
}

const options: any = {
  chart: {
    width: 380,
    type: 'pie',
  },
  stroke: {
    width: 0.1,
    color: '#808080',
  },
  dataLabels: {
    enabled: true,
    offsetY: 120,
    style: {
      fontSize: '22px',
    },
  },
  colors: [COLORS.RED, COLORS.GRAY],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      dataLabels: {
        offset: -25,
      },
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
};

export const PieChart = (props: IPieChart) => {
  const { series } = props;
  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="280"
      height="200"
    />
  );
};
