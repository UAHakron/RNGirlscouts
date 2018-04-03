import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Linking } from 'react-native';
import { Constants } from 'expo';
import MapView, { Marker, Callout } from 'react-native-maps';
var {deviceHeight, deviceWidth} = Dimensions.get('window');

export default class App extends Component {
  state = {
    mapRegion: {
      latitude: 41.0709053,
      longitude: -81.512106,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
        latlng: {
          latitude:  41.071331,
          longitude: -81.4952769,
        },
        title: "Dave's Supermarket",
        description: "The girlscouts here sell peanutbutter cookies!",
        image: require("./assets/images/anotherpb.png"),
        key: 1,
        url: 'https://www.google.com/maps?saddr=My+Location&daddr=@41.071331,-81.4952769'
      },
      {
        latlng: {
          latitude: 41.4846903,
          longitude: -81.705,
        },
        title: "West Side Market",
        description: "The girlscouts here sell peanutbutter cookies!",
        image: require("./assets/images/peanutbutter.png"),
        key: 2,
        url: 'https://www.google.com/maps?saddr=My+Location&daddr=@41.4846903,-81.705'
      },
      {
        latlng: {
          latitude: 39.9894655,
          longitude: -83.0306205,
        },
        title: "Kafe Kerouac",
        description: "The girlscouts here sell caramel cookies!",
        image: require("./assets/images/caramel.png"),
        key: 3,
        url: 'https://www.google.com/maps?saddr=My+Location&daddr=@39.9894655,-83.0306205'
      }
    ]
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  openExternalApp(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
    return (
          <View style={styles.container}>
            <MapView
              style={styles.mapStyle}
              initialRegion={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}>
              {this.state.markers.map(marker => (
                <Marker key={marker.key}
                  image={marker.image}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}>
                  <Callout onPress={() => this.openExternalApp(marker.url)}>
                    <View>
                      <Text style={styles.textBold}>{marker.title}</Text>
                      <Text>{marker.description}</Text>
                      <View style={styles.blueView}>
                        <Text style={styles.text}>Tap to get directions!</Text>
                      </View>
                    </View>
                </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  mapStyle: {
    alignSelf: 'stretch',
    height: 700
  },
  text: {
    textAlign: 'center'
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  blueView: {
    backgroundColor: 'aquamarine',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
