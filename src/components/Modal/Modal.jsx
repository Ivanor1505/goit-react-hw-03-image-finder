import React, { Component } from 'react';
import { ModalWind, Overlay } from './Modal.styled';

export class Modal extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.closeModal()
  };

    handleKeyPress = (e) => {
    if (e.key === 'Escape' && this.state.isOpen) {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.openModal();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { image } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        {isOpen && (
          <Overlay onClick={this.closeModal}>
            <ModalWind onClick={this.openModal}>
              <img src={image} alt="" />
            </ModalWind>
          </Overlay>
        )}
      </div>
    );
  }
}
