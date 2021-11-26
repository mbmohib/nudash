import { Box, Button, Text } from '@chakra-ui/react';
import produce from 'immer';
import { nanoid } from 'nanoid';

import { SiteNavItem } from '.';
import { useUpdateSite } from '../hooks/useSite';
import { SiteMenu } from '../types';

interface SiteNavProps {
  menus: SiteMenu[] | undefined;
}

export default function SiteNav({ menus }: SiteNavProps) {
  const updateSite = useUpdateSite();

  const handleSaveData = (menu: SiteMenu, menuId: string) => {
    updateSite.mutate({
      data: {
        menus: menus?.map(menuItem => {
          if (menuItem.id === menuId) {
            return menu;
          }

          return menuItem;
        }),
      },
    });
  };

  const handleDeleteNav = (menuId: string) => {
    updateSite.mutate({
      data: {
        menus: menus?.filter(menu => menu.id !== menuId),
      },
    });
  };

  const handleAddMenu = () => {
    updateSite.mutate({
      data: {
        menus: [
          ...(menus as SiteMenu[]),
          {
            id: nanoid(),
            label: 'unnamed',
            url: '/',
            isOpenNew: false,
          },
        ],
      },
    });
  };

  const handleOrderMenu = (draggedIndex: number, hoveredIndex: number) => {
    const updatedOrder = produce(menus, (draft: SiteMenu[]) => {
      draft.splice(hoveredIndex, 0, draft.splice(draggedIndex, 1)[0]);
    });

    updateSite.mutate({
      data: {
        menus: updatedOrder,
      },
    });
  };

  return (
    <Box bgColor="secondary500" rounded="base" p="4">
      <Text fontSize="lg" mb="2">
        Site Nav
      </Text>
      {menus?.map((menu, index) => (
        <SiteNavItem
          key={menu.id}
          isLoading={updateSite.isLoading}
          menu={menu}
          index={index}
          handleSaveData={handleSaveData}
          handleOrderMenu={handleOrderMenu}
          handleDeleteNav={handleDeleteNav}
        />
      ))}

      <Box textAlign="right" mt="2">
        <Button variant="link" mr="1" type="submit" onClick={handleAddMenu}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
