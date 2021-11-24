import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
} from '@chakra-ui/react';

import { SiteNavItem } from '.';
import { useUpdateSite } from '../hooks/useSite';
import { Site } from '../types';

interface SiteNavProps {
  menus:
    | {
        label: string;
        url: string;
        isOpenNew: boolean;
      }[]
    | undefined;
}

export default function SiteNav({ menus }: SiteNavProps) {
  const updateSite = useUpdateSite();

  const handleSaveData = (values: any) => {
    updateSite.mutate({
      data: {
        menus: [
          ...(menus as {
            label: string;
            url: string;
            isOpenNew: boolean;
          }[]),
          values,
        ],
      },
    });
  };

  const handleDeleteNav = (values: any) => {
    // updateSite.mutate(values)
  };

  const handleAddMenu = (values: any) => {
    updateSite.mutate({
      data: {
        menus: [
          ...(menus as {
            label: string;
            url: string;
            isOpenNew: boolean;
          }[]),
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
