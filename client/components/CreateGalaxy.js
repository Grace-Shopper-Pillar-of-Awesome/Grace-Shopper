import React from "react";
import GalaxyForm from "./GalaxyForm"
import { connect } from 'react-redux'
import { postGalaxy } from '../store/allGalaxies'

const CreateGalaxy = (props) => {
    return (
        <div>
            {props.userType === 'admin' ? (<GalaxyForm submit={props.postGalaxy} />) : (
            <p>You shall not pass!</p>
             )}
        </div>
    )
} 

const mapStateToProps = (state) => {
    return {
        userType: state.auth.userType
    }
}

 const mapDispatchToProps = (dispatch, { history }) => {
     return {
        postGalaxy: (galaxy) => dispatch(postGalaxy(galaxy, history))
     }
 }

export default connect(mapStateToProps, mapDispatchToProps)(CreateGalaxy)