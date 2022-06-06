import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/Theme";
import CustomBackgroundImage from "./CustomBackgroundImage";

//example stateless component
const KollegiumSavedCard = ({ kollegium }) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomBackgroundImage
          path={kollegium?.image}
          style={styles.image}
          resizeMode="cover"
        >
          <Text style={styles.kollegiumName}>{kollegium?.name}</Text>
        </CustomBackgroundImage>
      </View>
    </View>
  );
};

export default KollegiumSavedCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
  },

  image: {
    height: 200,
    justifyContent: "flex-end",
  },

  kollegiumName: {
    backgroundColor: Colors.transparent,
    paddingVertical: 15,
    width: "100%",
    textAlign: "center",
  },
});
