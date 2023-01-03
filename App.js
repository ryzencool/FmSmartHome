import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiftScreen from "./pages/screens/LiftScreen";
import DeviceListScreen from "./pages/screens/DeviceListScreen";
import RootNavigator from "./navigators/RootNavigator";
import { Provider, useAtom } from "jotai";
import { keyMsgStoreAtom, msgIdStoreAtom, statesStore } from "./store/wsStore";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ReadyState } from "react-use-websocket";

export default function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8123/api/websocket",
    {
      share: true,
      filter: (message) => {
        let type = JSON.parse(message.data).type;
        if (type != null) {
          return true;
        }
        return false;
      },
    }
  );

  useEffect(() => {
    if (lastMessage != null) {
      let data = JSON.parse(lastMessage.data);
      if (data.type === "auth_required") {
        sendMessage(
          JSON.stringify({
            type: "auth",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5NzEzMjBjNTdhMTY0OTRjYTU1Zjc5MjUxZjgzNGRkMyIsImlhdCI6MTY3MDgyNzU5MCwiZXhwIjoxOTg2MTg3NTkwfQ.M0j4Vneomw3Ur7qGAzQNJoDl_99MNTaG5FQrgqL0jX4",
          })
        );
      }
      if (data.type === "auth_ok") {
        console.log("链接成功");
      }
      if (data.type == "result") {
        console.log(data.id);
        let func = keyMsg.get(data.id);
        if (func != null) {
          func(data.result);
        }
      }
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}
