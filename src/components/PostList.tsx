import React from 'react';
import { StyleSheet } from 'react-native';
import { Post } from '../types';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { PostCard } from './PostCard';
import { spaces } from '../assets/theme';

type PostListProps = {
    onDelete?: (postId: number) => void;
    onSave?: (postId: number) => void;
    posts: Post[];
}

const PostList = ({ onDelete, onSave, posts }: PostListProps) => {
    return (
        <Animated.FlatList
            data={posts}
            itemLayoutAnimation={LinearTransition}
            keyExtractor={(item) => item.id.toString()+item.title}
            renderItem={({ item }) => 
            <PostCard post={item} onDelete={onDelete && (() => onDelete(item.id))} onSave={onSave && (() => onSave(item.id))} />}
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={true}
            scrollEventThrottle={16}
            decelerationRate="normal"
            snapToAlignment="start"
            snapToOffsets={[]}
        />
    );
}

const styles = StyleSheet.create({
    flatList: {
        padding: spaces.medium,
        gap: spaces.medium,
    }
});

export default PostList;