import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

interface LocationPickerProps {}

const LocationPicker: React.FC<LocationPickerProps> = ({}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default LocationPicker;
