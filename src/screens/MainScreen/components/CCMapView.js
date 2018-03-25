import React, {Component} from 'react';
import PropTypes from 'prop-types'
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import logo from "../../../assets/CCLogo640x480.png"
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, View, Image } from 'react-native'
import { Container, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import Header from "../../../components/Header";
import { MapView, Constants, Location, Permissions } from 'expo' 

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

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class CCMapView extends Component {
  constructor(props) {
    super(props)

    map = null

    this.state = {
      locationResult: {},
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      ready: true,
      status: "denied"
    }
  }

  _onRegionChange = (region) => {
    this.setState({ region });
  }

  setRegion(region) {
    if(this.state.ready) {
      console.log(`in set Region about to animate this.map: : ${this.map}`)
      setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  _getLocationAsync = async () => {
    console.log(`in Get Location async`)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(`in Get Location async status : ${status}`)
    if (status !== 'granted') {
      //this.setState({ locationResult: 'Permission to access location was denied', })
    }else{
      let location = await Location.getCurrentPositionAsync({});
      console.log(`locationResult in CCMapView: ${JSON.stringify(location)}`)
      //this.setState({ locationResult: JSON.stringify(location) });
      this._convertLocationResultToRegion(location)
    }
  }



  _convertLocationResultToRegion = (lr) => {
    console.log(`_convertLocationResultToRegion lr : ${JSON.stringify(lr, true)}`)
    let newRegion = {
      latitude: lr.coords.latitude,
      longitude: lr.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    //this.setRegion(newRegion)
    this.setState({ region: newRegion });
  }

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };

  componentDidMount() {
    console.log('Component did mount');
    // this._getCurrentPosition();
    this._getLocationAsync()
  }

  componentWillUnmount(){
    console.log('Map Component will unmount');
  }

  _getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  render(){
    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;

    console.log(`in render region : ${JSON.stringify(region)}`)

    return (
      <View style={mapStyles.container}>
        <MapView
        showsUserLocation
        ref={ map => { this.map = map }}
        style={mapStyles.map}
        region={region}
        //data={markers}
        //renderMarker={renderMarker}
        onMapReady={this.onMapReady}
        showsMyLocationButton={true}
        //onRegionChange={this.onRegionChange}
        //onRegionChangeComplete={this.onRegionChangeComplete}
        >
          <MapView.Marker
            coordinate={this.state.region}
          >
          </MapView.Marker>
        </MapView>
      </View>
      
    );
  }
  
}

CCMapView.propTypes = {
}

export default CCMapView;
