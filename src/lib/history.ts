export const saveHistory = (id: string) => {
  let history: any = localStorage.getItem("history");
  history = JSON.parse(history);
  history.push(id);

  localStorage.setItem("history", JSON.stringify(history));
};
