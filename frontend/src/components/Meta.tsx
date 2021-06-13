import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  url?: string
  product?: any
}

const Meta: FC<Props> = ({
  title = 'Sick Market',
  description = 'The best E-commerce on the entire planet, Cause I built it!',
  ogTitle = 'Sick Market',
  ogDescription = 'The best E-commerce on the entire planet, Cause I built it!',
  ogImage = 'https://sickmarket.ml/logo-og.png',
  url = `https://sickmarket.ml`,
  product,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={ogDescription} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:url' content={url} />
      <meta property='twitter:title' content={ogTitle} />
      <meta property='twitter:description' content={ogDescription} />
      <meta property='twitter:image' content={ogImage} />
      <meta name='twitter:card' content='summary_large_image' />
      {product && <meta property='og:type' content='product' />}
    </Helmet>
  )
}

export default Meta
