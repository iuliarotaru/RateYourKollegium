import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useRecoilState } from "recoil";
import { articlesAtom } from "../../atoms/ArticlesAtom";
import ArticleCard from "../../components/ArticleCard";
import { FlatList } from "react-native";
import { getArticles } from "../../functions/ArticlesFunctions";
import { useEffect } from "react";

const ArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  useEffect(() => {
    const unsubscribe = getArticles(setArticles);
    return unsubscribe;
  }, []);

  const renderArticle = ({ item }) => (
    <ArticleCard
      onPress={() =>
        navigation.navigate("ArticlesDetails", {
          articleId: item.id,
        })
      }
      article={item}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.articlesContainer}>
        <FlatList
          data={articles}
          keyExtractor={(article) => `${article.id}-${Math.random()}`}
          renderItem={renderArticle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  articlesContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
  },
});
