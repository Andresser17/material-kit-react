import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

// import { fNumber } from "src/utils/format-number";

// import Chart, { useChart } from "src/components/chart";

// ----------------------------------------------------------------------

interface Props {
  chart: {
    colors: string;
    series: [{ value: string; label: string }];
    options: object;
  };
  subheader: string;
  title: string;
}

export default function AppConversionRates({
  title,
  subheader,
  // chart,
  ...other
}: Props) {
  // const { colors, series, options } = chart;

  // const chartSeries = series.map((i) => i.value);

  // const chartOptions = useChart({
  //   colors,
  //   tooltip: {
  //     marker: { show: false },
  //     y: {
  //       formatter: (value: string) => fNumber(value),
  //       title: {
  //         formatter: () => "",
  //       },
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       barHeight: "28%",
  //       borderRadius: 2,
  //     },
  //   },
  //   xaxis: {
  //     categories: series.map((i) => i.label),
  //   },
  //   ...options,
  // });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        {/* <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        /> */}
      </Box>
    </Card>
  );
}
