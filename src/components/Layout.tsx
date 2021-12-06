import { Box } from '@chakra-ui/layout';

import { Footer, Header, Sidebar } from '.';

type LayoutProps = {
  children: React.ReactNode;
};

const customStyle = {
  'textarea::-webkit-scrollbar': {
    width: '10px',
  },
  'textarea::-webkit-scrollbar-track': {
    backgroundColor: 'secondary.500',
    borderRadius: '10px',
  },
  'textarea::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    background: 'secondary.100',
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={customStyle}>
      <Header />
      <Sidebar />
      <Box ml="60px" mt="72px">
        <Box>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}
