import PropTypes from 'prop-types';
import GaugeComponent from 'react-gauge-component';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

// import { fNumber } from 'src/utils/format-number';

// import { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

// const CHART_HEIGHT = 400;

// const LEGEND_HEIGHT = 72;

// const StyledChart = styled(PieChart)(({ theme }) => ({
//   '& .MuiPieArc-root': {
//     fill: 'red !important',
//     height: `100% !important`,
//     stroke: 'red !important',
//   },
//   // '& .apexcharts-legend': {
//   //   height: LEGEND_HEIGHT,
//   //   borderTop: `dashed 1px ${theme.palette.divider}`,
//   //   top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
//   // },
// }));

// ----------------------------------------------------------------------

export default function AppCurrentVisits({ title, subheader, ...other }) {
  const theme = useTheme();

  // const { colors, series, options } = chart;

  // const chartSeries = series.map((i) => i.value);

  /*   const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: false,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      // colors: [theme.palette.background.paper],
      colors: 'none',
      lineCap: 'but',
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -110,
        endAngle: 110,
      },
      track: {
        background: '#333',
        startAngle: -110,
        endAngle: 110,
      },
      dataLabels: {
        total: {
          show: false,
        },
      },
      // pie: {
      //   donut: {
      //     labels: {
      //       show: false,
      //     },
      //   },
      // },
    },
    ...options,
  }); */

  const formatLabel = (value) => `${value} ºC`;

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      <GaugeComponent
        arc={{
          nbSubArcs: 150,
          colorArray: [
            theme.palette.success.light,
            theme.palette.warning.light,
            theme.palette.error.main,
          ],
          width: 0.3,
        }}
        labels={{
          valueLabel: {
            fontSize: 40,
            formatTextValue: formatLabel,
            style: {
              fill: 'red'
            }
          },
          tickLabels: {
            type: 'outer',
            defaultTickValueConfig: {
              formatTextValue: formatLabel,
            },
            ticks: [
              { value: 10 },
              { value: 20 },
              { value: 30 },
              { value: 40 },
              { value: 50 },
              { value: 60 },
              { value: 70 },
              { value: 80 },
              { value: 90 },
              { value: 100 },
            ],
          },
        }}
        value={40}
        maxValue={100}
      />
    </Card>
  );
}

AppCurrentVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
