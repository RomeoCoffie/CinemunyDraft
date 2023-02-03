import React from 'react';
import { Helmet } from 'react-helmet';

export default function Headtags({ description, postImgUrl }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>news from around the world</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      {/*  <meta property="og:type" content={type} />
      <meta property="og:title" content={title} /> */}
      <meta
        property="og:description"
        key="og:description"
        content={description}
      />
      <meta property="og:image" key="og:image" content={postImgUrl[0]} />
      <meta property="og:type" key="og:type" content="website" />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      {/* <meta name="twitter:creator" content={name} /> */}
      {/*  <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} /> */}
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
