import {useState, useEffect, useCallback} from "react";
import styles from "./ArticleForm.module.css";
import {
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation
} from "../api/api";
import {saveArticlesToLocalStorage, getArticlesFromLocalStorage} from "../localStorage/localStorage";

function ArticleForm({initialData = null, onSuccess}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const [createArticle, {isLoading: isCreating}] = useCreateArticleMutation();
    const [updateArticle, {isLoading: isUpdating}] = useUpdateArticleMutation();
    const [deleteArticle, {isLoading: isDeleting}] = useDeleteArticleMutation();


    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        }
    }, [initialData]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            try {
                if (initialData) {
                    const updated = await updateArticle({
                        id: initialData.id,
                        title,
                        content
                    }).unwrap();
                    onSuccess?.(updated);
                } else {
                    const newArticle = {title, content};
                    const created = await createArticle(newArticle).unwrap();

                    const existing = getArticlesFromLocalStorage();
                    saveArticlesToLocalStorage([created, ...existing]);

                    setTitle("");
                    setContent("");
                    onSuccess?.(created);
                }
            } catch (error) {
                setError("Failed to submit the article. Please try again.");
                console.error("Error while submitting article:", error);
            }
        },
        [title, content, initialData, createArticle, updateArticle, onSuccess]
    );

    const handleDelete = useCallback(
        async () => {
            if (!initialData) return;
            setError(null);

            try {
                await deleteArticle(initialData.id).unwrap();
                onSuccess?.(null);
            } catch (error) {
                setError("Failed to delete the article. Please try again.");
                console.error("Error while deleting article:", error);
            }
        },
        [initialData, deleteArticle, onSuccess]
    );

    const isBusy = isCreating || isUpdating || isDeleting;

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h2>{initialData ? "Edit Article" : "Add New Article"}</h2>
            {error && <div className={styles.error}>{error}</div>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                disabled={isBusy}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
                disabled={isBusy}
            />
            <button
                type="submit"
                disabled={isBusy}
            >
                {isBusy ? (initialData ? "Saving..." : "Adding...") : initialData ? "Update Article" : "Add Article"}
            </button>

            {initialData && (
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isBusy}
                    className={styles.deleteButton}
                >
                    {isDeleting ? "Deleting..." : "Delete Article"}
                </button>
            )}
        </form>
    );
}

export default ArticleForm;