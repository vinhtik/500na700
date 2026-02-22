"use client"

import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import styles from '@/styles/NewsBlock.module.scss'
import { fetchAllNewsClient } from '@/utils/clientApi'

const NewsBlock = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const loadNews = async () => {
        try {
            setLoading(true)
            const data = await fetchAllNewsClient()
            setNews(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
      }
      loadNews()
    }, [])

    if (loading) return (
        <section className={styles.newsBlock}>
        <h1>НОВОСТИ</h1>
        <div className={styles.newsGrid}>
            {news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
        </div>
    </section>
    )
    if (error) return <div>Error: {error}</div>
    
  return (
    <section className={styles.newsBlock}>
        <h1>НОВОСТИ</h1>
        <div className={styles.newsGrid}>
            {news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
        </div>
    </section>
  )
}

export default NewsBlock