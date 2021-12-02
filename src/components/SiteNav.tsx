import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { SiteNavItem } from '.';
import { useDispatch, useSelector } from '../hooks';
import { useSiteQuery } from '../hooks/useSite';
import { addMenu, setMenus } from '../store/slices/menus';

export default function SiteNav() {
  const dispatch = useDispatch();
  const menus = useSelector(state => state.menus);
  const siteQuery = useSiteQuery();

  useEffect(() => {
    if (siteQuery.isFetched && siteQuery.isSuccess) {
      dispatch(setMenus(siteQuery.data?.menus ?? []));
    }
  }, [siteQuery.isFetched]);

  const handleAddMenu = () => {
    dispatch(addMenu());
  };

  return (
    <Box bgColor="secondary500" rounded="base" p="4">
      <Text fontSize="lg" mb="2">
        Site Nav
      </Text>
      {menus?.map((menu, index) => (
        <SiteNavItem key={menu.id} menu={menu} index={index} />
      ))}

      <Box textAlign="right" mt="2">
        <Button variant="link" mr="1" type="submit" onClick={handleAddMenu}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
