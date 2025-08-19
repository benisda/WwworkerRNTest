import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import PostList from "./PostList";
import { useEffect, useState } from "react";
import { Post } from "../types";
import { getFromStorage, saveToStorage } from "../utils";
import { palette, spaces } from "../assets/theme";

type SavedPostsModalProps = {
    onClose: () => void;
}

export const SavedPostsModal = ({ onClose }: SavedPostsModalProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const fetchSavedPosts = async () => {
            const storedPosts = await getFromStorage('posts');
            if (storedPosts) {
                setPosts(storedPosts);
            }
        };
        fetchSavedPosts();
    },[]);

    const onDelete = async (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        saveToStorage('posts', updatedPosts);
    };
    return (
        <View style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Saved Posts</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                <View style={styles.postListContainer}>
                    {
                        posts.length > 0 ?
                        <PostList posts={posts} onDelete={onDelete} />
                        :
                        <Text style={styles.emptyText}>No saved posts</Text>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    modalContent: {
        width: '100%',
        height: '90%',
        paddingVertical: spaces.large,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: spaces.medium,
    },
    closeButton: {
        position: 'absolute',
        top: spaces.medium,
        right: spaces.medium,
        padding: spaces.small,
    },
    closeButtonText: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: spaces.large,
        fontSize: 16,
        color: palette.onSecondary
    },
    postListContainer: {
        flex: 1,
        width: '100%',
    },
});