import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { addCommentsToKollegium } from "../../functions/KollegiumsFunctions";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { userAtom } from "../../atoms/UserAtom";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomImage from "../../components/CustomImage";
import { ScrollView, Keyboard } from "react-native";
import StarRating from "../../components/StarRating";

const KollegiumsDetailsScreen = ({ navigation, route }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const [kollegium, setKollegium] = useState(null);
  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageUri, setCommentImageUri] = useState(null);
  const [rating, setRating] = useState(0);
  const [kollegiumRating, setKollegiumRating] = useState(null);

  const kollegiumId = route.params.kollegiumId;

  useEffect(() => {
    const ourKollegium = kollegiums.find((data) => {
      return data.id === kollegiumId;
    });
    setKollegium(ourKollegium);

    const commentsWithRating = ourKollegium.comments.filter((comment) => {
      return comment.rating > 0;
    });
    const kollegiumRatingStars =
      commentsWithRating.reduce((sum, comment) => sum + comment.rating, 0) /
      commentsWithRating.length;
    setKollegiumRating(kollegiumRatingStars);
  }, [kollegiums]);

  const handleComment = () => {
    Keyboard.dismiss();
    if (comment.length > 0) {
      addCommentsToKollegium(
        comment,
        commentImage,
        rating,
        user.username,
        kollegium.id
      );
    } else {
      Alert.alert("Error", "add a comment");
    }
  };

  const handleFileInput = async () => {
    if (commentImageUri) {
      setCommentImage(null);
      setCommentImageUri(null);
    } else {
      // let result = await getDocumentAsync({ type: "image/*" });
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const fetchResponse = await fetch(result.uri);
        const fileBlob = await fetchResponse.blob();
        setCommentImage(fileBlob);
        setCommentImageUri(result.uri);
      }
      // if (result != null && result.type === "success") {
      //   const fetchResponse = await fetch(result.uri);
      //   const fileBlob = await fetchResponse.blob();
      //   setCommentImage(fileBlob);
      //   setCommentImageUri(result.name);
      // }
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Text>{kollegium?.name}</Text>
        <Text>{kollegium?.address}</Text>
        <StarRating rating={kollegiumRating} setRating={null} />
        {user && (
          <>
            <Button
              onPress={() => handleFileInput()}
              title={commentImageUri ? "Remove Image" : "Upload Image"}
            ></Button>
            {commentImageUri && (
              <Image
                source={{ uri: commentImageUri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <TextInput
              onChangeText={setComment}
              value={comment}
              placeholder="Add a comment"
            />
            <StarRating rating={rating} setRating={setRating} />
            <Button
              onPress={() => handleComment()}
              title="Add a comment"
            ></Button>
          </>
        )}
        {kollegium?.comments.map((comment, index) => {
          return (
            <View key={`comment-${index}`}>
              <Text>{comment.username}</Text>
              <Text>{comment.text}</Text>
              {comment.image.length > 0 && (
                <CustomImage path={comment.image}></CustomImage>
              )}
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};

export default KollegiumsDetailsScreen;

const styles = StyleSheet.create({});
