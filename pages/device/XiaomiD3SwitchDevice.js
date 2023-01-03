import { View, Text, Button } from "react-native";
import React from "react";
import { useAtom } from "jotai";
import { msgIdArrayAtom, sendMsgAtom } from "../../store/wsStore";
import getMsgId from "../../utils/msgIdUtil";
const XiaomiD3SwitchDevice = ({
  deviceId,
  entityIdLeft,
  entityIdCenter,
  entityIdRight,
  sendMessage,
}) => {
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);
  const toggleSwitch = (curEntityId) => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "call_service",
        domain: "switch",
        service: "toggle",
        service_data: {
          entity_id: curEntityId,
        },
        target: {
          entity_id: curEntityId,
        },
      })
    );
  };
  return (
    <View>
      <Button
        title={"开关"}
        onPress={() => {
          toggleSwitch(entityIdCenter);
        }}
      />
    </View>
  );
};

export default XiaomiD3SwitchDevice;
