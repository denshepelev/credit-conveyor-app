import propertiesReader from "properties-reader";
const rateProp = propertiesReader(
  //"D:/dev/credit-conveyor-project/credit-conveyor-app/src/credit-conveyor.properties",
  "src/credit-conveyor.properties",
  "utf-8",
  {
    allowDuplicateSections: true,
  }
);
console.log(rateProp.get("rate"));
