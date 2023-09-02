import { Button } from './Button/Button';
import { Gallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api';

const { Component } = require('react');

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    showModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      try {
        // console.log('this.state.query:', this.state.query);
        this.setState({ loading: true, error: false });
        const images = await fetchImages();
        this.setState({ images: images.hits });
        // console.log('this.state.query:', this.state.query);
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSearch = async query => {
    try {
      const imageData = await fetchImages(query);
      this.setState({ images: imageData.hits });
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLoadMore = async () => {
    try {
      this.setState({ loading: true, error: false });
      const { query, page } = this.state;
      const newImages = await fetchImages(query, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleImageClick = imageUrl => {
    this.setState({
      selectedImage: imageUrl,
      showModal: true,
    });
  };

  render() {
    const { images, showModal, loading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <Gallery
          allImages={this.state.images}
          onImageClick={this.handleImageClick}
        />
        {images.length > 0 && !loading && <Button loadMore={this.handleLoadMore} />}
        {showModal && (
          <Modal
            image={this.state.selectedImage}
            closeModal={this.closeModal}
          />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
