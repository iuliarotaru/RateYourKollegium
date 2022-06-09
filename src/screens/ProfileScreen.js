import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";
import { kollegiumsAtom } from "../atoms/KollegiumsAtom";
import { getUser } from "../functions/ProfileFunctions";
import { KollegiumCard } from "../components/KollegiumCard";
import PrimaryButton from "../components/PrimaryButton";
import KollegiumSavedCard from "../components/KollegiumSavedCard";
import CustomText from "../components/CustomText";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);

  //Get user's data
  useEffect(() => {
    if (user) {
      const unsubscribe = getUser(user, setUser);
      return unsubscribe;
    }
  }, []);

  //Redirect to KollegiumsDetails when a saved kollegium is pressed
  const handleSavedKollegiumPress = (id) => {
    navigation.navigate("KollegiumsDetails", {
      kollegiumId: id,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {user && (
          <>
            <CustomText style={styles.profileTitle}>Username</CustomText>
            <CustomText style={styles.profileText}>{user?.username}</CustomText>

            <CustomText style={styles.profileTitle}>Email</CustomText>
            <CustomText style={styles.profileText}>{user?.email}</CustomText>

            <CustomText style={styles.profileTitle}>School</CustomText>
            <CustomText style={styles.profileText}>{user?.school}</CustomText>

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

            <CustomText style={[styles.profileTitle, { marginBottom: 10 }]}>
              Saved Kollegiums (
              {user && user.savedKollegiums ? user.savedKollegiums.length : 0})
            </CustomText>

            {/* Show all saved kollegiums */}
            <View style={styles.savedKollegiumsList}>
              {user &&
                user?.savedKollegiums.map((savedKollegium) => {
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

        {/* If user is not signed in, show sign up or log in button */}
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
