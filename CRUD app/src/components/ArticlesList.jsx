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
                    onDelete={() => onDelete(article.id)}
                />
            ))}
        </div>
    );
}

export default ArticlesList