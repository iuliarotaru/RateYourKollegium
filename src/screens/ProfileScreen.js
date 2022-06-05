import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import { kollegiumsAtom } from "../atoms/KollegiumsAtom";
import { getUser } from "../functions/ProfileFunctions";
import { KollegiumCard } from "../components/KollegiumCard";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);

  useEffect(() => {
    if (user) {
      const unsubscribe = getUser(user, setUser);
      return unsubscribe;
    }
  }, []);

  const handleSavedKollegiumPress = (id) => {
    navigation.navigate("KollegiumsDetails", {
      kollegiumId: id,
    });
  };

  const renderKollegium = ({ item }) => {
    const kollegium = kollegiums.find((k) => k.id === item);
    return (
      <TouchableOpacity
        onPress={() => {
          handleSavedKollegiumPress(kollegium.id);
        }}
      >
        <Text>{kollegium.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text>profile screen</Text>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.school}</Text>
      {user && <Button onPress={() => auth.signOut()} title="Signout"></Button>}
      {!user && (
        <Button
          onPress={() => navigation.replace("Auth")}
          title="Sign up or log in"
        ></Button>
      )}
      <FlatList
        data={user?.savedKollegiums}
        keyExtractor={(kollegium) => `${kollegium}-${Math.random()}`}
        renderItem={renderKollegium}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
