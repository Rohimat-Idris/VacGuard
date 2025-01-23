export async function savePushTokenToBackend(token: string, userId: number) {
    try {
        const response = await fetch('http://192.168.0.4/vaxkids/api/save_token.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, userId }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving token:', error);
    }
}
