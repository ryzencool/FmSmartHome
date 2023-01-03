import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { msgIdArrayAtom, statesStoreAtom } from "../../store/wsStore";
import { View, Text, Button, Switch } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import Slider from "@react-native-community/slider";
import { useEventSource } from "react-use-websocket";
import { getTimeStamp } from "../../utils/datetime";
import getMsgId from "../../utils/msgIdUtil";
import { hexToRgb } from "../../utils/rgbUtil";
const PhilipStripeDevice = ({ deviceId, entityId, sendMessage }) => {
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);
  const [lightWarmness, setLightWarmness] = useState(0);
  const [lightBrightness, setLightBrightness] = useState(0);
  const [color, setColor] = useState("");
  const [isLightOn, setIsLightOn] = useState(false);
  const [states, getStates] = useAtom(statesStoreAtom);

  useEffect(() => {
    setIsLightOn(states.state == "on");
    if (states.color_temp != null) {
      setLightWarmness(parseInt(states.color_temp));
    }
    if (states.brightness != null) {
      setLightBrightness(parseInt(states.brightness));
    }
  }, [states]);
  const updateBrightness = (value) => {
    console.log(parseInt(value));
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    setLightBrightness(parseInt(value));
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "light",
        service: "turn_on",
        service_data: {
          entity_id: entityId,
          brightness: parseInt(value),
        },
        target: {
          entity_id: entityId,
        },
      })
    );
  };
  const updateTemperature = (value) => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    setLightWarmness(parseInt(value));
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "light",
        service: "turn_on",
        service_data: {
          entity_id: entityId,
          color_temp: parseInt(value),
        },
        target: {
          entity_id: entityId,
        },
      })
    );
  };

  const updateColor = (value) => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    setColor(value);
    let rgb = hexToRgb(value);
    console.log(`rgb: r: ${rgb.r} g: ${rgb.g} b: ${rgb.b}`);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "light",
        service: "turn_on",
        service_data: {
          entity_id: entityId,
          rgb_color: [rgb.r, rgb.g, rgb.b],
        },
      })
    );
  };
  const toggleLight = () => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "light",
        service: "toggle",
        target: {
          entity_id: entityId,
        },
      })
    );

    setIsLightOn(!isLightOn);
  };

  return (
    <View>
      <View className={"p-4 flex-col justify-center mt-4"}>
        <View className={"flex-row justify-between w-full"}>
          <Text className={"font-bold text-2xl"}>飞利浦智能灯带</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isLightOn ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLight}
            value={isLightOn}
          />
        </View>
        <View className={"mt-10 "}>
          <ColorPicker
            color={color}
            onColorChange={(color) => setColor(color)}
            onColorChangeComplete={(color) => {
              updateColor(color);
            }}
            thumbSize={20}
            sliderHidden
            swatches={false}
          />
        </View>

        <View className={"mt-64 flex-row items-center justify-center"}>
          <Text className={"mr-4 text-lg"}>亮度</Text>
          <Slider
            value={lightBrightness}
            onSlidingComplete={(value) => {
              updateBrightness(value);
            }}
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={254}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className={"mt-10 flex-row items-center justify-center"}>
          <Text className={"mr-4 text-lg"}>色温</Text>
          <Slider
            value={lightWarmness}
            onSlidingComplete={(value) => {
              updateTemperature(value);
            }}
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={500}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    </View>
  );
};

export default PhilipStripeDevice;
