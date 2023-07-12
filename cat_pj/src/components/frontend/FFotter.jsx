import React from 'react'

export default function FFotter() {
    return (
        <>
            <footer>
                <div className="footerContainer">
                    <div className="divFooterList">
                        <div className="footerList">
                            <p className="p1">DOWNLOAD APP</p>
                        </div>
                        <div className="footerList">
                            <p className="p1">FIND US ON SOCIAL MEDIA</p>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                                    <img src="../../public/fb.png"></img>
                                    <p>Facebook</p>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                                    <img src="../../public/tw.png"></img>
                                    <p>Tweeter</p>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100091961894604" target="_blank">
                                    <img src="../../public/ig.png"></img>
                                    <p>Instagram</p>
                                </a>
                            </li>

                        </div>
                    </div>
                    <div className="divFooterList">
                        <div className="footerList">
                            <p className="p1">LEGAL AND PRIVACY</p>
                            <a href="#" target="_blank">

                                <p>Contact us</p>
                            </a>
                            <a href="#" target="_blank">

                                <p>Privacy Policy</p>
                            </a>


                        </div>
                        <div className="footerList">
                            <p className="p1">SUPPORT</p>
                            <a>
                                <p>Help center</p>
                            </a>
                            <a href="#" target="_blank">

                                <p>About us</p>
                            </a>

                        </div>
                    </div>
                </div>
                <hr />
  
                        <div className="copyR">
                            <p>@ Copyright 2023</p>
                        </div>
                
            </footer>
        </>
    )
}
