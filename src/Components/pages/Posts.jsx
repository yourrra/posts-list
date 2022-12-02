import React, { useState, useEffect } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../hook/useFetching";
import { usePosts } from "../hook/UsePost";
import PostFilter from "../PostFilter";
import PostForm from "../PostForm";
import PostList from "../PostList";
import MyButton from "../UI/button/MyButton";
import Loader from "../UI/loader/Loader";
import MyModal from "../UI/modal/MyModal";
import Pagination from "../UI/pagination/Pagination";
import { getPagesCount } from "../utils/pages";
import "../../style/App.css";
import { useRef } from "react";
import { useObserver } from "../hook/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPost, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPagesCount(totalCount, limit));
        }
    );

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPost(limit, page);
    }, [page, limit]);

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0px" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue="Number of items per page"
                options={[
                    { value: 5, name: "5" },
                    { value: 10, name: "10" },
                    { value: 25, name: "25" },
                    { value: -1, name: "Show all" },
                ]}
            />
            {postError && <h1>Error ${postError}</h1>}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"About JS"}
            />
            <div ref={lastElement} style={{ height: 20, background: "red" }} />
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            )}
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
