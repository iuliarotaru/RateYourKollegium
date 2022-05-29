import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { getKollegiums } from "../../functions/KollegiumsFunctions";
import { TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../../atoms/KollegiumsAtom";

const ArticlesScreen = ({ navigation }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  useEffect(() => {
    const unsubscribe = getKollegiums(setKollegiums);
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      {kollegiums.map((kollegium) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArticlesDetails", {
                kollegiumId: kollegium.id,
              })
            }
            key={kollegium.name}
          >
            <View>
              <Text>{kollegium.name}</Text>
              <Text>{kollegium.address}</Text>
              <Text>{kollegium.postalCode}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({});
