import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";
import { userAtom } from "../../atoms/UserAtom";
import KollegiumCard from "../../components/KollegiumCard";
import KollegiumContent from "../../components/KollegiumContent";
import KollegiumComments from "../../components/KollegiumComments";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KollegiumsDetailsScreen = ({ navigation, route }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);

  const [kollegium, setKollegium] = useState(null);
  const [kollegiumRating, setKollegiumRating] = useState(null);
  const [commentsCoords, setCommentsCoords] = useState(null);
  const [scrollViewRef, setScrollViewRef] = useState();

  //kollegiumId is passed through the navigation
  const kollegiumId = route.params.kollegiumId;

  useEffect(() => {
    //Retrieve the current kollegium based on its id
    const ourKollegium = kollegiums.find((data) => {
      return data.id === kollegiumId;
    });
    setKollegium(ourKollegium);

    //Get all reviews with a rating higher than 0
    const commentsWithRating = ourKollegium.comments.filter((comment) => {
      return comment.rating > 0;
    });

    //Calculate the average star rating
    const kollegiumRatingStars =
      commentsWithRating.reduce((sum, comment) => sum + comment.rating, 0) /
      commentsWithRating.length;
    setKollegiumRating(kollegiumRatingStars);
  }, [kollegiums]);

  return (
    <KeyboardAwareScrollView
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
    </KeyboardAwareScrollView>
  );
};

export default KollegiumsDetailsScreen;
