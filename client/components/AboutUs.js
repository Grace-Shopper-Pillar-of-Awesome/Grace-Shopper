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
  
      <h1 className="row">the engineering team</h1>

      <section id="title">
        <h3 className="us">Our Instructor</h3>
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/michael-mcinerney-b6b08460?trk=profile-badge"
          >
            LinkedIn Profile: Michael Mcinerney
          </a>
        </div>
      </section>

      <section id="title">
        <h3 className="us">Our Cheerful Fellow</h3>
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/laura-kathryn-gilbert?trk=profile-badge"
          >
            LinkedIn Profile: Laura Gilbert
          </a>
        </div>
      </section>

      <section id="title">
        <h3 className="us">Girls Who Code!</h3>
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/karina-zuniga?trk=profile-badge"
          >
            LinkedIn Profile: Karina Zuniga
          </a>
        </div>
      </section>

      <section id="title">
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/kelsey-siman?trk=profile-badge"
          >
            LinkedIn Profile: Kelsey Siman
          </a>
        </div>
      </section>

      <section id="title">
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/marri-kang?trk=profile-badge"
          >
            LinkedIn Profile: Marri Kang
          </a>
        </div>
      </section>

      <section id="title">
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/meredith-cornelius?trk=profile-badge"
          >
            LinkedIn Profile: Meredith Cornelius
          </a>
        </div>
      </section>

      <section id="title">
        <div className="aboutus">
          <a
            className="badge-base__link LI-simple-link"
            href="https://www.linkedin.com/in/shannon-chang?trk=profile-badge"
          >
            LinkedIn Profile: Shannon Chang
          </a>
        </div>
      </section>
    
      <section id="title">
        <h3 className="us">GitHub Repository</h3>
        <div className="aboutus">
          <a href="https://github.com/Grace-Shopper-Pillar-of-Awesome/Grace-Shopper">
            Click me!
          </a>
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
