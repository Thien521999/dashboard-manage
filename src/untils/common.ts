export const capitalizeString = (str:string):string => {
  if (!str) return "";

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark:any):string => {
    if(typeof mark !== "number") return "No number";
    if(mark >= 8) return "green";
    if(mark >= 4) return "goldenrod";

    return "red";
}