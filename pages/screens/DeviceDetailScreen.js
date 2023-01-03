import { useRoute } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { View, Text, Button, Switch } from "react-native";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {
  entityListAtom,
  keyMsgStoreAtom,
  msgIdArrayAtom,
  msgIdStoreAtom,
  sendMsgAtom,
  statesStoreAtom,
} from "../../store/wsStore";
import ColorPicker from "react-native-wheel-color-picker";
import Slider from "@react-native-community/slider";
import { useEventSource } from "react-use-websocket";
import { getTimeStamp } from "../../utils/datetime";
import getMsgId from "../../utils/msgIdUtil";
import { hexToRgb } from "../../utils/rgbUtil";
import PhilipStripeDevice from "../device/PhilipStripeDevice";
import XiaomiCurtainDevice from "../device/XiaomiCurtainDevice";
import { entitiesColl } from "home-assistant-js-websocket";
import XiaomiD3SwitchDevice from "../device/XiaomiD3SwitchDevice";

export default function DeviceDetailScreen() {
  const {
    params: { deviceId, model, manufacturer, name, entityId },
  } = useRoute();
  const { sendMessage } = useWebSocket("ws://localhost:8123/api/websocket", {
    share: true,
  });
  const [keyMsg, setKeyMsg] = useAtom(keyMsgStoreAtom);
  const [entityList, setEntityList] = useAtom(entityListAtom);
  const [states, setStates] = useAtom(statesStoreAtom);
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);

  useEffect(() => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "config/entity_registry/list",
      })
    );
    keyMsg.set(curId, function (data) {
      setEntityList(data);
      console.log(
        data
          .map((it) => it.entity_id)
          .filter((it) => it.includes("0x54ef4410004491dc"))
      );
    });
    const curId1 = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId1,
        type: "get_states",
      })
    );
    keyMsg.set(curId1, function (data) {
      let dt = data.filter((it) => it.entity_id == entityId);
      setStates(dt[0]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const curId = getMsgId(msgIdArr, setMsgIdArr);
      sendMessage(
        JSON.stringify({
          id: curId,
          type: "get_states",
        })
      );
      keyMsg.set(curId, function (data) {
        if (data != undefined) {
          let dt = data.filter((it) => it.entity_id == entityId);
          setStates(dt[0]);
        }
      });
      setKeyMsg(keyMsg);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {model ==
        "Hue white and color ambiance LightStrip plus (8718699703424)" && (
        <PhilipStripeDevice
          deviceId={deviceId}
          entityId={entityId}
          sendMessage={sendMessage}
        />
      )}
      {model == "Aqara B1 curtain motor (ZNCLDJ12LM)" && (
        <XiaomiCurtainDevice
          deviceId={deviceId}
          entityId={entityId}
          sendMessage={sendMessage}
        />
      )}
      {model ==
        "Aqara D1 3 gang smart wall switch (no neutral wire) (QBKG25LM)" && (
        <XiaomiD3SwitchDevice
          deviceId={deviceId}
          entityIdLeft={entityId + "_left"}
          entityIdCenter={entityId + "_center"}
          entityIdRight={entityId + "_right"}
          sendMessage={sendMessage}
        />
      )}
    </View>
  );
}
