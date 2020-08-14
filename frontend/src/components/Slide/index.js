import React from 'react';
import { Slide } from 'react-slideshow-image';
import img1 from './images/slide_1.png';
import img2 from './images/slide_2.png';
import img3 from './images/slide_3.png';
import './styles.css';


const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: true,
}

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div>
              <img src={img1} alt="img1" />
              {/* <span className='btn'>Slide 1</span> */}
            </div>
          </div>
          <div className="each-slide">
            <div>
              <img src={img2} alt="img2" />
              {/* <span className='btn'>Slide 2</span> */}
            </div>
          </div>
          <div className="each-slide">
            <div>
              <img src={img3} alt="img1" />
              {/* <span className='btn'>Slide 3</span> */}
            </div>
          </div>
        </Slide>
      </div>
    )
}


export default Slideshow;