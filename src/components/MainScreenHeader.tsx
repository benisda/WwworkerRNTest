import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette, SAVED_BUTTON_WIDTH, spaces } from '../assets/theme';
import SavedPosts from './SavedPosts';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const MainScreenHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.placeholder} />
            <Animated.Text entering={FadeInDown} style={styles.title}>MyPosts</Animated.Text>
            <SavedPosts />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        padding: spaces.small
    },
    title: {
        fontSize: 36,
        fontWeight: 100,
        textAlign: 'center',
        color: palette.white
    },
    placeholder: {
        width:SAVED_BUTTON_WIDTH
    }
});