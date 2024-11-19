import React from 'react';
import './Features.css';
import Header from './Header';
import Footer from './Footer';

const Features = () => {
    return (
        <div>
            <Header></Header>
            <section className="Features_hero_section_1">
                <div className="Features_text_container1">
                    <h1 className="Features_heading1">Create <br /><span className="Features_downparth1">on your </span><span className="Features_downparth1_2">terms</span></h1>
                </div>
                <p className="Features_par1">Express your creativity in its purest<br />form directly with your biggest fans,<br />with no ads or algorithms in the way.</p>
                <a href="#">
                    <button className="Features_hero_btn1" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Features_hero_section_2">
                <div className="Features_text_container2">
                    <h1 className="Features_heading2">Where real<br /><span className="Features_downparth2">community </span><span className="Features_downparth2_1">thrives</span></h1>
                </div>
                <p className="Features_par2">Share directly with your biggest fans,<br />knowing it will always reach them.</p>
                <a href="#">
                    <button className="Features_hero_btn2" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Features_hero_section_3">
                <div className="Features_text_container3">
                    <h1 className="Features_heading3">Grow your <br /><span className="Features_downparth3">community</span></h1>
                </div>
                <p className="Features_par3">Bring new fans in and keep them<br />around.</p>
                <a href="#">
                    <button className="Features_hero_btn3" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Features_hero_section_4">
                <div className="Features_text_container4">
                    <h1 className="Features_heading4">Support for <br /><span className="Features_downparth4">your business</span></h1>
                </div>
                <p className="Features_par4">With Creatreon's tools and support at<br />your fingertips, you can take your<br />creative business to the next level.</p>
                <a href="#">
                    <button className="Features_hero_btn4" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Features_hero_section_5">
                <div className="Features_text_container5">
                    <h1 className="Features_heading5">Set up <br /><span className="Features_downparth5">shop</span></h1>
                </div>
                <p className="Features_par5">Selling individual videos, podcast<br />episodes, and more in an online shop<br />is another way to earn on Creatreon <br />beyond paid membership.</p>
                <a href="#">
                    <button className="Features_hero_btn5" >Create on Creatreon</button>
                </a>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Features;
