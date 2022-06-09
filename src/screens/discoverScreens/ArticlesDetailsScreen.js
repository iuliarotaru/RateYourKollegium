import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { articlesAtom } from "../../atoms/ArticlesAtom";
import CustomBackgroundImage from "../../components/CustomBackgroundImage";
import RenderHtml from "react-native-render-html";
import CustomText from "../../components/CustomText";

const ArticlesDetailsScreen = ({ navigation, route }) => {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  const [article, setArticle] = useState(null);

  //articleId is passed through the navigation
  const articleId = route.params.articleId;

  useEffect(() => {
    //Get the article based on the articleId

    const ourArticle = articles.find((data) => {
      return data.id === articleId;
    });
    setArticle(ourArticle);
  }, [articles]);

  const { width } = useWindowDimensions();
  return (
    <ScrollView>
      <CustomBackgroundImage
        path={article?.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <CustomText style={styles.title}>{article?.title}</CustomText>
        {article?.text && (
          <RenderHtml contentWidth={width} source={{ html: article?.text }} />
        )}
      </View>
    </ScrollView>
  );
};

export default ArticlesDetailsScreen;

const styles = StyleSheet.create({
  image: {
    height: 220,
    justifyContent: "flex-end",
  },

  container: {
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
