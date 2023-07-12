import React, { useEffect, useState } from 'react'
import FTopbar from '../../components/frontend/FTopbar'
import Welcome from '../../components/frontend/Welcome'
import FFotter from '../../components/frontend/FFotter'
import { Pagination } from '@mui/material'
import { api_url, asset_url } from '../../baseurl'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FHomepage() {

  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false)
  const [trendingWaiting, setTrendingWaiting] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [trending, setTrending] = useState([])
  const [paginate, setPaginate] = useState(false)

  useEffect(() => {
    initial_data()
    trending_data()
  }, [])

  const handle_pagination = (info, page) => {
    axios.get(api_url + '/blog/get_pg/' + page)
      .then((response) => {
        if(response.data.blogs.length > 0)
          setBlogs(response.data.blogs)
      })
  }


  const initial_data = () => {
    setWaiting(false)
    axios.get(api_url + '/blog/init_data')
      .then((response) => {
        setBlogs(response.data.blogs)
        setWaiting(true)
        if (response.data.blogs.length === 9)
          setPaginate(true)
      })
  }

  const trending_data = () => {
    setTrendingWaiting(false)
    axios.get(api_url + '/blog/trending')
      .then((response) => {
        setTrending(response.data.blogs)
        setTrendingWaiting(true)
      })
  }

  return (
    (waiting && trendingWaiting) ?
      (
        <div className="align-box">
          <FTopbar />
          <Welcome />
          <main className="main" style={{marginBottom: "40px"}}>
            <section id="follower" >
              <div className="follower">
                <p className="findUs">Find us</p>
                <li className="socialMedia">
                  <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                    <img src="../../public/fb.png" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                    <img src="../../public/tw.png" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                    <img src="../../public/ig.png" />
                  </a>
                </li>

              </div>
              <div className="follower">
                <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                  <p className="findUs ourG" style={{ color: "black" }}>Our group</p>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                  <img id="imgFb" src="../../public/fb.png" />
                </a>
              </div>

            </section>

            <section className="articleContainerHome">
              <div className='tt'>
                <h3>
                  RECENTLY NEWS</h3>
                <p>The lastest </p>
              </div>
              <div className="cardContainer">
                {/* <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div>
                <div className="card">
                  <div className="cardThumbnail">
                    <img src="../../public/thumbnail.png" alt="thumbnail" />
                    <p className="cardTitle">Mama stray cat givig five new born babies Mama stray cat givig five new
                      born babies</p>
                  </div>
                </div> */}
                {
                  blogs.map((blog) => {
                    return (
                      <div style={{cursor: "pointer"}} className="card" key={blog.blog_id} onClick={() => {navigate('/blog?blog_id='+blog.blog_id)}}>
                        <div className="cardThumbnail">
                          <img src={asset_url + '/' + blog.image} alt="thumbnail" />
                          <p className="cardTitle">{blog.title}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {
                (paginate) ?
                  (
                    <div className="pagination">
                      <Pagination count={10} color='primary' onChange={handle_pagination} />
                    </div>
                  ) : (null)
              }
            </section>

            <section className="articleRelevant">
              <div className='tt'>
                <h3>
                  TRADING</h3>
                <p> The lastest </p>
              </div>
              <div className="articleRelevantContainer">

                {/* <div className="cardRelevant">

                  <div className="cardRelevantSize">
                    <div className="cardThumbnailRelevant">
                      <img src="../../public/thumbnail.png" alt="thumbnail" />
                    </div>
                  </div>
                  <div>
                    <p className="cardRelevantTittle">Mama stray cat givig five new born babies Mama stray cat givig
                      five new born babies </p>
                  </div>

                </div> */}
                
                {
                  (trending[0]) ?
                  (
                    <div className="cardRelevant" onClick={() => {navigate('/blog?blog_id='+trending[0].blog_id)}}>
                      <div className="cardRelevantSize">
                        <div className="cardThumbnailRelevant">
                          <img src={asset_url + '/' + trending[0].image} alt="thumbnail" />
                        </div>
                      </div>
                      <div>
                        <p className="cardRelevantTittle">{trending[0].title}</p>
                      </div>
                    </div>
                  ) : null
                }

                {
                  (trending[1]) ?
                  (
                    <div className="cardRelevant" onClick={() => {navigate('/blog?blog_id='+trending[1].blog_id)}}>
                      <div className="cardRelevantSize">
                        <div className="cardThumbnailRelevant">
                          <img src={asset_url + '/' + trending[1].image} alt="thumbnail" />
                        </div>
                      </div>
                      <div>
                        <p className="cardRelevantTittle">{trending[1].title}</p>
                      </div>
                    </div>
                  ) : null
                }

                <div className="sponser">
                  <p> Advertising </p>

                </div>
                
                {
                  (trending[2]) ?
                  (
                    <div className="cardRelevant" onClick={() => {navigate('/blog?blog_id='+trending[2].blog_id)}}>
                      <div className="cardRelevantSize">
                        <div className="cardThumbnailRelevant">
                          <img src={asset_url + '/' + trending[2].image} alt="thumbnail" />
                        </div>
                      </div>
                      <div>
                        <p className="cardRelevantTittle">{trending[2].title}</p>
                      </div>
                    </div>
                  ) : null
                }

              </div>


            </section>
          </main>
          <FFotter />
        </div>
      ) :
      (null)
  )
}
