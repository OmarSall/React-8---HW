import {useGetArticlesQuery, useDeleteArticleMutation} from "../api/api"
import {useState, useCallback} from "react";
import ArticlesList from "../components/ArticlesList"
import ArticleForm from "../components/ArticleForm";
import Modal from "../components/Modal";

function Home() {
    const {
        data: articles = [],
        error,
        isLoading,
        refetch,
    } = useGetArticlesQuery()
    const [deleteArticle, {isLoading: isDeleting}] = useDeleteArticleMutation();
    const [editingArticle, setEditingArticle] = useState(null);

    const openAddModal = useCallback(() =>
        setEditingArticle(null), []);
    const openEditModal = useCallback((article) =>
        setEditingArticle(article), []);
    const closeModal = useCallback(() =>
        setEditingArticle(null), []);

    const handleDelete = useCallback(
        async (id) => {
            if (window.confirm("Are you sure you want to delete this article?")) {
                try {
                    await deleteArticle(id).unwrap();
                    refetch();
                } catch (error) {
                    alert("Failed to delete the article.");
                    console.error(error);
                }
            }
        },
        [deleteArticle, refetch]
    );

    const handleFormSuccess = useCallback(() => {
        closeModal();
    }, [closeModal, refetch]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Something went wrong.</p>
    }

    return (
        <div>
            <h1>Articles</h1>
            <button onClick={openAddModal}>Add Article</button>
            <ArticlesList
                articles={articles}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />
            {editingArticle !== null && (
                <Modal onClose={closeModal}>
                    <ArticleForm
                        initialData={editingArticle}
                        onSuccess={handleFormSuccess}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Home;