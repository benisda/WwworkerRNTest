import { View, StyleSheet} from 'react-native'
import React from 'react'
import { useFetchPosts } from '../hooks/useFetchPosts'
import { MainScreenHeader } from '../components/MainScreenHeader';
import PostList from '../components/PostList';
import { checkDuplicatePost, getFromStorage, saveToStorage } from '../utils';
import type { Post } from '../types';

const MainScreen = () => {
    const [posts, setPosts] = useFetchPosts();
    const deletePost = (postId: number) => {
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
    }
    const savePost = async (postId: number) => {
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
        let storedPosts = await getFromStorage('posts');
        if (!storedPosts) {
            storedPosts = [];
        }
        const newItem: Post | undefined = posts.find(post => post.id === postId);
        if (!newItem) {
            console.warn('Post not found');
            return;
        }
        if (checkDuplicatePost(storedPosts, newItem)) {
            console.warn('Post already saved');
            return;
        }
        storedPosts.push(newItem);
        await saveToStorage('posts', storedPosts);
    }

    return (
        <View style={styles.container}>
            <MainScreenHeader />
            <PostList
                posts={posts}
                onDelete={deletePost}
                onSave={savePost}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MainScreen