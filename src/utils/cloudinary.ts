import { buildImageUrl, extractPublicId } from 'cloudinary-build-url';

export function getBlurredImageURL(url: string): string {
  const publicId = extractPublicId(url);

  return buildImageUrl(publicId, {
    cloud: {
      cloudName: 'rafiandria23',
    },
    transformations: {
      effect: 'blur:500',
      quality: 1,
    },
  });
}

export function getPublicID(url: string): string {
  return extractPublicId(url);
}
