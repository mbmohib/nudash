import React from 'react';
import { Paper, Typography, Wrapper } from 'views/ui';
import { IconButton, Grid, ButtonGroup } from '@material-ui/core';
import { Button } from 'views/ui';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from 'views/components/Table';

const SiteSection = ({ section = {}, index, handleSiteSectionEdit }) => {
  return (
    <Paper p={4}>
      <Grid container spacing={2}>
        <Grid item sm={8} md={9} lg={10}>
          <Typography variant="h3" mb={3}>
            {section.title}
          </Typography>
        </Grid>
        <Grid item sm={4} md={3} lg={2}>
          <Wrapper display="flex" justifyContent="flex-end">
            <IconButton
              aria-label="delete"
              onClick={() => handleSiteSectionEdit(index)}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Wrapper>
        </Grid>
      </Grid>

      {section.subtitles &&
        section.subtitles.map((subtitle, index) => (
          <Typography variant="subtitle1" mb={1} key={index}>
            {subtitle}
          </Typography>
        ))}

      <Typography
        variant="body1"
        mb={1}
        dangerouslySetInnerHTML={{ __html: section.description }}
      />

      {section.collections &&
        section.collections.map(
          ({ title, collectionItems = [] }, index) =>
            collectionItems && (
              <Wrapper key={index} mt={3}>
                <Typography variant="h3" mb={1} transform="capitalize">
                  {title}
                </Typography>
                <Table
                  title={`Showing results ${collectionItems.length} of ${collectionItems.length}`}
                  columns={[
                    {
                      title: 'Title',
                      field: 'title',
                    },
                    {
                      title: 'Description',
                      field: 'description',
                      html: true,
                    },
                  ]}
                  data={collectionItems}
                />
              </Wrapper>
            )
        )}

      <Wrapper display="flex" justifyContent="flex-end" mt={4}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {section.links &&
            section.links.map((link, index) => (
              <Button size="small" key={index} href={link.url}>
                {link.label}
              </Button>
            ))}
        </ButtonGroup>
      </Wrapper>
    </Paper>
  );
};

export default SiteSection;
