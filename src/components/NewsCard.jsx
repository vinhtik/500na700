import React from 'react'
import styles from '@/styles/NewsCard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const NewsCard = ({ news }) => {
  return (
    <div className={styles.card}>
        <Link href={`/news/${news.id}`}>
        {news.image && (
            <Image 
            src={news.image}
            alt={news.heading}
            className={styles.image}
            width={300}  
            height={200} 
            priority={false}
            unoptimized={true}
            />
        )}
        <div className={styles.content}>
            <h2 
                className={styles.heading}
                data-text={news.heading}>
                {news.heading}
            </h2>
            <p className={styles.description}>{news.description}</p>
            <div className={styles.meta}>
                <span className={styles.date}>
                    {new Date(news.createdAt).toLocaleDateString('ru-Ru', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).slice(0, -3)}
                </span>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default NewsCard