import React from "react";
// import logo from '../../../assets/images/logo.png';
import {
  Wrapper,
  Image,
  Typography,
  Paper,
  Button,
  SocialIcons
} from "views/ui";

const SiteInfo = ({ socials, site = {} }) => {
  return (
    <Paper p={3}>
      {/* <Image center src={logo} alt="Orocube.com" mb={4} /> */}
      <Wrapper display="flex" justifyContent="flex-end">
        <SocialIcons icons={socials} />
      </Wrapper>
      <Typography variant="h3" mb={1}>
        {site.title}
      </Typography>
      <Typography variant="body1" mb={2}>
        {site.description}
      </Typography>
      <Typography mb={1}>
        Phone : <span>{site.phone}</span>
      </Typography>
      <Typography mb={1}>
        E-mail: <span>{site.email}</span>
      </Typography>

      <Typography variant="subtitle1" mb={3}>
        Copyright © {new Date().getFullYear()} <span>{site.copyright}</span>{" "}
      </Typography>
      <Wrapper display="flex">
        <Button color="primary" mr={1} variant="outlined" size="small">
          Edit Info
        </Button>
        <Button
          href={site.siteUrl}
          color="primary"
          variant="contained"
          size="small"
        >
          Visit Site
        </Button>
      </Wrapper>
    </Paper>
  );
};

export default SiteInfo;
