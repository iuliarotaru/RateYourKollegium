import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function StarRating({ rating, setRating, size }) {
  const handleStarRating = (rate) => {
    setRating(rate);
  };
  return (
    <View style={styles.starRating}>
      {[...Array(5)].map((el, index) => (
        <TouchableOpacity
          onPress={() => {
            handleStarRating(index + 1);
          }}
          key={`star-rating-${index}`}
          disabled={setRating ? false : true}
        >
          <FontAwesome
            name={index + 1 <= rating ? "star" : "star-o"}
            size={size ? size : 17}
            color={index + 1 <= rating ? "orange" : "black"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  starRating: {
    flexDirection: "row",
  },
});
