'use client';

import type { FC } from 'react';
import { memo } from 'react';
import type { CldImageProps } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';

export interface IImageProps extends CldImageProps {}

const Image: FC<IImageProps> = ({ src, ...rest }) => {
  return <CldImage src={src} {...rest} />;
};

export default memo(Image);
