import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

export class SlideLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const slideItems = this.props.slideContext.map((element, index) => (
      <Carousel.Item key={index}>
        <a href={element.href}>
          <img
            style={{ maxHeight: '450px' }}
            className='d-block w-100'
            src={element.src}
            alt='slide'
          />

          <Carousel.Caption>
            <h3 style={{ color: '#66ffff' }}>{element.title}</h3>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    ));
    return <Carousel>{slideItems}</Carousel>;
  }
}
