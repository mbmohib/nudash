import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';

import { SiteNavItem } from '.';
import { useUpdateSite } from '../hooks/useSite';
import { SiteMenu } from '../types';

interface SiteNavProps {
  menus: SiteMenu[] | undefined;
}

export default function SiteNav({ menus }: SiteNavProps) {
  const updateSite = useUpdateSite();

  const handleSaveData = (menu: SiteMenu, menuIndex: number) => {
    updateSite.mutate({
      data: {
        menus: menus?.map((menuItem, index) => {
          if (index === menuIndex) {
            return menu;
          }

          return menuItem;
        }),
      },
    });
  };

  const handleDeleteNav = (menuIndex: number) => {
    updateSite.mutate({
      data: {
        menus: menus?.filter((menu, index) => index !== menuIndex),
      },
    });
  };

  const handleAddMenu = () => {
    updateSite.mutate({
      data: {
        menus: [
          ...(menus as SiteMenu[]),
          {
            label: 'unnamed',
            url: '/',
            isOpenNew: false,
          },
        ],
      },
    });
  };

  return (
    <Box bgColor="secondary500" rounded="base" p="4">
      <Text fontSize="lg" mb="2">
        Site Nav
      </Text>
      {menus?.map((menu, index) => (
        <Accordion key={index} allowToggle allowMultiple>
          <AccordionItem>
            <AccordionButton px="0">
              <Box flex="1" textAlign="left">
                {menu.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px="1" pb={4}>
              <SiteNavItem
                isLoading={updateSite.isLoading}
                menu={menu}
                menuIndex={index}
                handleSaveData={handleSaveData}
                handleDeleteNav={handleDeleteNav}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}

      <Box textAlign="right" mt="2">
        <Button variant="link" mr="1" type="submit" onClick={handleAddMenu}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
