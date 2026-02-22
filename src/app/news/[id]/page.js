import { fetchAllNewsServer, fetchNewsByIdServer } from "@/utils/serverApi";
import styles from '@/styles/NewsDetail.module.scss';
import Image from "next/image";

export async function generateStaticParams() {
    const allNews = await fetchAllNewsServer();    
    return allNews.map((news) => ({
        id: String(news.id),
    }));
}

export default async function NewsDetailPage({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    try {
        const newsItem = await fetchNewsByIdServer(id);
        
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).slice(0, -3);
        };

        return (
            <div className={styles.newsDetail}>
                
                    {newsItem.image && (
                    <Image 
                        src={newsItem.image}
                        alt={newsItem.heading}
                        className={styles.image}
                        width={300}  
                        height={200} 
                        priority={false}
                        unoptimized={true}
                        />
                    )}
                <div className={styles.newsText}>
                <h1>{newsItem.heading}</h1>
                <p className={styles.date}>{formatDate(newsItem.createdAt)}</p>
                <h2>{newsItem.description}</h2>
                <div className={styles.fullContent}>
                {newsItem.details?.split('\n').map((paragraph, index) => (
                    paragraph.trim() && <p key={index} className={styles.paragraph}>{paragraph}</p>
                ))}
                </div>
                </div>
            </div>
        );
    } catch (error) {
        return error;
    }
}

export const revalidate = 60;