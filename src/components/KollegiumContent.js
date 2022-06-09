import { StyleSheet, View, Linking, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../styles/Theme";
import CustomText from "./CustomText";

const KollegiumContent = ({ kollegium }) => {
  //Open URL when clicked
  const handleReadMoreLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.detailsContainer}>
      <View>
        <CustomText style={styles.detailsTitle}>Description</CustomText>
        <CustomText style={styles.descriptionText}>
          {kollegium?.description}
        </CustomText>
      </View>

      <View>
        <CustomText style={styles.detailsTitle}>Facilities</CustomText>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.courtyard ? "check-circle" : "close"}
            color={kollegium?.facilities.courtyard ? Colors.green : Colors.red}
            size={17.5}
          />
          <CustomText style={styles.facilityText}>Courtyard</CustomText>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.laundry ? "check-circle" : "close"}
            color={kollegium?.facilities.laundry ? Colors.green : Colors.red}
            size={17.5}
          />
          <CustomText style={styles.facilityText}>Laundry</CustomText>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.dogsAllowed ? "check-circle" : "close"}
            color={
              kollegium?.facilities.dogsAllowed ? Colors.green : Colors.red
            }
            size={17.5}
          />
          <CustomText style={styles.facilityText}>Dogs Allowed</CustomText>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.catsAllowed ? "check-circle" : "close"}
            color={
              kollegium?.facilities.catsAllowed ? Colors.green : Colors.red
            }
            size={17.5}
          />
          <CustomText style={styles.facilityText}>Cats Allowed</CustomText>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleReadMoreLink(kollegium?.readMoreUrl);
        }}
      >
        <CustomText style={styles.link}>Read more and apply</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default KollegiumContent;

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
  },
  detailsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
  },
  facilityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  facilityText: {
    marginLeft: 10,
    fontSize: 16,
  },
  link: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
