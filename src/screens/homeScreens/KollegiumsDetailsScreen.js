import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { addCommentsToKollegium } from "../../functions/KollegiumsFunctions";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { userAtom } from "../../atoms/UserAtom";
import { Alert } from "react-native";

const KollegiumsDetailsScreen = ({ navigation, route }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const [kollegium, setKollegium] = useState(null);
  const [comment, setComment] = useState("");

  const kollegiumId = route.params.kollegiumId;

  useEffect(() => {
    const ourKollegium = kollegiums.find((data) => {
      return data.id === kollegiumId;
    });
    setKollegium(ourKollegium);
  }, [kollegiums]);

  const handleComment = () => {
    if (comment.length > 0) {
      addCommentsToKollegium(comment, user.username, kollegium.id);
    } else {
      Alert.alert("Error", "add a comment");
    }
  };

  return (
    <SafeAreaView>
      <Text>{kollegium?.name}</Text>
      <Text>{kollegium?.address}</Text>
      {user && (
        <TextInput
          onChangeText={setComment}
          value={comment}
          placeholder="Add a comment"
        />
      )}
      {user && (
        <Button onPress={() => handleComment()} title="Add a comment"></Button>
      )}
      {kollegium?.comments.map((comment, index) => {
        return (
          <View key={`comment-${index}`}>
            <Text>{comment.username}</Text>
            <Text>{comment.text}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default KollegiumsDetailsScreen;

const styles = StyleSheet.create({});
