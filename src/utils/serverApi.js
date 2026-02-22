import fs from 'fs';
import path from 'path';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllNewsServer = async () => {
  await delay(500);
  const jsonPath = path.join(process.cwd(), 'public', 'data', 'news.json');
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(jsonData);
};

export const fetchNewsByIdServer = async (id) => {
  await delay(300);
  const allNews = await fetchAllNewsServer();
  const newsItem = allNews.find(item => item.id == id);
  if (!newsItem) {
    throw new Error('News not found');
  }
  return newsItem;
};