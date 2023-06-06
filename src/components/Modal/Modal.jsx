import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImage } from './Modal.styled';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick);
  }

  handleClick = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  onOverlayClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <Overlay onClick={this.onOverlayClickClose}>
        <ModalImage>
          <img src={url} alt={alt} />
        </ModalImage>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
