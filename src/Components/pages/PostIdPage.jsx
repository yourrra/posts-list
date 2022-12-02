import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hook/useFetching";
import Loader from "../UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.date);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setComments(response.date);
    });

    useEffect((id) => {
        fetchPostById(id);
        fetchComments(id);
    }, []);

    console.log(post);
    return (
        <div>
            <h1>page post with ID = {params.id}</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    {post.id}. {post.title}
                </div>
            )}
            <h1>Comments</h1>
            {isComLoading ? (
                <Loader />
            ) : (
                <div style={{ marginTop: 15 }}>
                    {comments.map((comm) => (
                        <div key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostIdPage;
