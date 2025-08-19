const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}