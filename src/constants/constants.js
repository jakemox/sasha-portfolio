export const isPreview = process.env.NODE_EN !== "production";

export const graphqlClient = {
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}`,
  headers: {
    authorization: `Bearer ${
      isPreview
        ? process.env.REACT_APP_CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
    }`,
  },
};
