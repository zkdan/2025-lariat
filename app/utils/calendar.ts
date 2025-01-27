export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export function allYears(){

  const thisYear = 2023 
  // || new Date().getFullYear();
  const listOfYears = [];
  
  for(let i = 2015; i <= thisYear; i++){
    listOfYears.push(i)
  }

  return listOfYears
}