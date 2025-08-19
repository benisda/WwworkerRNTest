import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../types';
import { palette, spaces } from '../assets/theme';
import { capitalizeFirstLetter } from '../utils';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    FadeOut,
    LightSpeedInRight
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';


const SWAP_THRESHOLD = 130;

type PostCardProps = {
    post: Post;
    onDelete?: () => void;
    onSave?: () => void;
};

export const PostCard = ({ post, onDelete, onSave }: PostCardProps) => {
    const translateX = useSharedValue(0);
    const hasActionTriggered = useSharedValue(false);
    
    const actionOnThresholdCrossed = (translationX: number) => {
        'worklet';
        if(translationX > 0) {
            if (onSave) {
                runOnJS(onSave)();
            }
        } else {
            if (onDelete) {
                runOnJS(onDelete)();
            }
        }
    }
    
    const panGesture = Gesture.Pan()
        .activeOffsetX([-15, 15])
        .failOffsetY([-20, 20])
        .onUpdate((e) => {
            if ((e.translationX > 0 && !onSave) || (e.translationX < 0 && !onDelete)) {
                return;
            }
            
            if (Math.abs(e.translationY) < Math.abs(e.translationX)) {
                if (Math.abs(e.translationX) < SWAP_THRESHOLD){
                    translateX.value = e.translationX;
                } else if (!hasActionTriggered.value) {
                    hasActionTriggered.value = true;
                    actionOnThresholdCrossed(e.translationX);
                }
            }
        })
        .onEnd(() => {
            translateX.value = withSpring(0, { damping: 50, stiffness: 220 });
            hasActionTriggered.value = false;
        });

    const animatedCardStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedBackgroundColor = useAnimatedStyle(() => ({
        backgroundColor: translateX.value < 0 ? palette.error : palette.secondary,
    }));
    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.cardContainer, animatedBackgroundColor]} exiting={FadeOut} entering={LightSpeedInRight}>
                <View style={styles.bgItems}>
                    <Text style={styles.bgText}>Save 💾</Text>
                    <Text style={styles.bgText}>Delete 🗑️</Text>
                </View>
                <Animated.View style={[styles.card, animatedCardStyle]}>
                    <Text style={styles.title}>{capitalizeFirstLetter(post.title)}</Text>
                    <Text style={styles.body}>{capitalizeFirstLetter(post.body)}</Text>
                    <Text style={styles.authorText}>Author ID: {post.userId}</Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        position: 'relative',
        shadowColor: palette.onSecondary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    card: {
        padding: spaces.medium,
        backgroundColor: palette.background,
        borderRadius: 8,
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        gap: spaces.small,
    },
    bgItems: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: spaces.large,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bgText:{
        color: palette.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14,
        color: palette.onSurface,
    },
    authorText: {
        fontSize: 12,
        color: palette.onSecondary,
    }
});