import DB from '../db.js'

const conn = DB()

const create_blog = (req, res) => {

    const { title, category, paragraph, image, link, p1, p2, p3, op1, op2, op3, op4, op5, op6 } = req.body
    const info_sql = 'INSERT INTO blogs_info(p1, p2, p3, op1, op2, op3, op4, op5, op6) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'



    conn.query(info_sql, [p1, p2, p3, op1, op2, op3, op4, op5, op6], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        if (title === "" || category === "" || paragraph === "" || image === "")
            return res.status(400).json({
                success: "false",
                message: "please input required data"
            })

        const sql = 'INSERT INTO blogs(title, category, paragraph, image, link, info_id) VALUES (?, ?, ?, ?, ?, ?)'

        conn.query(sql, [title, category, paragraph, image, link, results.insertId], function (err, results) {
            if (err) {
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }

            return res.status(200).json({
                success: "true",
                response: "created successfuly"
            })
        })
    })

}

const read_blog = (req, res) => {
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id ORDER BY bl.blog_id DESC'
    conn.query(sql, [], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const read_blog_by_id = (req, res) => {
    const blog_id = req.param('blog_id')
    const sql = "SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id WHERE bl.blog_id = ?"
    conn.query(sql, [blog_id], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const read_blog_by_title = (req, res) => {
    const blog_title = req.param('blog_title')
    const sql = "SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id WHERE bl.title LIKE ?"
    conn.query(sql, ['%'+blog_title+'%'], function (err, results) {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const trending = (req, res) => {
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id ORDER BY bi.viewer DESC LIMIT 4'
    conn.query(sql, [], function (err, results) {
        if (err) {console.log(err)
            return res.status(400).json({
                success: "false",
                message: err
            })
        }
        
        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const update_blog = (req, res) => {

    const { title, category, paragraph, image, link, p1, p2, p3, op1, op2, op3, op4, op5, op6, blog_id, i_id } = req.body

    const sql_blog = "UPDATE blogs SET title = ?, category = ?, paragraph = ?, image = ?, link = ? WHERE blog_id = ?"
    const sql_blog_info = "UPDATE blogs_info SET p1 = ?, p2 = ?, p3 = ?, op1 = ?, op2 = ?, op3 = ?, op4 = ?, op5 = ?, op6 = ? WHERE i_id = ?"

    conn.query(sql_blog, [title, category, paragraph, image, link, blog_id], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }
        conn.query(sql_blog_info, [p1, p2, p3, op1, op2, op3, op4, op5, op6, i_id], function (err, results) {
            if (err) {
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }

            return res.status(200).json({
                success: "true",
                data: "update successfuly"
            })
        })
    })

}

const delete_blog = (req, res) => {

    const {blog_id, i_id} = req.body
    const sql_blog = "DELETE FROM blogs WHERE blog_id = ?"
    const sql_blog_info = "DELETE FROM blogs_info WHERE i_id = ?"

    conn.query(sql_blog, [blog_id], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }
        conn.query(sql_blog_info, [i_id], function (err, results) {
            if (err) {
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }

            return res.status(200).json({
                success: "true",
                data: "delete successfuly"
            })
        })
    })

}

const init_data = (req, res) => {
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id ORDER BY bl.blog_id DESC LIMIT 9'
    conn.query(sql, [], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const init_data_category = (req, res) => {
    const category = req.param('category')
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id WHERE bl.category = ? ORDER BY bl.blog_id DESC LIMIT 9'
    conn.query(sql, [category], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const pagination_data = (req, res) => {
    const page = req.param('page')
    const offset = (parseInt(page) - 1) * 9
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id ORDER BY bl.blog_id DESC LIMIT 9 OFFSET ?'
    conn.query(sql, [offset], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const pagination_data_category = (req, res) => {
    const category = req.param('category')
    const page = req.param('page')
    const offset = (parseInt(page) - 1) * 9
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id WHERE bl.category = ? ORDER BY bl.blog_id DESC LIMIT 9 OFFSET ?'
    conn.query(sql, [category, offset], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}

const related = (req, res) => {
    const category = req.param('category')
    const sql = 'SELECT * FROM blogs as bl JOIN blogs_info as bi ON bl.info_id = bi.i_id WHERE bl.category = ? ORDER BY bl.blog_id DESC LIMIT 6'
    conn.query(sql, [category], function (err, results) {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: err
            })
        }

        return res.status(200).json({
            success: "true",
            blogs: results
        })
    })
}


export {
    create_blog,
    update_blog,
    delete_blog,
    read_blog,
    read_blog_by_id,
    read_blog_by_title,
    init_data,
    pagination_data,
    pagination_data_category,
    trending,
    related,
    init_data_category
}