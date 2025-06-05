import {useState, useCallback} from "react";

export function useModalArticleForm() {
    const [editingArticle, setEditingArticle] = useState(null);

    const openAddModal = useCallback(
        () => setEditingArticle({title: "", content: "", id: null}),
        []
    );

    const openEditModal = useCallback((article) =>
        setEditingArticle(article), []);
    const closeModal = useCallback(() =>
        setEditingArticle(null), []);
    const handleFormSuccess = useCallback(() =>
        closeModal(), [closeModal]);

    return {
        editingArticle,
        openAddModal,
        openEditModal,
        closeModal,
        handleFormSuccess,
    };
}