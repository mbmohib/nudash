import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { SiteNavItem } from '.';
import { PlusIcon } from '../assets/icons';
import { useDispatch, useSelector } from '../hooks';
import { useGetSite } from '../hooks/useSite';
import { addMenu, setMenus } from '../store/slices/menus.slice';

export default function SiteNav() {
  const dispatch = useDispatch();
  const menus = useSelector(state => state.menus);
  const siteQuery = useGetSite();

  useEffect(() => {
    if (siteQuery.isFetched && siteQuery.isSuccess) {
      dispatch(setMenus(siteQuery.data?.menus ?? []));
    }
  }, [siteQuery.isFetched]);

  const handleAddMenu = () => {
    dispatch(addMenu());
  };

  return (
    <Box bgColor="secondary.500" rounded="base" p="4">
      <Text fontSize="lg" mb="2">
        Primary Menu
      </Text>
      {menus?.map((menu, index) => (
        <SiteNavItem key={menu.id} menu={menu} index={index} />
      ))}

      <Box textAlign="right" mt="2">
        <Button role="add-nav" variant="icon" onClick={handleAddMenu}>
          <PlusIcon />
        </Button>
      </Box>
    </Box>
  );
}
