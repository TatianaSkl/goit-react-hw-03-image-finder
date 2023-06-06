import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
        />
      ))}
    </List>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
