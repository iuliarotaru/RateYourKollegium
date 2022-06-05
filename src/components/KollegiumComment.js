import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../styles/Theme";
import CustomImage from "./CustomImage";
import { getFormattedDate } from "../functions/HelperFunctions";

const KollegiumComment = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentUsername}>{comment.username}</Text>
        <Text style={styles.commentDate}>
          {comment.createdAt ? getFormattedDate(comment.createdAt.toDate()) : ""}
        </Text>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>

      {comment.image.length > 0 && (
        <View style={styles.imageContainer}>
          <CustomImage
            path={comment.image}
            width={100}
            height={100}
          ></CustomImage>
        </View>
      )}
    </View>
  );
};

export default KollegiumComment;

const styles = StyleSheet.create({
  commentContainer: {
    width: "100%",
    maxWidth: "90%",
    alignSelf: "center",
    marginVertical: 12.5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  commentText: {
    fontSize: 14,
    marginVertical: 12.5,
  },
  imageContainer: {
    marginBottom: 12.5,
  },
});
