import { Text } from "react-native";

//CustomText component used to apply the font inside the whole app
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
