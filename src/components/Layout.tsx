import { Box } from '@chakra-ui/layout';

import { Footer, Sidebar } from '.';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Sidebar />
      <Box ml="40px">
        <Box>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}
