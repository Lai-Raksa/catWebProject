import DB from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const conn = DB()

const register = async (req, res) => {

    const {email, username, password} = req.body
    const sql = 'INSERT INTO users(email, username, password) VALUES (?, ?, ?)'

    try {
        const hashing = await bcrypt.hash(password, '$2b$10$e1c1hPTyXVjKy4wN1PErte')
        conn.query(sql, [email, username, hashing], function(err, results){
            if (err){
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }
            return res.status(200).json({
                success: "true",
                response: "register successfuly"
            })
        })
    } catch (error) {
        console.log(error)
    }

}

const login = async (req, res) => {
    const {identify, password} = req.body
    const sql = 'SELECT user.* FROM users as user WHERE user.email = ? OR user.username = ?'
    try {
        const hashing = await bcrypt.hash(password, '$2b$10$e1c1hPTyXVjKy4wN1PErte')
        conn.query(sql, [identify, identify], function(err, results){
            if (err){
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }
    
            if (results.length === 0)
                return res.status(200).json({
                    success: 0,
                    message: 'no user found'
                })
    
            if ( hashing !== results[0].password )
                return res.status(200).json({
                    success: 0,
                    message: 'password incorrect'
                })
    
            let embed_data = {
                success: 1,
                id: results[0].id,
                email: results[0].email,
                username: results[0].username
            }
            console.log(embed_data)
            const token = GenerateToken(embed_data)
    
            return res.status(200).cookie('accessToken', JSON.stringify(token), {
                sameSite: 'strict',
                path: '/',
                secure: true,
                expires: new Date(new Date().getTime() + 3600 * 1000),
                httpOnly: true
            }).send(embed_data)
    
        })
    } catch (error) {
        return res.status(400).json({
            success: "false",
            message: err
        })
    }
    
}

const reset_password = async (req, res) => {
    const {current_password, new_password, id} = req.body

    try {
        const sql = 'SELECT user.* FROM users as user WHERE user.id = ?'
        const current_password_hash = await bcrypt.hash(current_password, '$2b$10$e1c1hPTyXVjKy4wN1PErte')
        const new_password_hash = await bcrypt.hash(new_password, '$2b$10$e1c1hPTyXVjKy4wN1PErte')
        conn.query(sql, [id], function(err, results){
            if (err){
                return res.status(400).json({
                    success: "false",
                    message: err
                })
            }

            if (current_password_hash === results[0].password){
                const update_sql = 'UPDATE users SET password = ? WHERE id = ?'
                conn.query(update_sql, [new_password_hash, id], function(err2, results2){
                    if (err2){
                        return res.status(400).json({
                            success: "false",
                            message: err2
                        })
                    }

                    return res.status(200).json({
                        success: 'true',
                        message: 'update successfully'
                    })
                })
            }else{
                return res.status(400).json({
                    success: 'true',
                    message: 'currect password incorrect'
                })
            }
            
        })
    } catch (error) {
        if (err){
            return res.status(400).json({
                success: "false",
                message: err
            })
        }
    }
}

const checkauth = async (req, res) => {
    const cookie = req.cookies

    if (cookie.accessToken === undefined) return res.status(203).json({success: 0})

    const accessToken = cookie.accessToken.split('"')[1]

    const user_info = VerifyToken(accessToken)

    if (!user_info){
        return res.status(203).json({success: 0})
    } 

    return res.status(200).json({
        success: 1,
        userdata: user_info.data
    })
}

const logout = async (req, res) => {
    return res.status(204).clearCookie('accessToken').send("Logout successfuly")
}

function GenerateToken(user) {
    return jwt.sign({
        data: user,
    },"$2y$10$S8Dzdw8SqcCz7QCGPOfHVuzIa3EoQlBVHl05udPyCgyFaLIyjtqpC", { expiresIn: '2400s' })
}

function VerifyToken(token) {

    if (token == null) return null

    const user_info = jwt.verify(token, "$2y$10$S8Dzdw8SqcCz7QCGPOfHVuzIa3EoQlBVHl05udPyCgyFaLIyjtqpC", (err, user) => {
        if (err) return null
        return user
    })

    return user_info
}

export {
    register,
    login,
    checkauth,
    logout,
    reset_password
}