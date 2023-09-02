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
  };

  componentDidMount() {
    this.openModal();
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
