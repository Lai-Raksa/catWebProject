import React, { useEffect, useState } from 'react'
import './article.css'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api_url, asset_url } from '../../../baseurl'

export default function Article(props) {

    const navigate = useNavigate()
    const [waiting, setWaiting] = useState(false)
    const [blogs, setBlogs] = useState()
    const [query, setQuery] = useState("")


    useEffect(() => {
        get_blogs()
    }, [])

    const handleQuery = (e) => {
        e.preventDefault()
        if (query === ""){
            axios.get(api_url + '/blog/read_blog')
            .then((response) => {
                setBlogs(response.data.blogs)
            })
        }else{
            axios.get(api_url + '/blog/read_blog_by_title/' + query)
            .then((response) => {
                setBlogs(response.data.blogs)
            })
        }
    }

    const get_blogs = () => {
        setWaiting(false)
        axios.get(api_url + '/blog/read_blog')
            .then((response) => {
                setBlogs(response.data.blogs)
                setWaiting(true)
            })
    }

    const delete_blogs =  (blog_id, i_id) => {
        Swal.fire({
            title: 'Do you want to delete the article?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            heightAuto: false
          }).then((result) => {

            if (result.isConfirmed) {
                axios.post(api_url + '/blog/delete_blog', {blog_id, i_id})
                .then((response) => {
                    if (response.status === 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Article has been deleted',
                            heightAuto: false
                        })
                        axios.get(api_url + '/blog/read_blog')
                            .then((response) => {
                                setBlogs(response.data.blogs)
                            })
                    }
                })
            } 
          })
    }

    return (
        <div className="article">
            <div className="path-container">
                <h4>Created News</h4>
                <p>
                    <span>Home </span>
                    /
                    <span> Blogs</span>
                </p>
            </div>
            <div className="search-box">
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleQuery}>SEARCH</button>
            </div>

            {
                (waiting) ? (
                    blogs.map((blog) => {
                        return (
                            <div className="box" key={blog.blog_id}>
                                <div className="image-container">
                                    <img src={asset_url + '/' + blog.image} />
                                </div>
                                <div className="description">
                                    <div className="ds">
                                        <div className="flex-box">
                                            <h2>TITLE</h2>
                                            <h4>: {blog.title}</h4>
                                        </div>
                                        <div className="flex-box">
                                            <h2>VIEWER</h2>
                                            <h4>: {}</h4>
                                        </div>
                                        <div className="flex-box">
                                            <h2>Link</h2>
                                            <h4>: {blog.link}</h4>
                                        </div>
                                        <div className="flex-box">
                                            <h2>CREATED AT</h2>
                                            <h4>: 2019 - Jan - Monday</h4>
                                        </div>
                                    </div>
                                    <div className="bt">
                                        <button onClick={() => {navigate('/meowadmin/edit_news?blog_id=' + blog.blog_id)}}>EDIT</button>
                                        <button onClick={() => {delete_blogs(blog.blog_id, blog.info_id)}}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (null)
            }

        </div>
    )
}
