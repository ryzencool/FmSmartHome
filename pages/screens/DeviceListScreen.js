import { useNavigation, useRoute } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {
  deviceListAtom,
  keyMsgStoreAtom,
  msgIdArrayAtom,
  msgIdStoreAtom,
} from "../../store/wsStore";
import getMsgId from "../../utils/msgIdUtil";

export default function DeviceListScreen() {
  const {
    params: { areaId, name },
  } = useRoute();
  const navigation = useNavigation();
  const [isLightOn, setIslightOn] = useState(false);
  const toggleLight = () => {
    setIslightOn(!isLightOn);
  };
  const { sendMessage } = useWebSocket("ws://localhost:8123/api/websocket", {
    share: true,
  });
  const [msgId, setMsgId] = useAtom(msgIdStoreAtom);
  const [keyMsg, setKeyMsg] = useAtom(keyMsgStoreAtom);
  const [deviceList, setDeviceList] = useAtom(deviceListAtom);
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);

  useEffect(() => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    console.log("请求设备列表", curId);
    setMsgId(curId);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "config/device_registry/list",
      })
    );

    keyMsg.set(curId, function (data) {
      const areaDevices = data.filter((it) => it.area_id == areaId);
      setDeviceList(areaDevices);
    });
  }, []);
  return (
    <View className={"p-4"}>
      <View>
        <Text className={"font-bold text-2xl"}>{name}</Text>
      </View>
      <ScrollView>
        <View className={"flex-row flex-wrap"}>
          {!!deviceList &&
            deviceList.map((it) => (
              <View key={it.id} className={"w-1/2 h-40 p-2  "}>
                <TouchableOpacity
                  onPress={() => {
                    let entityId = "";
                    if (
                      it.model ==
                      "Hue white and color ambiance LightStrip plus (8718699703424)"
                    ) {
                      entityId = `light.${it.name}`;
                    } else if (
                      it.model == "Aqara B1 curtain motor (ZNCLDJ12LM)"
                    ) {
                      entityId = `cover.${it.name}`;
                    } else if (
                      (it.model =
                        "Aqara D1 3 gang smart wall switch (no neutral wire) (QBKG25LM)")
                    ) {
                      entityId = `switch.${it.name}`;
                    }
                    navigation.navigate("device", {
                      deviceId: it.id,
                      model: it.model,
                      name: it.name,
                      manufacturer: it.manufacturer,
                      entityId: entityId,
                    });
                  }}
                >
                  <View
                    className={"relative bg-white h-full shadow-lg rounded-3xl"}
                  >
                    <View
                      className={
                        "absolute bottom-4 left-4 flex-row justify-between items-center w-5/6"
                      }
                    >
                      <Text className={"w-20"}>{it.name_by_user}</Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isLightOn ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleLight}
                        value={isLightOn}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
