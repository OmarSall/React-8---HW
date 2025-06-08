import {useGetArticlesQuery} from "../api/api";
import ArticlesList from "../components/ArticlesList";
import ArticleForm from "../components/ArticleForm";
import Modal from "../components/Modal";
import styles from "./Home.module.css";

import {useArticlesManager} from "../hooks/useArticlesManager";
import {useModalArticleForm} from "../hooks/useModalArticleForm";
import {useDeleteArticleHandler} from "../hooks/useDeleteArticleHandler";

function Home() {
    const {
        data: articles = [],
        error,
        isLoading,
    } = useGetArticlesQuery();

    const {
        searchTerm,
        sortOrder,
        handleSearchChange,
        handleSortChange,
        filteredSortedArticles,
    } = useArticlesManager(articles);

    const {
        editingArticle,
        openAddModal,
        openEditModal,
        closeModal,
        handleFormSuccess,
    } = useModalArticleForm();

    const {handleDelete, isDeleting} = useDeleteArticleHandler();

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Something went wrong.</p>
    }

    return (
        <div className="container">
            <h1>Articles</h1>
            <div className={"styles.controls"}>
                <input
                    type="text"
                    placeholder="Search by title or content"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                    aria-label="Search articles"
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                    aria-label="Sort articles by content length"
                >
                    <option value="asc">Sort by content length: ASC</option>
                    <option value="desc">Sort by content length: DESC</option>
                </select>
            </div>
            <button onClick={openAddModal}>Add Article</button>
            <ArticlesList
                articles={filteredSortedArticles}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />
            {editingArticle !== null && (
                <Modal onClose={closeModal}>
                    <ArticleForm
                        initialData={editingArticle}
                        onSuccess={handleFormSuccess}
                        onDelete={async (id) => {
                            await handleDelete(id);
                            closeModal();
                        }}
                        isDeleting={isDeleting}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Home;