import React from 'react';
import './creators.css';
import Header from './Header';
import Footer from './Footer';

const Creators = () => {
    return (
        <div>
            <Header></Header>
            <section className="Creators_hero_section_1">
                <div className="Creators_text_container1">
                    <h1 className="Creators_heading1">Creatreon for <br /><span className="Creators_downparth1">podcasters</span></h1>
                </div>
                <p className="Creators_par1">Connect with your listeners, share your<br /> work directly with audiences, and earn<br /> income beyond ad revenue.</p>
                <a href="#">
                    <button className="Creators_hero_btn1" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Creators_hero_section_2">
                <div className="Creators_text_container2">
                    <h1 className="Creators_heading2">Creatreon for <br /><span className="Creators_downparth2">musicians</span></h1>
                </div>
                <p className="Creators_par2">Share your music on your terms,<br /> whether you're taking fans backstage<br /> or giving them a front row seat.</p>
                <a href="#">
                    <button className="Creators_hero_btn2" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Creators_hero_section_3">
                <div className="Creators_text_container3">
                    <h1 className="Creators_heading3">Creatreon for <br /><span className="Creators_downparth3">video</span><span className="Creators_downparth3_1">creators</span></h1>
                </div>
                <p className="Creators_par3">Create on your own terms, strengthen<br /> your relationship with your community,<br />and diversify how you get paid.</p>
                <a href="#">
                    <button className="Creators_hero_btn3" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Creators_hero_section_4">
                <div className="Creators_text_container4">
                    <h1 className="Creators_heading4">Creatreon for <br /><span className="Creators_downparth4">artists</span></h1>
                </div>
                <p className="Creators_par4">Create what inspires you, connect<br /> directly with your community, and build<br /> a thriving business around your art.</p>
                <a href="#">
                    <button className="Creators_hero_btn4" >Create on Creatreon</button>
                </a>
            </section>
            <section className="Creators_hero_section_5">
                <div className="Creators_text_container5">
                    <h1 className="Creators_heading5">Creatreon for <br /><span className="Creators_downparth5">game</span><span className="Creators_downparth5_1">devs</span></h1>
                </div>
                <p className="Creators_par5">Create community around your games<br /> and mods, sell to a dedicated fanbase,<br /> and get paid securely and quickly, all in <br />one place.</p>
                <a href="#">
                    <button className="Creators_hero_btn5" >Create on Creatreon</button>
                </a>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Creators;
