import React from "react";
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from "react-native";

const NodePlayerView = (props, ref) => {
  const playerRef = React.useRef();
  const _onChange = (event) => {
    if (!props.onStatus) {
      return;
    }
    props.onStatus(event.nativeEvent.code, event.nativeEvent.msg);
  };

  const pause = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(playerRef.current),
      UIManager.RCTNodePlayer.Commands.pause,
      null
    );
  };

  const start = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(playerRef.current),
      UIManager.RCTNodePlayer.Commands.start,
      null
    );
  };

  const stop = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(playerRef.current),
      UIManager.RCTNodePlayer.Commands.stop,
      null
    );
  };
  React.useImperativeHandle(ref, () => ({ pause, start, stop }), [
    pause,
    start,
    stop,
  ]);

  return <RCTNodePlayer {...props} ref={playerRef} onChange={_onChange} />;
};

const RCTNodePlayer = requireNativeComponent("RCTNodePlayer", NodePlayerView, {
  nativeOnly: { onChange: true },
});

module.exports = React.forwardRef(NodePlayerView);
