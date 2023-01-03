import { createStackNavigator } from "@react-navigation/stack";
import AreaListScreen from "../pages/screens/AreaListScreen";
import DeviceDetailScreen from "../pages/screens/DeviceDetailScreen";
import DeviceListScreen from "../pages/screens/DeviceListScreen";

const AreaStackNav = createStackNavigator();

export default function AreaStack() {
  return (
    <AreaStackNav.Navigator>
      <AreaStackNav.Screen name="area" component={AreaListScreen} />
      <AreaStackNav.Screen name="deviceList" component={DeviceListScreen} />
      <AreaStackNav.Screen name="device" component={DeviceDetailScreen} />
    </AreaStackNav.Navigator>
  );
}
