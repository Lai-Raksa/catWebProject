import { Router } from "express"
import {
    create_blog,
    update_blog,
    delete_blog,
    read_blog,
    read_blog_by_id,
    init_data,
    pagination_data,
    trending,
    related,
    init_data_category,
    pagination_data_category,
    read_blog_by_title
} from '../controller/BlogController.js'

const blogRoute = Router()

blogRoute.post('/create_blog', create_blog)
blogRoute.get('/read_blog', read_blog)
blogRoute.get('/read_blog_by_id/:blog_id', read_blog_by_id)
blogRoute.get('/read_blog_by_title/:blog_title', read_blog_by_title)
blogRoute.put('/update_blog', update_blog)
blogRoute.post('/delete_blog', delete_blog)
blogRoute.get('/init_data', init_data)
blogRoute.get('/init_data/:category', init_data_category)
blogRoute.get('/get_pg/:page', pagination_data)
blogRoute.get('/get_pg/:category/:page', pagination_data_category)
blogRoute.get('/trending', trending)
blogRoute.get('/get_related/:category', related)

export default blogRoute