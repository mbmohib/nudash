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

  const handleSaveData = (values: SiteMenu) => {
    updateSite.mutate({
      data: {
        menus: [...(menus as SiteMenu[]), values],
      },
    });
  };

  const handleDeleteNav = (label: string) => {
    updateSite.mutate({
      data: {
        menus: menus?.filter(menu => menu.label !== label),
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
      {menus?.map(menu => (
        <Accordion allowToggle allowMultiple>
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
