import { View, Text, Button } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { msgIdArrayAtom } from "../../store/wsStore";
import getMsgId from "../../utils/msgIdUtil";

const XiaomiCurtainDevice = ({ deviceId, entityId, sendMessage }) => {
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);
  const closeCurtain = () => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "cover",
        service: "close_cover",
        service_data: {
          entity_id: entityId,
        },
        target: {
          entity_id: entityId,
        },
      })
    );
  };
  const stopCurtain = () => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "cover",
        service: "stop_cover",
        service_data: {
          entity_id: entityId,
        },
        target: {
          entity_id: entityId,
        },
      })
    );
  };
  const openCurtain = () => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "cover",
        service: "open_cover",
        service_data: {
          entity_id: entityId,
        },
        target: {
          entity_id: entityId,
        },
      })
    );
  };

  return (
    <View>
      <Text>{entityId}</Text>
      <Button
        title="打开"
        onPress={() => {
          console.log("打开窗帘");
          openCurtain();
        }}
      />

      <Button
        title="停止"
        onPress={() => {
          stopCurtain();
        }}
      />
      <Button
        title="关闭"
        onPress={() => {
          closeCurtain();
        }}
      />
    </View>
  );
};

export default XiaomiCurtainDevice;
