import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ArchiveBoxIcon,
  PencilSquareIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  areaListAtom,
  deviceListAtom,
  keyMsgStoreAtom,
  msgIdArrayAtom,
  msgIdStoreAtom,
} from "../../store/wsStore";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "../../components/svg/homeIcon";
import getMsgId from "../../utils/msgIdUtil";
import { getTimeStamp } from "../../utils/datetime";
export default function AreaListScreen() {
  const { sendMessage } = useWebSocket("ws://localhost:8123/api/websocket", {
    share: true,
  });
  const [keyMsg, setKeyMsg] = useAtom(keyMsgStoreAtom);
  const [areaList, setAreaList] = useAtom(areaListAtom);
  const navigation = useNavigation();
  const [isLivingRoomEnabled, setIsLivingRoomEnabled] = useState(false);
  const [msgIdArr, setMsgIdArr] = useAtom(msgIdArrayAtom);
  const [addAreaModalVisible, setAddAreaModalVisible] = useState(false);
  const [areaInput, setAreaInput] = useState("");
  const toggleLivingRoomEnabled = () => {
    setIsLivingRoomEnabled(!isLivingRoomEnabled);
  };
  useEffect(() => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    console.log("空间列表", curId);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "config/area_registry/list",
      })
    );
    keyMsg.set(curId, function (data) {
      setAreaList(data);
    });
    setKeyMsg(keyMsg);
  }, []);

  const createArea = (value) => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "config/area_registry/create",
        name: value,
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const curId = getMsgId(msgIdArr, setMsgIdArr);
      sendMessage(
        JSON.stringify({
          id: curId,
          type: "config/area_registry/list",
        })
      );
      keyMsg.set(curId, function (data) {
        setAreaList(data);
      });
      setKeyMsg(keyMsg);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateArea = (value) => {
    const curId = getMsgId(msgIdArr, setMsgIdArr);
    sendMessage(
      JSON.stringify({
        id: curId,
        type: "config/area_registry/update",
        area_id: editingArea.area_id,
        name: value.name,
      })
    );
  };

  return (
    <View className={"m-4 flex-1 justify-between "}>
      <View className={"flex-row justify-between mt-2"}>
        <Text className={"font-bold text-2xl"}>房间</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={addAreaModalVisible}
          onRequestClose={() => {
            setAddAreaModalVisible(!addAreaModalVisible);
          }}
        >
          <View
            className={
              " w-2/3 bg-white p-4 shadow-lg rounded-lg flex justify-between items-center mt-32"
            }
          >
            <Text className="font-bold text-lg">添加房间</Text>
            <TextInput
              className="h-12 w-2/3 border-2 rounded-lg p-2"
              value={areaInput}
              onChangeText={(value) => {
                setAreaInput(value);
              }}
            />
            <View className="flex-row justify-between ">
              <Button
                className="bg-blue-200"
                title="取消"
                onPress={() => {
                  console.log("取消");
                  setAddAreaModalVisible(!addAreaModalVisible);
                }}
              />
              <Button
                className="bag-blue-200"
                title="确认"
                onPress={() => {
                  createArea(areaInput);
                  setAreaInput("");
                  setAddAreaModalVisible(!addAreaModalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            console.log("点击了我");
            setAddAreaModalVisible(true);
          }}
        >
          <View>
            <PlusIcon />
          </View>
        </Pressable>
      </View>
      <ScrollView className={"mt-2"}>
        <View className={"flex-row flex-wrap"}>
          {!!areaList &&
            areaList.map((it) => (
              <View className={" w-1/2 h-40 p-2"} key={it.name}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("deviceList", {
                      areaId: it.area_id,
                      name: it.name,
                    });
                  }}
                >
                  <View
                    className={
                      "bg-white  shadow-lg flex-col justify-between rounded-2xl h-full"
                    }
                  >
                    <View className={"flex-row p-4 justify-between"}>
                      <HomeIcon />
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isLivingRoomEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleLivingRoomEnabled}
                        value={isLivingRoomEnabled}
                      />
                    </View>
                    <View className={"p-4 flex-col gap-1"}>
                      <Text className={"font-bold text-xl"}>{it.name}</Text>
                      <View className={"flex-row"}>
                        <Text>6个设备</Text>
                        <Pressable
                          onPress={() => {
                            console.log("press device editing");
                          }}
                        >
                          <PencilSquareIcon />
                        </Pressable>
                      </View>
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
