import React from 'react';

import mapModifiers from 'common/utils/functions';

interface ImageProps {
  src: string;
  srcTablet?: string;
  srcMobile?: string;
  alt?: string;
  ratio: Ratio;
  loading?: 'lazy' | 'eager';
}

const Image: React.FC<ImageProps> = ({
  src, srcMobile, srcTablet, alt, ratio, loading = 'lazy',
}) => (
  <picture className={mapModifiers('a-image', ratio)}>
    <source media="(max-width:992px)" srcSet={srcTablet || src} />
    <source media="(max-width:576px)" srcSet={srcMobile || src} />
    <img src={src} alt={alt} loading={loading} />
  </picture>
);

Image.defaultProps = {
  alt: 'replacing',
  srcMobile: undefined,
  srcTablet: undefined,
  loading: 'lazy',
};

export default Image;
