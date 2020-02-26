import React, { useEffect, useState } from 'react';
import { Grid, ButtonGroup } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FacebookIcon, LinkedInIcon, TwitterIcon } from 'views/ui/icons';
import { Button, Wrapper } from 'views/ui';
import { siteActions } from 'store/sites';
import { SiteSection, SiteSectionForm, SiteInfo } from './';
import { useToggle } from 'hooks';

const socials = [
  {
    image: <FacebookIcon size="50" />,
    link: '',
  },
  {
    image: <LinkedInIcon size="50" />,
    link: 'https://www.linkedin.com/company/orocube-llc/about/',
  },
  {
    image: <TwitterIcon size="50" />,
    link: '',
  },
];

const SitesContainer = () => {
  const { slug } = useParams();
  const site = useSelector(({ sites }) => sites.site);
  const { loading, error } = useSelector(({ ui }) => ({
    loading: ui.loading,
    error: ui.error,
  }));
  const dispatch = useDispatch();
  const { getSite, updateSite, createSite } = siteActions;
  const [open, handleToggleChange] = useToggle(false);
  const [section, setSection] = useState({});

  useEffect(() => {
    dispatch(getSite(slug));
  }, [dispatch]);

  const handleSiteUpdate = values => {
    let data;
    if (section._id) {
      const sectionsDraft = [...site.sections];
      const sectionIndex = site.sections.findIndex(
        item => item._id === section._id
      );
      sectionsDraft[sectionIndex] = {
        ...sectionsDraft[sectionIndex],
        ...values,
      };

      data = {
        sections: sectionsDraft,
      };
    } else {
      data = {
        sections: site.sections.concat(values),
      };
    }

    dispatch(updateSite(site._id, data));
    handleToggleChange();
  };

  const handleSiteSectionEdit = index => {
    setSection(site.sections[index]);
    handleToggleChange();
  };

  const handleSiteSectionCreate = () => {
    setSection({});
    handleToggleChange();
  };

  const handleCloseSiteSectionForm = () => {
    setSection({});
    handleToggleChange();
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} lg={4}>
          <SiteInfo socials={socials} site={site} />
        </Grid>
        <Grid item md={6} lg={8}>
          <Wrapper display="flex" justifyContent="flex-end">
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button onClick={handleSiteSectionCreate}>Create Section</Button>
              <Button>Create Site</Button>
            </ButtonGroup>
          </Wrapper>
        </Grid>
        {site.sections &&
          site.sections.map((section, index) => (
            <Grid item xs={6} key={index}>
              <SiteSection
                index={index}
                section={section}
                handleSiteUpdate={handleSiteUpdate}
                handleSiteSectionEdit={handleSiteSectionEdit}
              />
            </Grid>
          ))}
      </Grid>
      {open && (
        <SiteSectionForm
          open={open}
          section={section}
          handleCloseSiteSectionForm={handleCloseSiteSectionForm}
          handleSiteUpdate={handleSiteUpdate}
          loading={loading}
        />
      )}
    </>
  );
};

export default SitesContainer;
