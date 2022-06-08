import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { useRecoilState } from "recoil";
import { articlesAtom } from "../../atoms/ArticlesAtom";
import ArticleCard from "../../components/ArticleCard";
import { getArticles } from "../../functions/ArticlesFunctions";
import { useEffect } from "react";

const ArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  useEffect(() => {
    const unsubscribe = getArticles(setArticles);
    return unsubscribe;
  }, []);

  const renderArticle = ({ item }) => (
    <View style={styles.articleContainer}>
      <ArticleCard
        onPress={() =>
          navigation.navigate("ArticlesDetails", {
            articleId: item.id,
          })
        }
        article={item}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={articles}
        keyExtractor={(article) => `${article.id}-${Math.random()}`}
        renderItem={renderArticle}
      />
    </SafeAreaView>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  articleContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    flex: 1,
  },
});
