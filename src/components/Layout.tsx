import { Box } from '@chakra-ui/layout';

import { Footer, Header, Sidebar } from '.';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Sidebar />
      <Box ml="250px">
        <Header />
        <Box pt="80px">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}
