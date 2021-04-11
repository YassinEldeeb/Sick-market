import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({
  title = 'Sick Market',
  description = 'The best E-commerce on the entire planet, Cause I built it!',
  ogTitle = 'Sick Market',
  ogDescription = 'The best E-commerce on the entire planet, Cause I built it!',
  ogImage = '/public/facicon4.png',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={ogDescription} />
      <meta property='og:image' content={ogImage} />
    </Helmet>
  )
}

export default Meta
