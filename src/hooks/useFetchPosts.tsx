import { useEffect, useState } from 'react'
import { Post } from '../types';
import { fetchPosts } from '../services/apiService';

export const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        })()
    }, []);
    return [posts, setPosts] as const;
}