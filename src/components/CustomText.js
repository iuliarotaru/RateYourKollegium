import { Text } from "react-native";

export default CustomText = (props) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily:
            props.style?.fontWeight === "bold"
              ? "Mulish_700Bold"
              : "Mulish_400Regular",
        },
      ]}
    >
      {props.children}
    </Text>
  );
};
