import { Button } from './Button/Button';
import { Gallery } from './ImageGallery/ImageGallery';
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

  async componentDidMount() {
    try {
      this.setState({ loading: true, error: false });
      const images = await fetchImages();
      this.setState({ images: images.hits });
      // console.log('this.state.images:', this.state.images);
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
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

  handleImageClick = imageUrl => {
    this.setState({
      selectedImage: imageUrl,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <Gallery
          allImages={this.state.images}
          onImageClick={this.handleImageClick}
        />
        <Button loadMore={this.handleLoadMore} />
        {this.state.showModal && (
          <Modal image={this.state.selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
