// AI-assisted: see docs/AI_LOG.md #B-12
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { darkMapStyle } from '../../theme/mapStyle';
import { colors } from '../../theme/colors';

const PADDING = { top: 90, right: 50, bottom: 340, left: 50 };

export default function RouteMap({ coordinates, driver, target, targetColor = colors.danger, style }) {
  const mapRef = useRef(null);

  const signature = coordinates?.length
    ? `${coordinates.length}:${coordinates[0]?.latitude}:${coordinates[coordinates.length - 1]?.latitude}`
    : '';

  useEffect(() => {
    if (!coordinates || coordinates.length < 2) return;
    const timer = setTimeout(() => {
      mapRef.current?.fitToCoordinates(coordinates, { edgePadding: PADDING, animated: true });
    }, 250);
    return () => clearTimeout(timer);
  }, [signature]);

  const initial = driver || target || { lat: 4.711, lng: -74.0721 };

  return (
    <MapView
      ref={mapRef}
      style={[StyleSheet.absoluteFill, style]}
      customMapStyle={darkMapStyle}
      userInterfaceStyle="dark"
      initialRegion={{ latitude: initial.lat, longitude: initial.lng, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
      toolbarEnabled={false}
    >
      {coordinates && coordinates.length > 1 ? (
        <Polyline coordinates={coordinates} strokeColor={colors.primary} strokeWidth={5} />
      ) : null}
      {target ? (
        <Marker coordinate={{ latitude: target.lat, longitude: target.lng }} pinColor={targetColor} />
      ) : null}
      {driver ? (
        <Marker coordinate={{ latitude: driver.lat, longitude: driver.lng }} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
          <View style={styles.driverOuter}>
            <View style={styles.driverInner} />
          </View>
        </Marker>
      ) : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  driverOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(198, 255, 61, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.bg,
  },
});