import styles from "./ArticleCard.module.css"

function ArticleCard({article, onEdit, onDelete}) {
    const { title, content } = article;

    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => onEdit(article)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default ArticleCard