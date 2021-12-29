import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import {
  AreaChart,
  BarChart,
  PageHeader,
  PageLayout,
  PreLoader,
  ProductStats,
} from 'components';

import downloadGraphImage from '../assets/images/downloads-graph.png';
import downloadImage from '../assets/images/downloads.png';
import operationGraphImage from '../assets/images/operation-graph.png';
import operationImage from '../assets/images/operation.png';
import revenueGraphImage from '../assets/images/revenue-graph.png';
import revenueImage from '../assets/images/revenue.png';
import timeGraphImage from '../assets/images/time-graph.png';
import timeImage from '../assets/images/time.png';
import { dashboardMenus } from '../config';
import { ProductStat } from '../types';

const stats: ProductStat[] = [
  {
    label: 'Total Downloads',
    value: '4000',
    image: downloadImage,
    graph: downloadGraphImage,
    bg: 'linear-gradient(70.62deg, #141430 72.87%, #CD0B00 165.33%)',
  },
  {
    label: 'Total Revenue',
    value: '$58999',
    image: revenueImage,
    graph: revenueGraphImage,
    bg: 'linear-gradient(249.9deg, rgba(0, 41, 255, 0) -38.81%, #141430 25.01%)',
  },
  {
    label: 'Total Operation',
    value: '3560',
    image: operationImage,
    graph: operationGraphImage,
    bg: 'linear-gradient(249.9deg, rgba(0, 41, 255, 0) -38.81%, #141430 25.01%)',
  },
  {
    label: 'Time Spent',
    value: '45 Hours',
    image: timeImage,
    graph: timeGraphImage,
    bg: 'linear-gradient(250.92deg, rgba(47, 233, 255, 0) -93.98%, #141430 24.36%)',
  },
];

export default function Dashboard() {
  return (
    <PageLayout isLoading={false} heading="Dashboard" menus={dashboardMenus}>
      <PreLoader isLoading={false}>
        <Box px="4">
          <PageHeader pageName="Site Analytics" />
          <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" mb="4" gap="6">
            {stats.map((stat, index) => (
              <ProductStats key={index} stat={stat} />
            ))}
          </Grid>
          <Grid gridTemplateColumns="3fr 2fr" mt="8" gap="4">
            <Box bg="secondary.500" p="2" py="4" borderRadius="md">
              <Heading fontSize="xl" mb="-2">
                Downloads
              </Heading>
              <Box height="500px">
                <AreaChart />
              </Box>
            </Box>
            <Box bg="secondary.500" p="2" py="4" borderRadius="md">
              <Heading fontSize="xl" mb="-2">
                Product Comparison
              </Heading>
              <Box height="500px">
                <BarChart />
              </Box>
            </Box>
          </Grid>
        </Box>
      </PreLoader>
    </PageLayout>
  );
}
