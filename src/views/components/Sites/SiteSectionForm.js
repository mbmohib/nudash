import React, { useEffect, useState } from 'react';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Wrapper, Editor, TextField, Drawer, Select } from 'views/ui';
import { SiteSectionFormMenu } from './';
import { useAnchor } from 'hooks';
import { featureActions } from 'store/features';
import { Form, withFormik } from 'formik';
import { textFormatter } from 'utils';

const SiteSectionFormWrapper = styled.div`
  position: relative;
`;

const AddItem = styled(Fab)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const prepareOptions = collections => {
  return collections.map(collection => ({
    label: collection.title,
    value: collection._id,
  }));
};

const SiteSectionForm = ({
  open,
  handleCloseSiteSectionForm,
  loading,
  values,
  setFieldValue,
  handleChange,
  section = {},
}) => {
  const dispatch = useDispatch();
  const options = useSelector(({ features }) => ({
    features: features.features,
    benefits: features.features,
  }));
  const [anchorEl, setAnchorEl] = useAnchor();
  const [collections, setCollections] = useState([]);
  const [collectionItems, setCollectionItems] = useState({});

  useEffect(() => {
    /*
      Set Collection array from options like : [feature, benefits]
      Set Collection Items object from options like : {feature: []}
    */
    const collections = [];
    const collectionItems = {};

    for (const item in options) {
      collectionItems[item] = prepareOptions(options[item]);
      collections.push({
        label: textFormatter.capitalize(item),
        value: item,
      });
    }

    setCollectionItems(collectionItems);
    setCollections(collections);
  }, [options.features.length]);

  useEffect(() => {
    dispatch(featureActions.getFeatures());
  }, [dispatch]);

  const handleEditorChange = event => {
    setFieldValue('description', event.target.getContent());
  };

  const handleSelectMenuChange = (option, index) => {
    setFieldValue(`collections[${index}]`, { title: option.value, ids: [] });
  };

  const handleCollections = (options, index) => {
    const ids = options.map(option => option.value);

    const items = {
      title: values.collections[index].title,
      ids,
    };
    setFieldValue(`collections[${index}]`, items);
  };

  const handleMenu = item => {
    switch (item) {
      case 'subtitle':
        const updatedSubtitles = values.subtitles.concat('');
        setFieldValue('subtitles', updatedSubtitles);
        break;
      case 'description':
        setFieldValue('description', 'Write something here..');
        break;
      case 'link':
        const updatedLinks = values.links.concat({
          label: '',
          url: '',
        });
        setFieldValue('links', updatedLinks);
        break;
      case 'collections':
        const updatedCollections = values.collections.concat({
          title: '',
          ids: [],
        });
        setFieldValue('collections', updatedCollections);
        break;
      default:
        break;
    }
    setAnchorEl();
  };

  const getCollection = (collections = [], ids = []) => {
    const options =
      collections && collections.filter(item => ids.includes(item.value));

    return options;
  };

  const RenderCollectionItemsSelect = ({
    index,
    collectionTitle,
    collectionIds,
  }) => {
    const defaultValues = getCollection(
      collectionItems[collectionTitle],
      collectionIds
    );

    return (
      <Select
        options={collectionItems[collectionTitle]}
        name={`collections[${index}].ids`}
        isMulti
        defaultValue={defaultValues}
        onChange={options => handleCollections(options, index)}
      />
    );
  };

  return (
    <Drawer open={open} anchor="right" onClose={handleCloseSiteSectionForm}>
      <SiteSectionFormWrapper>
        <Wrapper p={4} height="100vh">
          <Form>
            <TextField
              mb={2}
              label="Title"
              margin="dense"
              variant="outlined"
              fullWidth
              name="title"
              value={values.title}
              rows={4}
              onChange={handleChange}
            />

            {values.subtitles.map((subtitle, index) => (
              <TextField
                key={index}
                mb={2}
                label="Subtitle"
                margin="dense"
                variant="outlined"
                fullWidth
                name={`subtitles[${index}]`}
                value={subtitle}
                rows={4}
                onChange={handleChange}
              />
            ))}

            {values.description && (
              <Editor
                title="description"
                name="description"
                initialValue={values.description}
                handleEditorChange={handleEditorChange}
                mb={2}
              />
            )}

            {values.links.map((link, index) => (
              <Wrapper
                display="flex"
                key={index}
                name={`links[${index}]`}
                mb={2}
              >
                <TextField
                  label="Link Label"
                  margin="dense"
                  variant="outlined"
                  width="200"
                  name={`links[${index}].label`}
                  value={link.label}
                  rows={4}
                  mr={1}
                  onChange={handleChange}
                />
                <TextField
                  label="Url"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  name={`links[${index}].url`}
                  value={link.url}
                  rows={4}
                  onChange={handleChange}
                />
              </Wrapper>
            ))}

            {values.collections.map((collection, index) => (
              <Wrapper
                display="flex"
                name={`collections[${index}]`}
                key={`collections[${index}]`}
                mb={2}
              >
                <Select
                  width="200px"
                  options={collections}
                  mr={1}
                  defaultValue={{
                    label: textFormatter.capitalize(collection.title),
                    value: collection.title,
                  }}
                  name={`collections[${index}].title`}
                  onChange={option => handleSelectMenuChange(option, index)}
                />

                <RenderCollectionItemsSelect
                  index={index}
                  collectionTitle={collection.title}
                  collectionIds={collection.ids}
                />
              </Wrapper>
            ))}

            <Button
              variant="outlined"
              color="primary"
              mt={2}
              mr={1}
              onClick={handleCloseSiteSectionForm}
            >
              Close
            </Button>

            <Button
              loading={loading['siteForm']}
              disabled={loading['siteForm']}
              variant="contained"
              color="primary"
              mt={2}
              type="submit"
            >
              {section._id ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Wrapper>

        <AddItem color="primary" aria-label="add" onClick={setAnchorEl}>
          Add
        </AddItem>
      </SiteSectionFormWrapper>

      <SiteSectionFormMenu anchorEl={anchorEl} handleMenu={handleMenu} />
    </Drawer>
  );
};

export default withFormik({
  mapPropsToValues: ({ section = {} }) => {
    const subtitles = section.subtitles || [];
    const title = section.title || '';
    const description = section.description || '';
    const links = section.links || [];
    const collections = section.collections || [];

    return {
      title,
      subtitles,
      description,
      links,
      collections,
    };
  },

  handleSubmit: (values, { props: { handleSiteUpdate } }) => {
    handleSiteUpdate(values);
  },
})(SiteSectionForm);
