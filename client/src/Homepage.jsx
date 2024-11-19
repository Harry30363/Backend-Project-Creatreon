import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Header from './Header';
import Footer from './Footer';

const Homepage = () => {
    useEffect(() => {
      // JavaScript code for responsive navigation menu
      const menuBtn = document.querySelector(".menu-btn");
      const navigation = document.querySelector(".navigation");
  
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navigation.classList.toggle("active");
        navigation.classList.toggle("active");
      });

      // JavaScript code for video slider navigation
      const btns = document.querySelectorAll(".nav-btn");
      const slides = document.querySelectorAll(".video-slide");
      const contents = document.querySelectorAll(".content");
      const contentss = document.querySelectorAll(".content");
  
      const sliderNav = (manual) => {
        btns.forEach((btn) => btn.classList.remove("active"));
        slides.forEach((slide) => slide.classList.remove("active"));
        contents.forEach((content) => content.classList.remove("active"));
        contentss.forEach((content) => content.classList.remove("active"));
  
        btns[manual].classList.add("active");
        slides[manual].classList.add("active");
        contents[manual].classList.add("active");
      };
  
      btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          sliderNav(i);
        });
      });
  
      let slideIndex = 0;
      const intervalTime = 9000;
  
      const autoSlide = () => {
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0;
        }
        sliderNav(slideIndex);
      };
  
      let slideInterval = setInterval(autoSlide, intervalTime);
  
      // Pause slide change on hover
      const homeSection = document.querySelector(".home");
      homeSection.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
      });
  
      // Resume slide change on mouse leave
      homeSection.addEventListener("mouseleave", () => {
        slideInterval = setInterval(autoSlide, intervalTime);
      });
  
      // Clean up function
      return () => {
        clearInterval(slideInterval);
      };
    }, []);
  
  return (
    <div>
      <Header></Header>
      <section className="home">
        <video className="video-slide active" src="src/assets/2.mp4" autoPlay muted loop></video>
        <video className="video-slide" src="src/assets/4.mp4" autoPlay muted loop></video>
        <video className="video-slide" src="src/assets/6.mp4" autoPlay muted loop></video>

        <div className="content active">
          <h1>Make it<br /><span>making art</span></h1>
          <Link to="#">Read More</Link>
        </div>
        <div className="content">
          <h1>Your house<br /><span>Your rules</span></h1>
          <Link to="#">Read More</Link>
        </div>
        <div className="content">
          <h1>Speak<br /><span>volumes</span></h1>
          <Link to="#">Read More</Link>
        </div>
        <div className="slider-navigation">
          <div className="nav-btn active"></div>
          <div className="nav-btn"></div>
          <div className="nav-btn"></div>
        </div>
      </section>
      <div>
        <img className="main-two-img" src="src/assets/maintwo.jpg" alt="maintwo" />
      </div>
      <div className="main-two-content">
        <h1>"Creatreon provides a space for artists to <br /> sustain themselves by connecting them <br /> directly to their own communities."</h1>
      </div>
      <div style={{ width: '100%', height: '2240px', backgroundImage: 'radial-gradient(rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0))', backgroundColor: 'rgba(148, 187, 255, 0.5)' }}></div>
      <div className="img-main-3-1"><img src="src/assets/small_Component1.png" alt="Image one" width="300" height="150" /></div>
      <div className="img-main-3-2"><img src="src/assets/small_Component2.png" alt="Image one" width="300" height="270" /></div>
      <div className="img-main-3-3"><img src="src/assets/small_Component3.png" alt="Image one" width="300" height="250" /></div>
      <div className="img-main-3-4"><img src="src/assets/small_Component4.png" alt="Image one" width="300" height="365" /></div>
      <div className="img-main-3-5"><img src="src/assets/small_Component5.png" alt="Image one" width="400" height="310" /></div>

      <div className="main-3-content">
        <h1>Complete <span> Creative </span><span> Control </span></h1>
      </div>
      <div className="main-3-par">
        <p>Creatreon is your space to create what excites <br /> you most, rough or polished, big or <br /> small. Hundreds
          of thousands of creators <br /> use Creatreon to share videos, podcasts,<br /> writing, art, music, recipes, and more with
          <br /> their most passionate fans.</p>
      </div>
      <div className="main-content-4">
        <video className="main-content-4-vid" src="src/assets/main-content-4-vid.mp4" autoPlay muted loop></video>
      </div>

      <div className="main-content-4">
        <h1>Creators. Fans. <br /><span>Nothing in <br /> </span><span> between.</span></h1>
      </div>
      <div className="main-content-4-par">
        <p>Creatreon gives you a direct line of access to your fan community, <br /> with no ads or algorithms in the way.<br /><br /> Through real-time group chats, comments, DMs, and even <br /> directly over email, you can connect more deeply and directly<br /> with your community here than anywhere else.</p>
      </div>
      <Link className="main-content-4" to="https://www.patreon.com/create">
        <button>Build real community</button>
      </Link>
      <div className="src/assets/main-content-5-img">
        <img src="src/assets/bgimg.jpg" alt="bgimg" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="main-content-5-centre">
        <img src="src/assets/logo.webp" alt="logo.webp" /> <br />
        <br /><h2>Your world to create</h2>
        <br /><Link to="/login"> <button>Get Started</button></Link><br />
        <h5><br />Already have an account? <Link to="/login">Log in</Link></h5>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
