import React from 'react'
import Img from "gatsby-image"
import NukaCarousel from 'nuka-carousel'
import DefaultDecorators from 'nuka-carousel/lib/decorators'

class Carousel extends React.Component {
  render() {
    const images = this.props.images.map(function(image){
      return <img key={image} src={image}/>;
    })
    return (
      <NukaCarousel decorators={DefaultDecorators.slice(2)} wrapAround={true} dragging={true} autoplay={true}>
        {images}
      </NukaCarousel>
    );
  }
}

export default Carousel
