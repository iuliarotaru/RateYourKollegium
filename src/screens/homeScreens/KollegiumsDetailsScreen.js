import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { userAtom } from "../../atoms/UserAtom";
import { ScrollView, Keyboard, Linking, TouchableOpacity } from "react-native";
import KollegiumCard from "../../components/KollegiumCard";
import KollegiumContent from "../../components/KollegiumContent";
import KollegiumComments from "../../components/KollegiumComments";

const KollegiumsDetailsScreen = ({ navigation, route }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const [kollegium, setKollegium] = useState(null);

  const [kollegiumRating, setKollegiumRating] = useState(null);
  const [commentsCoords, setCommentsCoords] = useState(null);
  const [scrollViewRef, setScrollViewRef] = useState();

  
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      ref={(ref) => {
        setScrollViewRef(ref);
      }}
    >
      <KollegiumCard
        onPress={null}
        kollegium={kollegium}
        isKollegiumDetails={true}
        commentsCoords={commentsCoords}
        scrollViewRef={scrollViewRef}
        rating={kollegiumRating}
      ></KollegiumCard>

      <KollegiumContent kollegium={kollegium} />

      <KollegiumComments
        kollegium={kollegium}
        setCommentsCoords={setCommentsCoords}
        kollegiumRating={kollegiumRating}
      />
    </ScrollView>
  );
};

export default KollegiumsDetailsScreen;

const styles = StyleSheet.create({});
