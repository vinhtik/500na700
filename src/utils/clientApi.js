const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllNewsClient = async () => {
  await delay(500);
  const response = await fetch('/data/news.json');
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
};

export const fetchNewsByIdClient = async (id) => {
  await delay(300);
  const response = await fetch('/data/news.json');
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const allNews = await response.json();
  const newsItem = allNews.find(item => item.id == id);
  if (!newsItem) {
    throw new Error('News not found');
  }
  return newsItem;
};