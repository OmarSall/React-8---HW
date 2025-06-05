const LOCAL_STORAGE_KEY = "articles";

export function saveArticlesToLocalStorage(articles) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    } catch (error) {
        console.error("Error for saving to localStorage", error);
    }
}

export function getArticlesFromLocalStorage() {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Error from getting article from localStorage", error);
        return [];
    }
}