import React from 'react';
import './Resources.css';
import Header from './Header';
import Footer from './Footer';

const Resources = () => {
    return (
        <div>
            <Header></Header>
            <h1 className="Resources_head1">MOST RECENT</h1>
            <div className="Resources_cointainer1">
                <div>
                    <a href="#">
                        <img className="Resources_cointainer1_1img" src="src/assets/cointainer_1img1.png" alt="cointainer_1" />
                        <p className="Resources_cointainer1_para">MOST RECENT</p>
                        <h3 className="Resources_cointainer1_head">Everything you need to know<br />about community chats<br />safety</h3>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img className="Resources_cointainer1_2img" src="src/assets/cointainer_2img2.png" alt="cointainer_2" />
                        <p className="Resources_cointainer1_para">MOST RECENT</p>
                        <h3 className="Resources_cointainer1_head">How to make the most of<br />community chats</h3>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img className="Resources_cointainer1_3img" src="src/assets/cointainer_3img3.jpg" alt="cointainer_3" />
                        <p className="Resources_cointainer1_para">STRATEGY</p>
                        <h4 className="Resources_cointainer1_head">How to turn free members<br />into paid members</h4>
                    </a>
                </div>
            </div>

            <div className="Resources_cointainer2">
                <div className="Resources_cointainer2_1">
                    <div className="Resources_Cointainer2_leftside">
                        <p className="Resources_para1">MEMBERSHIP</p>
                        <h1 className="Resources_cointainer_1head">Why membership<br />matters for creators<br />and creative<br />businesses</h1>
                        <a href="#">
                            <button className="Resources_cointainer2_btn1" >Create on Creatreon</button>
                        </a>
                    </div>
                    <img className="Resources_cointainer2_1img" src="src/assets/Resources_cont2_1img.jpg" alt="cointainer_1" />
                </div>
                <div className="Resources_cointainer2_2">
                    <div className="Resources_Cointainer2_leftside">
                        <p className="Resources_para2">MEMBERSHIP</p>
                        <h1 className="Resources_cointainer_2head">How to combine<br />exclusive content and<br />community to delight<br />your fans</h1>
                        <a href="#">
                            <button className="Resources_cointainer2_btn2" >Create on Creatreon</button>
                        </a>
                    </div>
                    <img className="Resources_cointainer2_2img" src="src/assets/Resources_cont2_2img.jpeg" alt="cointainer_2" />
                </div>
                <div className="Resources_cointainer2_3">
                    <div className="Resources_Cointainer2_leftside">
                        <p className="Resources_para3">SPOTLIGHT</p>
                        <h1 className="Resources_cointainer_3head">How two creators build<br />RedHanded into a top<br />true-crime podcast</h1>
                        <a href="#">
                            <button className="Resources_cointainer2_btn3" >Create on Creatreon</button>
                        </a>
                    </div>
                    <img className="Resources_cointainer3_3img" src="src/assets/Resources_cont2_3img.jpg" alt="cointainer_3" />
                </div>
                <div className="Resources_cointainer2_4">
                    <div className="Resources_Cointainer2_leftside">
                        <p className="Resources_para3">MEMBERSHIP</p>
                        <h1 className="Resources_cointainer_3head">How to structure your<br />membership and<br />price your benefits</h1>
                        <a href="#">
                            <button className="Resources_cointainer2_btn4" >Create on Creatreon</button>
                        </a>
                    </div>
                    <img className="Resources_cointainer4_4img" src="src/assets/Resources_cont2_4img.jpg" alt="cointainer_3" />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Resources;
