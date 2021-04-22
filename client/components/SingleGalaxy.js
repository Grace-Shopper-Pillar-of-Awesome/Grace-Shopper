import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleGalaxy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="single-galaxy-view">
          <img src="https://www.innovationnewsnetwork.com/wp-content/uploads/2021/02/Primordial-galaxy-696x392.jpg"/>
          <h1>Galaxy name</h1>
          <h2>$1000</h2>
          <h3>1 billion light years away</h3>
          <h3>Spiral galaxy</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleGalaxy);
