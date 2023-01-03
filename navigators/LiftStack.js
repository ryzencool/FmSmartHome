import { createStackNavigator } from "@react-navigation/stack";
import LiftScreen from "../pages/screens/LiftScreen";

const LiftStackNav = createStackNavigator();

export default function LiftStack() {
  return (
    <LiftStackNav.Navigator>
      <LiftStackNav.Screen name={"LiftScreen"} component={LiftScreen} />
    </LiftStackNav.Navigator>
  );
}
