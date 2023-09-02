
import { GalleryItems } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';

export const Gallery = ({ allImages, onImageClick }) => {

  return (
    <ImageGallery>
      {allImages.map(image => (
        <GalleryItems
          key={image.id}
          img={image.largeImageURL}
          miniImg={image.webformatURL}
          onImageClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ImageGallery>
  );
};
