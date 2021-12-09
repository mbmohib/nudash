// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';

import chartTheme from '../styles/chartTheme';

const data = [
  {
    id: 'japan',
    color: 'hsl(217, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 180,
      },
      {
        x: 'helicopter',
        y: 127,
      },
      {
        x: 'boat',
        y: 160,
      },
      {
        x: 'train',
        y: 59,
      },
      {
        x: 'subway',
        y: 61,
      },
      {
        x: 'bus',
        y: 86,
      },
      {
        x: 'car',
        y: 203,
      },
      {
        x: 'moto',
        y: 199,
      },
      {
        x: 'bicycle',
        y: 93,
      },
      {
        x: 'horse',
        y: 173,
      },
      {
        x: 'skateboard',
        y: 9,
      },
      {
        x: 'others',
        y: 255,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(206, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 81,
      },
      {
        x: 'helicopter',
        y: 91,
      },
      {
        x: 'boat',
        y: 191,
      },
      {
        x: 'train',
        y: 113,
      },
      {
        x: 'subway',
        y: 82,
      },
      {
        x: 'bus',
        y: 268,
      },
      {
        x: 'car',
        y: 105,
      },
      {
        x: 'moto',
        y: 65,
      },
      {
        x: 'bicycle',
        y: 187,
      },
      {
        x: 'horse',
        y: 65,
      },
      {
        x: 'skateboard',
        y: 261,
      },
      {
        x: 'others',
        y: 199,
      },
    ],
  },
];

export default function LineChart() {
  return (
    <ResponsiveLine
      data={data}
      theme={chartTheme}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        // orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
