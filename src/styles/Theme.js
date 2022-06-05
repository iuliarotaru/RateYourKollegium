export const Colors = {
  primary: "#EF8872",
  secondary: "pink",
  background: "#F9F9FA",
  text: "black",
  heading: "black",
  buttonText: "white",
  input: "lightgray",
  dark: "black",
  gray: "lightgray",
  transparent: "rgba(255,255,255,0.6)",
  red: "red",
  green: "green",
  pinkTransparent: "rgba(249, 239, 230, 1)",
};

export const TextHierarchy = {
  body: {
    fontSize: 24,
    color: Colors.text,
  },
  heading1: {
    fontSize: 35,
    color: Colors.heading,
  },
  heading2: {
    fontSize: 20,
    color: Colors.heading,
    textAlign: "center",
  },
  button: {
    color: Colors.buttonText,
    textAlign: "center",
  },
};

export const Buttons = {
  primary: {
    color: Colors.buttonText,
    backgroundColor: Colors.primary,
    padding: 10,
    width: "100%",
    maxWidth: "80%",
  },
};

export const Containers = {
  main: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
};

export const Inputs = {
  text: {
    padding: 20,
    backgroundColor: Colors.input,
    width: "100%",
    maxWidth: "80%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: Colors.dark,
  },
};

// export const PrimaryButton = {
//   backgroundColor: "blue",
// };
