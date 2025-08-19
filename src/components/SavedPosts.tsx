import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { palette, SAVED_BUTTON_WIDTH, spaces } from '../assets/theme';
import { SavedPostsModal } from './SavedPostsModal';

const SavedPosts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.buttonText}>Saved ⭐</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <SavedPostsModal
                    onClose={() => setIsModalVisible(false)}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spaces.small,
        width: SAVED_BUTTON_WIDTH
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: palette.white,
    },
    button: {
        marginTop: spaces.small,
        padding: spaces.medium,
        backgroundColor: palette.primaryVariant,
        borderRadius: 10,
        borderColor: palette.primary,
        borderWidth: 1,
    },
    buttonText: {
        color: palette.white,
        textAlign: 'center',
    },
});

export default SavedPosts;