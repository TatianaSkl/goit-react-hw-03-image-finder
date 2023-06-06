import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <Item onClick={this.toggleModal}>
        <Image src={webformatURL} alt={tags} loading="lazy" />

        {showModal && <Modal url={largeImageURL} alt={tags} onClose={this.toggleModal} />}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
