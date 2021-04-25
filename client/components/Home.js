import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className="content">
      <header>
        <div className = "title">
          <h1 className = "far">Far, Far Away...</h1>
          </div>
      </header>
      {/* <div className="fade"></div> */}
      {/* <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>There is enough space to go around</p>
            <h1>a galaxy far far away</h1>
          </div>
          <p>The universe... that inmense open space, full of adventures and posibilities. </p>      
          <p>During centuries, human have wondered about the sky and its limits, today, you not only can witness its greateness but also can OWN your own piece of it.</p>
          <p>Introducing Galaxy X, a great way to explore the universe by acquiring a little piece of the infinite.</p>
          <p>Feel what it feels to own your own galaxy at the edge of the universe and enjoy the power of freedom.</p>
        </div>
      </section> */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
