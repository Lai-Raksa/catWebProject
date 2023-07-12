import React, { useEffect, useState } from 'react'
import FTopbar from '../../components/frontend/FTopbar'
import Welcome from '../../components/frontend/Welcome'
import FFotter from '../../components/frontend/FFotter'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { api_url, asset_url } from '../../baseurl'

export default function FDetailpage() {

    const [searchparams, setSearchparams] = useSearchParams();
    const [blog, setBlog] = useState({})
    const [trending, setTrending] = useState([])
    const [relate, setRelate] = useState([])
    const [waiting, setWaiting] = useState(false)
    const [trendingWaiting, setTrendingWaiting] = useState(false)

    useEffect(() => {
        get_blog()
        trending_data()
    }, [])

    const get_blog = () => {
        setWaiting(false)
        let blog_id = searchparams.get('blog_id')
        axios.get(api_url + '/blog/read_blog_by_id/' + blog_id)
            .then((response) => {
                setBlog(response.data.blogs[0])
                console.log(response.data.blogs[0])
                setWaiting(true)
                related_data(response.data.blogs[0].category)
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

    const related_data = (category) => {
        axios.get(api_url + '/blog/get_related/' + category)
          .then((response) => {
            setRelate(response.data.blogs)
          })
    }

    return (
        (waiting && trendingWaiting) ?
            (
                <>
                    <div className='align-box'>
                        <FTopbar />
                        <Welcome />
                        <main className="heiForMainDetail">
                            <section style={{ width: "100%", justifyContent: "space-between", display: "flex" }}>
                                <div className="follower">
                                    <p className="findUs">Find us</p>
                                    <li className="socialMedia">
                                        <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank"> <img src="../../public/fb.png" /></a>
                                        <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank"> <img src="../../public/tw.png" /></a>
                                        <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank"> <img src="../../public/ig.png" /></a>
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

                            <section className="articleContainer styleDetailArticle">
                                <div className="cardContainer">


                                    <div className="titleArticle">
                                        <h3 id="titleArticle">{blog.title}</h3>

                                    </div>
                                    <div className="bannerTitle">

                                        <img src={asset_url + '/' + blog.image} alt="thumbnail" />
                                    </div>

                                    <div className="detailArticle">
                                        <p>
                                            {blog.paragraph}
                                        </p>
                                    </div>

                                    {
                                        (blog.link) ?
                                        (
                                            <iframe className="youtube" src={blog.link} />
                                        ) : (null)
                                    }

                                    {
                                        (blog.p1) ?
                                        (
                                            <div className="detailArticle">
                                                <p>
                                                    {blog.p1}
                                                </p>
                                            </div>
                                        ) : (null)
                                    }

                                    <div className="sponser" style={{ marginBottom: "20px" }}>
                                        <p> Advertising </p>
                                    </div>

                                    {
                                        (blog.op1) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op1} />
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.p2) ? (
                                            <div className="detailArticle">
                                                <p>
                                                    {blog.p2}
                                                </p>
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.op2) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op2} />
                                            </div>
                                        ) : (null)
                                    }                            

                                    {
                                        (blog.p3) ? (
                                            <div className="detailArticle">
                                                <p>
                                                    {blog.p3}
                                                </p>
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.op3) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op3} />
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.op4) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op4} />
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.op5) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op5} />
                                            </div>
                                        ) : (null)
                                    }

                                    {
                                        (blog.op6) ? (
                                            <div>
                                                <img className="imageArticle" src={asset_url + '/' + blog.op6} />
                                            </div>
                                        ) : (null)
                                    }
                                </div>
                            </section>

                            <section className="articleRelevant">
                                <div style={{ borderRight: "2px solid black", width: "fit-content", height: "fit-content" }}>
                                    <h3 style={{ textTransform: "uppercase", fontWeight: "bold", fontSize: "large", paddingRight: "5px" }}>trading</h3>
                                    <p style={{ fontSize: "smaller" }}> The lastest </p>
                                </div>
                                <div className="articleRelevantContainer">

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

                                    {
                                        (trending[3]) ?
                                        (
                                            <div className="cardRelevant" onClick={() => {navigate('/blog?blog_id='+trending[3].blog_id)}}>
                                            <div className="cardRelevantSize">
                                                <div className="cardThumbnailRelevant">
                                                <img src={asset_url + '/' + trending[3].image} alt="thumbnail" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="cardRelevantTittle">{trending[3].title}</p>
                                            </div>
                                            </div>
                                        ) : null
                                    }

                                </div>


                            </section>

                            <section className="articleContainer recentlyFordetail" style={{ marginTop: "50px" }}>
                                <div style={{ borderRight: "2px solid black", height: "fit-content", width: "fit-content" }}>
                                    <h3 style={{ textTransform: "uppercase", fontWeight: "bold", fontSize: "large", paddingRight: "5px" }}>Recently News</h3>
                                    <p style={{ fontSize: "smaller" }}> The lastest </p>
                                </div>
                                <div className="cardContainer relatedcard">

                                    {
                                        relate.map((blog) => {
                                            return (
                                                <div className="card" key={blog.id}>
                                                    <div className="cardThumbnail">
                                                        <img src={asset_url + '/' + blog.image} alt="thumbnail" />
                                                        <p className="cardTitle">{blog.title}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    

                                </div>

                            </section>
                        </main>
                        <FFotter />
                    </div>
                </>
            ) : (null)
    )
}
