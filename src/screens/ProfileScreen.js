import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/UserAtom";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userAtom);

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
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
