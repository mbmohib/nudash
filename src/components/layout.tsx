import { Box } from '@chakra-ui/layout';

import { Header, Sidebar } from '.';
import { useSelector } from '../hooks';

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
  const { isAuthorized } = useSelector(state => state.auth);

  return (
    <Box sx={customStyle}>
      {isAuthorized && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <Box ml={isAuthorized ? '60px' : '0'} mt={isAuthorized ? '72px' : '0'}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
