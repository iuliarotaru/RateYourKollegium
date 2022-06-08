import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KollegiumsScreen from "./KollegiumsScreen";
import KollegiumsDetailsScreen from "./KollegiumsDetailsScreen";
import { Colors } from "../../styles/Theme";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Kollegiums"
        component={KollegiumsScreen}
        options={{ headerShown: true, headerTintColor: Colors.dark }}
      />
      <Stack.Screen
        name="KollegiumsDetails"
        component={KollegiumsDetailsScreen}
        options={{ headerShown: true, headerTintColor: Colors.dark }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
