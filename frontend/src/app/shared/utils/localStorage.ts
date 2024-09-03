export function saveDataToLS(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadDataFromLS(key: string) {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : '';
}
