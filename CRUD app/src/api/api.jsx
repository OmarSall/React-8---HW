import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "../constants/api";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "API_BASE_URL"
    }),
    tagTypes: ["Article"],
    endpoints: builder => ({
        getArticles: builder.query({
            query: () => "/articles",
            providesTags: ["Article"],
        }),
        getArticleById: builder.query({
            query: (id) => `/articles/${id}`,
            providesTags: ["Article"],
        }),
        createArticle: builder.mutation({
            query: (newArticle) => ({
                url: "/articles",
                method: "POST",
                body: newArticle,
            }),
            invalidatesTags: ["Article"],
        }),
        updateArticle: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `/articles/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: ["Article"],
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `/articles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Article"],
        }),
    }),
});

export default api;

export const {
    useGetArticlesQuery,
    useGetArticleByIdQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
} = api;