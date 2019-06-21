import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import MapView from './mapPage';

class Map extends Component {
  static propTypes = {
    geozone: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number),
    ).isRequired,
    setRef: PropTypes.func,
    resetView: PropTypes.func,
  }

  static defaultProps = {
    setRef: () => {},
    resetView: () => {},
  }

  constructor(props) {
    super(props);
    this.mapView = new MapView(props.geozone);
  }

  render() {
    const { geozone, setRef, resetView } = this.props;

    this.mapView.setGeozone(geozone);

    const resetViewJS = `
      map.fitBounds(polygon.getBounds());
    `;

    return (
        <View style={{ flex: 1 }}>
          <WebView
            ref={(r) => {
              setRef(r);
              resetView(() => {
                r.injectJavaScript(resetViewJS)
              })
            }}
            style={{ flex: 1 }}
            source={{ html: this.mapView.getHtml() }}
            injectedJavaScript={resetViewJS}
            javaScriptEnabled
            javaScriptEnabledAndroid
          />
        </View>
  );
  }
}

export default Map;
