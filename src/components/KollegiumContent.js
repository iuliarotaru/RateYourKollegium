import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../styles/Theme";
import { ScrollView, Keyboard, Linking, TouchableOpacity } from "react-native";

const KollegiumContent = ({ kollegium }) => {
  const handleReadMoreLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <View style={styles.detailsContainer}>
      <View>
        <Text style={styles.detailsTitle}>Description</Text>
        <Text style={styles.descriptionText}>{kollegium?.description}</Text>
      </View>

      <View>
        <Text style={styles.detailsTitle}>Facilities</Text>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.courtyard ? "check-circle" : "close"}
            color={kollegium?.facilities.courtyard ? Colors.green : Colors.red}
            size={17.5}
          />
          <Text style={styles.facilityText}>Courtyard</Text>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.laundry ? "check-circle" : "close"}
            color={kollegium?.facilities.laundry ? Colors.green : Colors.red}
            size={17.5}
          />
          <Text style={styles.facilityText}>Laundry</Text>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.dogsAllowed ? "check-circle" : "close"}
            color={
              kollegium?.facilities.dogsAllowed ? Colors.green : Colors.red
            }
            size={17.5}
          />
          <Text style={styles.facilityText}>Dogs Allowed</Text>
        </View>
        <View style={styles.facilityRow}>
          <FontAwesome
            name={kollegium?.facilities.catsAllowed ? "check-circle" : "close"}
            color={
              kollegium?.facilities.catsAllowed ? Colors.green : Colors.red
            }
            size={17.5}
          />
          <Text style={styles.facilityText}>Cats Allowed</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleReadMoreLink(kollegium?.readMoreUrl);
        }}
      >
        <Text style={styles.link}>Read more and apply</Text>
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
