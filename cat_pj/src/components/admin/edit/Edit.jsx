import React, { useState } from 'react'
import "./edit.css"
import { api_url, asset_url } from '../../../baseurl.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateAr() {

  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const blog_id = params.get('blog_id')

  const [i_id, setIID] = useState()
  const [serverimage, setServerimage] = useState("")
  const [serverop1, setServerop1] = useState("")
  const [serverop2, setServerop2] = useState("")
  const [serverop3, setServerop3] = useState("")
  const [serverop4, setServerop4] = useState("")
  const [serverop5, setServerop5] = useState("")
  const [serverop6, setServerop6] = useState("")

  const [option, setOption] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState({})
  const [main_pg, setPg] = useState("")
  const [source, setSource] = useState("")

  const [p1, setP1] = useState("")
  const [p2, setP2] = useState("")
  const [p3, setP3] = useState("")
  const [op1, setOp1] = useState({})
  const [op2, setOp2] = useState({})
  const [op3, setOp3] = useState({})
  const [op4, setOp4] = useState({})
  const [op5, setOp5] = useState({})
  const [op6, setOp6] = useState({})

  useEffect(() => {
    initial_edit()
  },[])

  const initial_edit = () => {
    axios.get(api_url + '/blog/read_blog_by_id/' + blog_id)
      .then((response) => {
        let blog = response.data.blogs[0]
        setTitle(blog.title)
        setCategory(blog.category)
        setPg(blog.paragraph)
        setSource(blog.link)
        setP1(blog.p1)
        setP2(blog.p2)
        setP3(blog.p3)
        setServerimage(blog.image)
        setServerop1(blog.op1)
        setServerop2(blog.op2)
        setServerop3(blog.op3)
        setServerop4(blog.op4)
        setServerop5(blog.op5)
        setServerop6(blog.op6)
        setIID(blog.i_id)
      })
  }

  function openCategory() {
    setOption(!option)
    if (!option) {
      const optionContainer = document.querySelectorAll(".radio")
      const text = document.getElementById("option-text")
      optionContainer.forEach(o => {
        o.addEventListener("click", () => {
          text.innerHTML = o.querySelector("label").innerHTML
          setCategory(o.querySelector("label").innerHTML)
          setOption(false)
        })
      })
    }
  }

  const handle_form = async (e) => {
    e.preventDefault()

    const form_data = new FormData()

    var main_img = ""
    var b_img1 = ""
    var b_img2 = ""
    var b_img3 = ""
    var s_img1 = ""
    var s_img2 = ""
    var s_img3 = ""


    if (image.name){
      main_img = Date.now() + '-' + image.name
      const post_image = new File([image.file], main_img , {type: image.file.type})
      form_data.append('image', post_image)
    } else{
      main_img = serverimage
    }
    if (op1.name){
      b_img1 = Date.now() + '-' + op1.name
      const post_op1 = new File([op1.file], b_img1 , {type: op1.file.type})
      form_data.append('image', post_op1)
    }else{
      b_img1 = serverop1
    }
    if (op2.name){
      b_img2 = Date.now() + '-' + op2.name
      const post_op2 = new File([op2.file], b_img2 , {type: op2.file.type})
      form_data.append('image', post_op2)
    }else{
      b_img2 = serverop2
    }
    if (op3.name){
      b_img3 = Date.now() + '-' + op3.name
      const post_op3 = new File([op3.file], b_img3 , {type: op3.file.type})
      form_data.append('image', post_op3)
    }else{
      b_img3 = serverop3
    }
    if (op4.name){
      s_img1 = Date.now() + '-' + op4.name
      const post_op4 = new File([op4.file], s_img1 , {type: op4.file.type})
      form_data.append('image', post_op4)
    }else{
      s_img1 = serverop4
    }
    if (op5.name){
      s_img2 = Date.now() + '-' + op5.name
      const post_op5 = new File([op5.file], s_img2 , {type: op5.file.type})
      form_data.append('image', post_op5)
    }else{
      s_img2 = serverop5
    }
    if (op6.name){
      s_img3 = Date.now() + '-' + op6.name
      const post_op6 = new File([op6.file], s_img3 , {type: op6.file.type})
      form_data.append('image', post_op6)
    }else{
      s_img3 = serverop6
    }

    try {

      await axios.post(api_url + "/upload/blogs_image", form_data, {
          headers: {"Content-Type": "multipart/form-data"}
      })

      const data = {
        title: title, 
        category: category, 
        image: main_img, 
        paragraph: main_pg, 
        p1: p1, 
        p2: p2, 
        p3: p3, 
        op1: b_img1, 
        op2: b_img2, 
        op3: b_img3, 
        op4: s_img1, 
        op5: s_img2, 
        op6: s_img3, 
        link: source,
        blog_id: blog_id,
        i_id: i_id
      }

      const response = await axios.put(api_url + "/blog/update_blog", data, {withCredentials: true})
      if (response.status === 200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Edit successfully',
          showConfirmButton: false,
          heightAuto: false,
          timer: 1500
        })
        window.setTimeout(() => {
          navigate('/meowadmin/list_news')
        }, 2000)
      }
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        heightAuto: false,
        footer: 'Please provide correct information !!!'
      })
    }

  }

  return (
    <div className='create'>
      <div className="path-container">
        <h4>Edit News</h4>
        <p>
          <span>Home </span>
          /
          <span> Edit</span>
        </p>
      </div>
      <div className="form-container">
        {/* <form onSubmit={handle_form} autoComplete="off" className="sign-in-form"> */}
          <div className="input-field">
            <label htmlFor="title">TITLE</label>
            <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div className="radio-field">
            <label htmlFor="title">CATEGORY</label>
            <div className="arrange-radio">
              <div className="selection" onClick={() => openCategory()}>
                <p id="option-text">SELECT CATEGORY</p>
                <div></div>
              </div>
              <div className="radio-container" style={(option) ? { display: "flex" } : { display: "none" }}>
                <div className="radio">
                  <input type="radio" name="category" id="dg" />
                  <label htmlFor="dg">STORY</label>
                </div>
                <div className="radio">
                  <input type="radio" name="category" id="wb" />
                  <label htmlFor="wb">NEWS</label>
                </div>
                <div className="radio">
                  <input type="radio" name="category" id="nft" />
                  <label htmlFor="nft">CUTE</label>
                </div>
                <div className="radio">
                  <input type="radio" name="category" id="mt" />
                  <label htmlFor="mt">RESCUE</label>
                </div>
              </div>
            </div>
          </div>
          <div className="preview">
            <label htmlFor=""></label>
            {/* <img src={Preview} /> */}
            <img src={ (image.file) ? URL.createObjectURL(image.file) : (serverimage ? (asset_url + '/' + serverimage) : (null)) } />
          </div>
          <div className="image-field">
            <label htmlFor="">IMAGE</label>
            <input type="file" className='custom-file-input' onChange={(e) => setImage({file: e.target.files[0], name: e.target.files[0].name})} required />
          </div>
          <div className="paragraph-field">
            <label htmlFor="">PG</label>
            <textarea value={main_pg} onChange={(e) => setPg(e.target.value)} required></textarea>
          </div>
          <div className="preview">
            <label htmlFor=""></label>
            <img src={ (op1.file) ? URL.createObjectURL(op1.file) : (serverop1 ? (asset_url + '/' + serverop1) : (null)) } />
          </div>
          <div className="image-field">
            <label htmlFor="">OP1</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp1({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="paragraph-field">
            <label htmlFor="">P1</label>
            <textarea value={p1} onChange={(e) => setP1(e.target.value)}></textarea>
          </div>
          <div className="preview">
            <label htmlFor=""></label>
            <img src={ (op2.file) ? URL.createObjectURL(op2.file) : (serverop2 ? (asset_url + '/' + serverop2) : (null)) } />
          </div>
          <div className="image-field">
            <label htmlFor="">OP2</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp2({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="paragraph-field">
            <label htmlFor="">P2</label>
            <textarea value={p2} onChange={(e) => setP2(e.target.value)}></textarea>
          </div>
          <div className="preview">
            <label htmlFor=""></label>
            <img src={ (op3.file) ? URL.createObjectURL(op3.file) : (serverop3 ? (asset_url + '/' + serverop3) : (null)) } />
          </div>
          <div className="image-field">
            <label htmlFor="">OP3</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp3({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="paragraph-field">
            <label htmlFor="">P3</label>
            <textarea value={p3} onChange={(e) => setP3(e.target.value)}></textarea>
          </div>
          <div className="image-field">
            <label htmlFor="">OP4</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp4({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="image-field">
            <label htmlFor="">OP5</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp5({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="image-field">
            <label htmlFor="">OP6</label>
            <input type="file" className='custom-file-input' onChange={(e) => setOp6({file: e.target.files[0], name: e.target.files[0].name})} />
          </div>
          <div className="input-field">
            <label htmlFor="title">SOURCE</label>
            <input value={source} type="text" onChange={(e) => setSource(e.target.value)}/>
          </div>
          <div className="last-preview">
            <img src={ (op4.file) ? URL.createObjectURL(op4.file) : (serverop4 ? (asset_url + '/' + serverop4) : (null)) } />
            <img src={ (op5.file) ? URL.createObjectURL(op5.file) : (serverop5 ? (asset_url + '/' + serverop5) : (null)) } />
            <img src={ (op6.file) ? URL.createObjectURL(op6.file) : (serverop6 ? (asset_url + '/' + serverop6) : (null)) } />
          </div>
          <button onClick={handle_form}>SUBMIT ARTICLE FORM</button>
        {/* </form> */}
      </div>
    </div>
  )
}
