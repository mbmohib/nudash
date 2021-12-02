import { Box } from '@chakra-ui/layout';

import { Footer, Header, Sidebar } from '.';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      <Sidebar />
      <Box ml="60px" mt="72px">
        <Box>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}
