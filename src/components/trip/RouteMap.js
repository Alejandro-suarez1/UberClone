// AI-assisted: see docs/AI_LOG.md #B-12
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { darkMapStyle } from '../../theme/mapStyle';
import { colors } from '../../theme/colors';

export default function RouteMap({ coordinates, driver, target, targetColor = colors.success }) {
  const mapRef = useRef(null);

  const signature = useMemo(() => {
    if (!coordinates?.length) return 'none';
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    return `${coordinates.length}:${first.latitude},${first.longitude}:${last.latitude},${last.longitude}`;
  }, [coordinates]);

  useEffect(() => {
    if (coordinates?.length > 1) {
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 80, right: 60, bottom: 340, left: 60 },
        animated: true,
      });
    }
  }, [signature]);

  const start = target || driver;

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      customMapStyle={darkMapStyle}
      userInterfaceStyle="dark"
      toolbarEnabled={false}
      initialRegion={{
        latitude: start?.lat ?? 4.711,
        longitude: start?.lng ?? -74.0721,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {coordinates?.length > 1 ? (
        <Polyline coordinates={coordinates} strokeColor={colors.primary} strokeWidth={5} />
      ) : null}
      {driver ? (
        <Marker coordinate={{ latitude: driver.lat, longitude: driver.lng }} pinColor={colors.primary} />
      ) : null}
      {target ? (
        <Marker coordinate={{ latitude: target.lat, longitude: target.lng }} pinColor={targetColor} />
      ) : null}
    </MapView>
  );
}