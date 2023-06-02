import React from 'react';
import { ToastContainer } from 'react-toastify';

import {
  Container,
  Searchbar,
  Loader,
  ImageGallery,
  ErrorMessage,
  Button,
  Modal,
} from 'components';
import { fetchGallery } from '../../service/gallery-api';

export class App extends React.Component {
  state = {
    searchText: '',
    page: 1,
    perPage: 12,
    totalPages: 0,
    images: [],
    error: null,
    isLoading: false,
    largeImage: {},
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchText, page, perPage } = this.state;
    if (page !== prevState.page || searchText !== prevState.searchText) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchGallery({ searchText, page, perPage });
        if (response.hits.length === 0) {
          throw new Error(`Sorry, no photo from ${searchText}!`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalPages: Math.ceil(response.totalHits / perPage),
          error: null,
        }));
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = searchText => {
    this.setState({ searchText, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = image => {
    const largeImage = { url: image.largeImageURL, alt: image.tags };
    this.setState({ largeImage, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, error, page, totalPages, isLoading, showModal, largeImage } = this.state;
    const showLoadMoreButton = images.length !== 0 && page < totalPages;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} handleOpenModal={this.handleOpenModal} />
        {showLoadMoreButton && (
          <Button onClick={this.handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {showModal && <Modal image={largeImage} onClose={this.handleCloseModal} />}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
