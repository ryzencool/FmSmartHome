import { View, Text, Image, ScrollView, Switch } from "react-native";
import React, { useRef, useState } from "react";
import { Canvas, useRender, useFrame } from "@react-three/fiber/native";
import Box from "../../components/Box";
import SkipBackIcon from "../../components/svg/skipBack";
import SkipFrontIcon from "../../components/svg/skipFrontIcon";
import { LightBulbIcon, PauseIcon } from "react-native-heroicons/outline";
import Slider from "@react-native-community/slider";
import LightIcon from "../../components/svg/lightIcon";

const LiftScreen = () => {
  const [isLiftInEnabled, setIsLiftInEnabled] = useState(false);
  const [isLiftOutEnabled, setIsLiftOutEnabled] = useState(false);

  const toggleLiftInSwitch = () => {
    setIsLiftInEnabled(!isLiftInEnabled);
  };

  const toggleLiftOutSwitch = () => {
    setIsLiftOutEnabled(!isLiftOutEnabled);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View className={"w-full p-4"}>
        <View className={"flex-row bg-white rounded-lg shadow-md w-full h-96"}>
          <View className="w-2/3 h-11/12 bg-white p-4">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Box position={[-1.2, 0, -4]} />
              <Box position={[1.2, 0, 0]} />
            </Canvas>
          </View>
          <View
            className={
              "gap-8 w-1/3 h-full justify-center items-center flex-col"
            }
          >
            <View
              className={
                "flex-row justify-center items-center bg-black rounded-full shadow-lg w-12 h-12 "
              }
            >
              <Text className={"font-bold text-white"}>1</Text>
            </View>
            <View
              className={
                "flex-row justify-center items-center rounded-full shadow-lg w-12 h-12 bg-black"
              }
            >
              <Text className={"font-bold text-white"}>2</Text>
            </View>
            <View
              className={
                "flex-row justify-center items-center rounded-full shadow-lg w-12 h-12 bg-black"
              }
            >
              <Text className={"font-bold text-white"}>3</Text>
            </View>
          </View>
        </View>
        <View
          className={
            "mt-4 w-full h-32 p-4 shadow-lg rounded-2xl  bg-white flex-row"
          }
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            }}
            className={"w-1/3 h-full rounded-lg"}
          />
          <View
            className={
              "w-2/3 h-full flex-col items-center justify-center gap-3  "
            }
          >
            <View className={"w-full flex-row justify-center gap-8"}>
              <SkipBackIcon />
              <PauseIcon />
              <SkipFrontIcon />
            </View>
            <View>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>
        </View>
        <View className={"mt-4 w-full flex-row h-32 "}>
          <View className={" pr-2 w-1/2 h-full"}>
            <View
              className={
                "bg-white rounded-2xl shadow-lg p-4  h-full flex-col justify-between "
              }
            >
              <View className="flex-row  items-center">
                <LightBulbIcon />
                <Text className={"flex-1 text-lg font-bold"}>轿厢</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isLiftInEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleLiftInSwitch}
                  value={isLiftInEnabled}
                />
              </View>
              <View>
                <Slider
                  // style={{ width: 200, height: 40 }}
                  className={"w-11/12 h-10 "}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>
            </View>
          </View>
          <View className={" w-1/2 pl-2 h-full"}>
            <View
              className={
                "bg-white rounded-2xl shadow-lg h-full flex-col justify-between p-4"
              }
            >
              <View className="flex-row items-center">
                <LightBulbIcon />
                <Text className={"flex-1 font-bold text-lg"}>轿厢</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isLiftOutEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleLiftInSwitch}
                  value={isLiftOutEnabled}
                />
              </View>
              <View>
                <Slider
                  // style={{ width: 200, height: 40 }}
                  className={"w-11/12 h-10 "}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LiftScreen;
