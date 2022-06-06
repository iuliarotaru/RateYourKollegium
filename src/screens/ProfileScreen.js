import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import { kollegiumsAtom } from "../atoms/KollegiumsAtom";
import { getUser } from "../functions/ProfileFunctions";
import { KollegiumCard } from "../components/KollegiumCard";
import PrimaryButton from "../components/PrimaryButton";
import KollegiumSavedCard from "../components/KollegiumSavedCard";

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
        style={styles.savedKollegiumContainer}
      >
        <KollegiumSavedCard kollegium={kollegium} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {user && (
          <>
            <Text style={styles.profileTitle}>Username</Text>
            <Text style={styles.profileText}>{user?.username}</Text>

            <Text style={styles.profileTitle}>Email</Text>
            <Text style={styles.profileText}>{user?.email}</Text>

            <Text style={styles.profileTitle}>School</Text>
            <Text style={styles.profileText}>{user?.school}</Text>

            <PrimaryButton
              onPress={() => auth.signOut()}
              title="Signout"
              style={{
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 25,
                flex: 0,
              }}
            ></PrimaryButton>

            <Text style={[styles.profileTitle, { marginBottom: 10 }]}>
              Saved Kollegiums ({user.savedKollegiums.length})
            </Text>

            <View style={styles.savedKollegiumsList}>
              {user?.savedKollegiums.map((savedKollegium) => {
                const kollegium = kollegiums.find(
                  (k) => k.id === savedKollegium
                );
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSavedKollegiumPress(kollegium.id);
                    }}
                    style={styles.savedKollegiumContainer}
                    key={`saved-kollegium-${kollegium.id}-${Math.random()}`}
                  >
                    <KollegiumSavedCard kollegium={kollegium} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {!user && (
          <PrimaryButton
            onPress={() => navigation.replace("Auth")}
            title="Sign up or log in"
            style={{ alignSelf: "center" }}
          ></PrimaryButton>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 14,
    marginTop: 2.5,
    marginBottom: 20,
  },
  savedKollegiumsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  savedKollegiumContainer: {
    width: "49%",
  },
});
