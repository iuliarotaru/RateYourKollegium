import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../styles/Theme";
import CustomBackgroundImage from "./CustomBackgroundImage";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";
import StarRating from "./StarRating";
import {
  saveKollegium,
  removeSavedKollegium,
} from "../functions/KollegiumsFunctions";
import { userAtom } from "../atoms/UserAtom";
import { useRecoilState } from "recoil";

const KollegiumCard = ({
  onPress,
  kollegium,
  isKollegiumDetails,
  commentsCoords,
  scrollViewRef,
  rating,
}) => {
  const [user, setUser] = useRecoilState(userAtom);

  const toggleSaveKollegium = async () => {
    try {
      if (!user?.savedKollegiums.includes(kollegium.id)) {
        await saveKollegium(user.uid, kollegium.id);
        setUser({
          ...user,
          savedKollegiums: [...user.savedKollegiums, kollegium.id],
        });
      } else {
        //Remove saved kollegium
        await removeSavedKollegium(user.uid, kollegium.id);

        //Make a hard copy of the state in order to remove the clicked kollegium
        const userKollegiums = Object.assign([], user?.savedKollegiums);
        userKollegiums.splice(userKollegiums.indexOf(kollegium.id), 1);
        setUser({
          ...user,
          savedKollegiums: userKollegiums,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error has occured while saving the kollegium.");
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
      <View
        style={
          isKollegiumDetails
            ? styles.containerKollegiumDetails
            : styles.container
        }
      >
        <View>
          <CustomBackgroundImage
            path={kollegium?.image}
            style={styles.image}
            resizeMode="cover"
          >
            <View style={styles.backgroundImageSaveIconContainer}>
              {user && (
                <TouchableOpacity
                  style={styles.saveIcon}
                  onPress={toggleSaveKollegium}
                >
                  <FontAwesome
                    name={
                      user?.savedKollegiums.includes(kollegium?.id)
                        ? "bookmark"
                        : "bookmark-o"
                    }
                    color={
                      user?.savedKollegiums.includes(kollegium?.id)
                        ? Colors.primary
                        : Colors.dark
                    }
                    size={20}
                  ></FontAwesome>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.backgroundImageTitleContainer}>
              <Text style={styles.kollegiumName}>{kollegium?.name}</Text>
            </View>
          </CustomBackgroundImage>
        </View>

        {isKollegiumDetails && (
          <View style={styles.kollegiumDetailsGoToReviews}>
            <View style={styles.isKollegiumDetailsButton}>
              <PrimaryButton
                onPress={() => {
                  scrollViewRef.scrollTo({
                    x: 0,
                    y: commentsCoords,
                    animated: true,
                  });
                }}
                title={"Go to reviews"}
                style={{ maxWidth: "100%", marginTop: 10 }}
              />
            </View>

            <StarRating rating={rating} setRating={null} />
          </View>
        )}

        <View
          style={
            isKollegiumDetails
              ? styles.textContainerKollegiumDetails
              : styles.textContainer
          }
        >
          <View style={styles.priceAndReviewsContainer}>
            <Text>{`${kollegium?.priceMin} - ${kollegium?.priceMax} kr.`}</Text>
            <Text>{`(${kollegium?.comments.length} reviews)`}</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text>
              <FontAwesome name={"map-marker"} size={20} />
            </Text>
            <Text> {`${kollegium?.address}, ${kollegium?.postalCode}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default KollegiumCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  containerKollegiumDetails: {
    maxWidth: "100%",
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    height: 220,
  },
  backgroundImageSaveIconContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
  },
  backgroundImageTitleContainer: {
    width: "100%",
  },
  saveIcon: {
    backgroundColor: Colors.pinkTransparent,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginRight: 10,
  },
  kollegiumName: {
    backgroundColor: Colors.transparent,
    paddingVertical: 15,
    width: "100%",
    textAlign: "center",
  },
  kollegiumDetailsGoToReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  textContainer: {
    marginTop: 15,
  },
  textContainerKollegiumDetails: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  priceAndReviewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
