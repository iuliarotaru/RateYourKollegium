export const Colors = {
  primary: "#EF8872",
  secondary: "#3C8987",
  background: "#F9F9FA",
  text: "#1B1B1B",
  dark: "#1B1B1B",
  gray: "lightgray",
  transparent: "rgba(255,255,255,0.6)",
  lightPink: "rgba(249, 239, 230, 1)",
  light: "#ffffff",
};

export const TextHierarchy = {
  body: {
    fontSize: 24,
    color: Colors.text,
  },
  heading1: {
    fontSize: 35,
    color: Colors.text,
  },
  heading2: {
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
  },
  button: {
    color: Colors.light,
    textAlign: "center",
  },
  buttonSecondary: {
    color: Colors.primary,
    textAlign: "center",
  },
};

export const Buttons = {
  primary: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: "100%",
    maxWidth: "80%",
  },
  secondary: {
    backgroundColor: Colors.light,
    borderWidth: 2,
    borderColor: Colors.primary,
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
    backgroundColor: Colors.gray,
    width: "100%",
    maxWidth: "80%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: Colors.dark,
  },
};
