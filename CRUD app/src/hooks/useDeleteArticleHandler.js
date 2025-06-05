import {useCallback} from "react";
import {useDeleteArticleMutation} from "../api/api";

export function useDeleteArticleHandler() {
    const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

    const handleDelete = useCallback(
        async (id) => {
            if (window.confirm("Are you sure you want to delete this article?")) {
                try {
                    await deleteArticle(id).unwrap();
                } catch (error) {
                    alert("Failed to delete the article.");
                    console.error(error);
                }
            }
        },
        [deleteArticle]
    );

    return {handleDelete, isDeleting };
}