import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../styles/Theme";
import CustomBackgroundImage from "./CustomBackgroundImage";

const ArticleCard = ({ article, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <CustomBackgroundImage
          path={article?.image}
          style={styles.image}
          resizeMode="cover"
        >
          <Text style={styles.articleName}>{article?.title}</Text>
        </CustomBackgroundImage>
      </TouchableOpacity>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  image: {
    height: 220,
    justifyContent: "flex-end",
  },

  articleName: {
    backgroundColor: Colors.transparent,
    padding: 15,
    width: "100%",
    textAlign: "left",
  },
});
