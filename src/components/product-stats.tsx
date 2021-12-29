import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';

import { ProductStat } from '../types';

interface ProductStatsProps {
  stat: ProductStat;
}

export default function ProductStats({ stat }: ProductStatsProps) {
  return (
    <Box
      bg={stat.bg}
      borderRadius="xl"
      p="2"
      shadow="-12px 20px 60px rgba(0, 0, 0, 0.55)"
    >
      <Grid gridTemplateColumns="1fr 1fr" gap="2">
        <Box>
          <Image ml="-1" src={stat.image} alt={stat.label} />
          <Heading fontSize="4xl" as="h2" mt="1">
            {stat.value}
          </Heading>
          <Text fontSize="sm" mt="1">
            {stat.label}
          </Text>
        </Box>
        <Flex alignItems="flex-end" mb="3">
          <Image src={stat.graph} alt="" />
        </Flex>
      </Grid>
    </Box>
  );
}
