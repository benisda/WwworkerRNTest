import AsyncStorage from '@react-native-async-storage/async-storage';

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const saveToStorage = async (key: string, value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Error saving data', e);
    }
}

export const getFromStorage = async (key: string): Promise<any> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error retrieving data', e);
        return null;
    }
}

export const removeFromStorage = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data', e);
    }
}

export const clearStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing storage', e);
    }
}

export const checkDuplicatePost = (posts: any[], newPost: any): boolean => {
    return posts.some(post => post.title === newPost.title);
}