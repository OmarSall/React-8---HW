import {useState, useCallback, useMemo} from "react";

export function useArticlesManager(articles) {
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSortChange = useCallback((event) => {
        setSortOrder(event.target.value);
    }, []);

    const filteredSortedArticles = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return articles
            .filter(
                ({title, content}) =>
                    title.toLowerCase().includes(lowerSearch) ||
                    content.toLowerCase().includes(lowerSearch)
            )
            .sort((a, b) =>
                sortOrder === "asc"
                    ? a.content.length - b.content.length
                    : b.content.length - a.content.length
            );
    }, [articles, searchTerm, sortOrder]);

    return {
        searchTerm,
        sortOrder,
        handleSearchChange,
        handleSortChange,
        filteredSortedArticles,
    };
}