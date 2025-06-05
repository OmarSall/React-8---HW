import {useState, useEffect, useCallback} from "react";
import styles from "./ArticleForm.module.css";
import {
    useCreateArticleMutation,
    useUpdateArticleMutation,
} from "../api/api";
import {saveArticlesToLocalStorage, getArticlesFromLocalStorage} from "../localStorage/localStorage";

function ArticleForm({initialData = null, onSuccess, onDelete, isDeleting = false}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const [createArticle, {isLoading: isCreating}] = useCreateArticleMutation();
    const [updateArticle, {isLoading: isUpdating}] = useUpdateArticleMutation();

    useEffect(() => {
        if (initialData) {
            setTitle(String(initialData.title ?? ""));
            setContent(String(initialData.content ?? ""));
        }
    }, [initialData]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            try {
                if (initialData && initialData.id !== null) {
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
                setError("Error while submitting article:");
                alert("Submission failed. Check the console for details.");
                console.error("Error while submitting article:", error);
            }
        },
        [title, content, initialData, createArticle, updateArticle, onSuccess]
    );

    const isBusy = isCreating || isUpdating || isDeleting;

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h2>{initialData.id ? "Edit Article" : "Add New Article"}</h2>
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
                {isBusy ? (initialData?.id ? "Saving..." : "Adding...") : initialData?.id ? "Update Article" : "Add Article"}
            </button>

            {initialData.id && onDelete && (
                <button
                    type="button"
                    onClick={() => onDelete?.(initialData.id)}
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