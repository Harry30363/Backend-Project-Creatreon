import React from 'react';
import './Pricing.css';
import Header from './Header';
import Footer from './Footer';

const Pricing = () => {
    return (
        <div>
            <Header></Header>
            <section className="Pricing_hero_section_1">
                <div className="Pricing_text_container1">
                    <h1 className="Pricing_heading1">Starting a Creatreon<br/><span className="Pricing_downparth1">is free</span></h1>
                </div>
                <p className="Pricing_par1">Access tools to share work directly<br />with your fans right away. Introduce<br />paid options to your members when<br />you're ready.</p>
            </section>
            <section className="Pricing_hero_section_2">
                <h1 className="Pricing_herosection2-6_head">01. Publishing</h1>
                <img className="Pricing_herosection2-6_img" src="src/assets/Herosection2_2.png" alt="Herosection2_2" />
            </section>
            <section className="Pricing_hero_section_3">
                <h1 className="Pricing_herosection2-6_head">02. Video & Previews</h1>
                <img className="Pricing_herosection2-6_img" src="src/assets/Herosection3_3.png" alt="Herosection3_3" />
            </section>
            <section className="Pricing_hero_section_4">
                <h1 className="Pricing_herosection2-6_head">03. Exclusive Podcast Feeds</h1>
                <img className="Pricing_herosection2-6_img" src="src/assets/Herosection4_4.png" alt="Herosection4_4" />
            </section>
            <section className="Pricing_hero_section_5">
                <h1 className="Pricing_herosection2-6_head">04. Personalization Options</h1>
                <img className="Pricing_herosection2-6_img" src="src/assets/Herosection5_5.png" alt="Herosection5_5" />
            </section>
            <section className="Pricing_hero_section_6">
                <h1 className="Pricing_herosection2-6_head">05. Analytics & Insights</h1>
                <img className="Pricing_herosection2-6_img" src="src/assets/Herosection6_6.png" alt="" />
            </section>
            <section className="Pricing_hero_section_7">
                <video className="Pricing_herosection_video" src="src/assets/PricingSection7.mp4" autoPlay muted loop />
                <div className="Pricing_main-content-5-centre">
                    <img src="src/assets/logo.webp" alt="logo.webp" /> <br />
                    <br /><h2>Your world to create</h2>
                    <br /><a href="http://127.0.0.1:5501/loginpage.html"> <button>Get Started</button></a><br />
                    <h5><br />Already have an account? Log in</h5>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Pricing;
