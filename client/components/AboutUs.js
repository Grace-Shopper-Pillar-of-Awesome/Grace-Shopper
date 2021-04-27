import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

/**
 * COMPONENT
 */
export const AboutUs = (props) => {
  const { username, isLoggedIn, fetchCart, id } = props;
  if (isLoggedIn) fetchCart(id);
  return (
    <div className="content">
      
      <h1 className="row">The engineering team</h1>
        <section id="title">
          <h3 className="us">The Instructor</h3>
          <div className="aboutus">
            <div className='badge-base LI-profile-badge' data-locale='en_US' data-size='medium' data-theme='dark' data-type='HORIZONTAL' data-vanity='michael-mcinerney' data-version='v1'><a className='badge-base__link LI-simple-link' href='https://www.linkedin.com/in/michael-mcinerney-b6b08460?trk=profile-badge'>LinkedIn Profile: Michael Mcinerney</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Our Cheerful Fellow</h3>
          <div className="aboutus">
            <div className='badge-base LI-profile-badge' data-locale='en_US' data-size='medium' data-theme='dark' data-type='HORIZONTAL' data-vanity='laura-gilbert' data-version='v1'><a className='badge-base__link LI-simple-link' href='https://www.linkedin.com/in/laura-kathryn-gilbert?trk=profile-badge'>LinkedIn Profile: Laura Gilbert</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Girls who code!</h3>
          <div className="aboutus">
            <div className='badge-base LI-profile-badge' data-locale='en_US' data-size='medium' data-theme='dark' data-type='HORIZONTAL' data-vanity='karina-zuniga' data-version='v1'><a className='badge-base__link LI-simple-link' href='https://www.linkedin.com/in/karina-zuniga?trk=profile-badge'>LinkedIn Profile: Karina Zuniga</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Girls who code!</h3>
          <div className="aboutus">
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="HORIZONTAL" data-vanity="kelsey-siman" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/kelsey-siman?trk=profile-badge">LinkedIn Profile: Kelsey Siman</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Girls who code!</h3>
          <div className="aboutus">
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="HORIZONTAL" data-vanity="marri-kang" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/marri-kang?trk=profile-badge">LinkedIn Profile: Marri Kang</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Girls who code!</h3>
          <div className="aboutus">
            <div className='badge-base LI-profile-badge' data-locale='en_US' data-size='medium' data-theme='dark' data-type='HORIZONTAL' data-vanity='meredith-cornelius' data-version='v1'><a className='badge-base__link LI-simple-link' href='https://www.linkedin.com/in/meredith-cornelius?trk=profile-badge'>LinkedIn Profile: Meredith Cornelius</a></div>
          </div>
        </section>

        <section id="title">
          <h3 className="us">Girls who code!</h3>
          <div className="aboutus">
            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="HORIZONTAL" data-vanity="shannon-chang" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/shannon-chang?trk=profile-badge">LinkedIn Profile: Shannon Chang</a></div>
          </div>
        </section>          

        <section id="title">
          <h3 className="us">GitHub Repository</h3>
          <div className="aboutus">
            <a href="https://github.com/Grace-Shopper-Pillar-of-Awesome/Grace-Shopper">Click me!</a>
          </div>
        </section>  
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => ({
  username: state.auth.username,
  isLoggedIn: !!state.auth.id,
  id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(AboutUs);