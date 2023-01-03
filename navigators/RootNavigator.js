import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AreaStack from "./AreaStack";
import LiftStack from "./LiftStack";

const RootBottomTab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootBottomTab.Navigator>
        <RootBottomTab.Screen name="lift" component={LiftStack} />
        <RootBottomTab.Screen name="devices" component={AreaStack} />
      </RootBottomTab.Navigator>
    </NavigationContainer>
  );
}
