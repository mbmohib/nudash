import { ResponsiveBar } from '@nivo/bar';

import chartTheme from '../styles/chart-theme';

const data = [
  {
    country: 'AD',
    'hot dog': 26,
    'hot dogColor': 'hsl(238, 70%, 50%)',
    burger: 198,
    burgerColor: 'hsl(234, 70%, 50%)',
    sandwich: 177,
    sandwichColor: 'hsl(229, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 79,
    'hot dogColor': 'hsl(57, 70%, 50%)',
    burger: 84,
    burgerColor: 'hsl(209, 70%, 50%)',
    sandwich: 130,
    sandwichColor: 'hsl(103, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 160,
    'hot dogColor': 'hsl(240, 70%, 50%)',
    burger: 147,
    burgerColor: 'hsl(196, 70%, 50%)',
    sandwich: 149,
    sandwichColor: 'hsl(84, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 58,
    'hot dogColor': 'hsl(78, 70%, 50%)',
    burger: 162,
    burgerColor: 'hsl(50, 70%, 50%)',
    sandwich: 30,
    sandwichColor: 'hsl(319, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 28,
    'hot dogColor': 'hsl(71, 70%, 50%)',
    burger: 54,
    burgerColor: 'hsl(69, 70%, 50%)',
    sandwich: 63,
    sandwichColor: 'hsl(343, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 149,
    'hot dogColor': 'hsl(263, 70%, 50%)',
    burger: 113,
    burgerColor: 'hsl(187, 70%, 50%)',
    sandwich: 157,
    sandwichColor: 'hsl(350, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 42,
    'hot dogColor': 'hsl(110, 70%, 50%)',
    burger: 53,
    burgerColor: 'hsl(149, 70%, 50%)',
    sandwich: 158,
    sandwichColor: 'hsl(208, 70%, 50%)',
  },
];

export default function BarChart() {
  return (
    <ResponsiveBar
      groupMode="grouped"
      data={data}
      theme={chartTheme}
      keys={['hot dog', 'burger', 'sandwich']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e => {
        return `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`;
      }}
    />
  );
}
