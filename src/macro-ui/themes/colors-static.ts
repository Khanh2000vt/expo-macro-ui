export const ColorsStatic = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F75555",
  textError: "#E60001",
  grey: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  light: {
    blue: "#F6FAFD",
    red: "#FFF5F5",
    yellow: "#FFFEE0",
    purple: "#FCF4FF",
    green: "#f8fdf6",
  },
  // add more colors as needed
};

export const ColorLight = {
  primary: "#4b6b3c",
  secondary: "#f1f4e3",
  text: "#212121",
  disabled: "#D8D8D8",
  disButton: "#85A4E2",
  border: "#C3C3CA",
  background: "#ffffff",

  // add more colors as needed
  ...ColorsStatic,
};

export const ColorDark = { ...ColorLight };
