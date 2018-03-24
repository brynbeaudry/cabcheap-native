import React, {Component} from 'react';
import PropTypes from 'prop-types'
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import logo from "../../../assets/CCLogo640x480.png"
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, View, Image } from 'react-native'
import { Container, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import Header from "../../../components/Header";
import { MapView } from 'expo' 

const mapStyles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    map:{
      ...StyleSheet.absoluteFillObject
    }
});


class CCMapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  _onRegionChange = (region) => {
    this.setState({ region });
  }

  render(){
    return (
      <View style={mapStyles.container}>
        <MapView
        style={mapStyles.map}
        region={this.state.region}
        onRegionChange={this._onRegionChange}
        />
      </View>
      
    );
  }
  
}

CCMapView.propTypes = {
}

export default CCMapView;
