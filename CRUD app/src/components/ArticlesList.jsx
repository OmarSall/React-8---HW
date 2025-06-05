import ArticleCard from "./ArticleCard"
import styles from "./ArticlesList.module.css"

function ArticlesList({articles, onEdit, onDelete}) {
    return (
        <div className={styles.container}>
            {articles.map(article => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default ArticlesList