import React from "react";
import ReactDOM from "react-dome";
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
      </div>
    );
  }
}

ReactDOM.render(<SingleGalaxy />, document.getElementById('app'))

// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(SingleGalaxy);
