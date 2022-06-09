import "intl";
import "intl/locale-data/jsonp/en";

//Get formatted date
export const getFormattedDate = (date) => {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${da} ${mo} ${ye}`;
};

//Handl error message based on the provided code
export const getErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email. Please introduce a correct one.";
    default:
      return "An error has occured. Please try again.";
  }
};
