import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { getKollegiums } from "../functions/KollegiumsFunctions";
import { useRecoilState } from "recoil";
import { kollegiumsAtom } from "../atoms/KollegiumsAtom";

const KollegiumsDetailsScreen = ({ navigation, route }) => {
  const [kollegiums, setKollegiums] = useRecoilState(kollegiumsAtom);
  const kollegiumId = route.params.kollegiumId;
  const [kollegium, setKollegium] = useState(null);

  useEffect(() => {
    const ourKollegium = kollegiums.find((data) => {
      return data.id === kollegiumId;
    });
    setKollegium(ourKollegium);
  }, [kollegiums]);

  return (
    <SafeAreaView>
      <Text>{kollegium?.name}</Text>
      <Text>{kollegium?.address}</Text>
      {kollegium?.comments.map((comment) => {
        return <Text key={comment.username}>{comment.text}</Text>;
      })}
    </SafeAreaView>
  );
};

export default KollegiumsDetailsScreen;

const styles = StyleSheet.create({});
