import { AppConfig } from 'config';

const client = require('contentful').createClient({
  space: `${AppConfig.CONTENTFUL_SPACE}`,
  accessToken: `${AppConfig.CONTENTFUL_ACCESS_TOKEN}`,
});

const getBlogPosts = (type) =>
  client.getEntries({ content_type: type }).then((response) => response.items);
const getAssets = () => client.getAssets().then((response) => response.items);

const getSinglePost = (slug) =>
  client
    .getEntries({
      'fields.slug': slug,
      content_type: 'blogPost',
    })
    .then((response) => response.items);

export { getBlogPosts, getSinglePost, getAssets };
