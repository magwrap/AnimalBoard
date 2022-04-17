import React, { useRef } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

interface ClickBoxProps {
  children: React.ReactNode;
  onSingleTap: () => void;
  onDoubleTap: () => void;
}

const ClickBox: React.FC<ClickBoxProps> = (props) => {
  const _onSingleTap = () => {
    console.log(doubleTapRef.current);
  };
  const doubleTapRef = useRef();
  return (
    <TapGestureHandler
      onHandlerStateChange={_onSingleTap}
      waitFor={doubleTapRef}>
      <TapGestureHandler ref={doubleTapRef.current} numberOfTaps={2}>
        {props.children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
const styles = StyleSheet.create({
  box: {},
});

export default ClickBox;
