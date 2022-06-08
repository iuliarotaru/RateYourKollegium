import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticlesScreen from "./ArticlesScreen";
import ArticlesDetailsScreen from "./ArticlesDetailsScreen";
import { Colors } from "../../styles/Theme";

const Stack = createNativeStackNavigator();

const DiscoverScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{ headerShown: true, headerTintColor: Colors.dark }}
      />
      <Stack.Screen
        name="ArticlesDetails"
        component={ArticlesDetailsScreen}
        options={{ headerShown: true, headerTintColor: Colors.dark }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverScreen;
