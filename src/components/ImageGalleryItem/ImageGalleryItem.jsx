import React, { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class GalleryItems extends Component {
  handleItemClick = () => {
  const { img } = this.props;
  this.props.onClick(img);
};

  render() {
    const { miniImg, img } = this.props;

    return (
    <GalleryItem>
      <GalleryItemImage src={miniImg} alt="" onClick={this.props.onImageClick} image={img} />
    </GalleryItem>
  );}
  
};
