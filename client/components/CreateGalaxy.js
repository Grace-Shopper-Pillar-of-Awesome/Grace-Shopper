import React from "react";
import GalaxyForm from "./GalaxyForm"
import { connect } from 'react-redux'
import { postGalaxy } from '../store/allGalaxies'

const CreateGalaxy = (props) => {
    return (
        <GalaxyForm submit={props.postGalaxy} />
    )
} 

 const mapDispatchToProps = (dispatch, { history }) => {
     return {
        postGalaxy: (galaxy) => dispatch(postGalaxy(galaxy, history))
     }
 }

export default connect(null, mapDispatchToProps)(CreateGalaxy)