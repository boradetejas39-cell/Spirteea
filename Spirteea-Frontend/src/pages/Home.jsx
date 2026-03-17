import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useParserOptions } from '../utils/parserOptions';

const htmlContent = `
<div id="__next"><!--$--><header class="tp-header-2-area tp-header-height p-relative"><div class="tp-header-2-top tp-header-2-space d-none d-xl-block"><div class="container"><div class="row align-items-center"><div class="col-xl-6"><div class="tp-header-2-top-info"><p><i class="fa-solid fa-clock"></i> Open Hours: Mon - Fri: <span>8.00</span> am - <span>6.00</span> pm</p></div></div><div class="col-xl-6"><div class="tp-header-2-top-right d-flex justify-content-end align-items-center"><div class="header-date"><p><i class="fa-regular fa-message-dots"></i> info@spireeta.com</p></div><div class="header-location"><a target="_blank" href="https://www.google.com/maps/search/16+Friends+Colony,+VMV+Road,+Amravati,+Maharashtra+444604"><i class="fa-sharp fa-solid fa-location-dot"></i>VMV Road, Amravati 444604</a></div><div class="header-social d-xxl-block d-none"><a href="#"><i class="fa-brands fa-facebook-f"></i></a><a href="#"><i class="fa-brands fa-twitter"></i></a><a href="#"><i class="fa-brands fa-instagram"></i></a></div></div></div></div></div></div><div id="header-sticky" class="tp-header-2-bottom p-relative false"><div class="tp-header-2-bottom-inner p-relative" style="background-color: #ffffff;"><div class="container gx-0"><div class="row gx-0 align-items-center"><div class="col-xxl-2 col-xl-2 col-lg-10 col-md-2"><div class="tp-header-2-main-left d-flex align-items-center justify-content-xl-center justify-content-xxl-end p-relative"><div class="tp-header-2-logo"><a href="/"><img alt="theme-pure" loading="lazy" width="1271" height="1035" decoding="async" data-nimg="1" class="logo-image img-fluid" style="color:transparent" src="_next/static/media/logo-spirita.eb124c62.jpg"/></a></div></div></div><div class="col-xxl-8 col-xl-7 col-md-8 d-none d-xl-block"><div class="tp-main-menu-2-area d-flex align-items-center"><div class="tp-main-menu"><nav id="tp-mobile-menu"><ul><li class="false"><a href="/"><span></span>Home</a></li><li class="false"><a href="/about"><span></span>About</a></li><li class="false"><a href="/service"><span></span>Products</a></li><li class="false"><a href="/empowerment"><span></span>Empowerment</a></li><li class="false"><a href="/career"><span></span>Career</a></li><li class="false"><a href="/contact"><span></span>Contact</a></li></ul></nav></div></div></div><div class="col-xxl-2 col-xl-3 col-lg-2 col-md-2"><div class="tp-header-2-right d-none d-xxl-block"><div class="tp-header-2-main-right d-flex align-items-center justify-content-xxl-end"><div class="tp-header-2-phone d-flex align-items-center"><div class="tp-header-2-btn1"><i class="fa-solid fa-phone"></i> <a data-bs-toggle="modal" data-bs-target="#exampleModal" href="/contact">Enquiry Now </a></div></div></div></div><div class="tp-header-2-mobile-menu d-flex justify-content-end d-block d-xl-none d-xxl-none"><div class="tp-header-2-hamburger-btn offcanvas-open-btn" style="background-image: url(&quot;/assets/img/icon/header-hamburger-shape.png&quot;);"><button class="hamburger-btn"><span><svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.13163C0 0.506972 0.499692 0 1.11538 0H20.4487C21.0644 0 21.5641 0.506972 21.5641 1.13163C21.5641 1.7563 21.0644 2.26327 20.4487 2.26327H1.11538C0.499692 2.26327 0 1.7563 0 1.13163ZM27.8846 10.5619H1.11538C0.499692 10.5619 0 11.0689 0 11.6935C0 12.3182 0.499692 12.8252 1.11538 12.8252H27.8846C28.5003 12.8252 29 12.3182 29 11.6935C29 11.0689 28.5003 10.5619 27.8846 10.5619ZM14.5 21.1238H1.11538C0.499692 21.1238 0 21.6308 0 22.2555C0 22.8801 0.499692 23.3871 1.11538 23.3871H14.5C15.1157 23.3871 15.6154 22.8801 15.6154 22.2555C15.6154 21.6308 15.1157 21.1238 14.5 21.1238Z" fill="currentColor"></path></svg></span></button></div></div></div></div></div></div></div></header><div class="jsx-b70aef9b69277ec9 sidebar "><button class="jsx-b70aef9b69277ec9 close-btn">X</button><nav class="jsx-b70aef9b69277ec9"><ul><li class="false"><a href="/"><span></span>Home</a></li><li class="false"><a href="/about"><span></span>About</a></li><li class="false"><a href="/service"><span></span>Products</a></li><li class="false"><a href="/empowerment"><span></span>Empowerment</a></li><li class="false"><a href="/career"><span></span>Career</a></li><li class="false"><a href="/contact"><span></span>Contact</a></li></ul></nav></div> <main><section class="tp-hero-2-area p-relative"><div class="container-fluid p-0"><div class="row g-0"><div class="col-md-8 col-12 p-0 position-relative"><video src="_next/static/videos/bg-video-c35ede9e4b12eeaf34bf5d25e4548287.mp4" class="w-100 h-auto" autoplay="" loop="" muted="" playsinline="" preload="auto"></video><button class="position-absolute bottom-0 end-0 m-3 btn btn-sm btn-light rounded-circle" style="width:40px;height:40px;z-index:10" aria-label="Unmute video">🔇</button></div><div class="col-md-4 col-12 d-flex align-items-center justify-content-center p-0 bg-slider"><div class="row g-0 w-100"><div class="col-lg-12 text-center align-items-center py-4"><img alt="Vision and Mission" width="200" height="149" decoding="async" data-nimg="1" class="vert-move img-fluid" style="color:transparent" src="_next/static/media/vision-mission.be92fbd5.png"/></div><div id="ANIMATED_SLIDER_PLACEHOLDER"></div></div></div></div></div></section><section class="tp-business-area p-relative pt-60 pb-100"><div class="container"><div class="row align-"><div class="col-lg-6"><img alt="theme-pure" loading="lazy" width="1000" height="563" decoding="async" data-nimg="1" class="img-responsive" style="color:transparent" src="https://spireeta.com/_next/static/media/about-img.1848c58b.jpg"/></div><div class="col-lg-6"><div class="tp-business-title-wrapper"><span class="tp-section-title__pre">Who <span class="title-pre-color"> We Are ?</span><svg width="123" height="8" viewBox="0 0 123 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.384401 7.82144C0.645399 4.52972 8.83029 8.38041 10.8974 7.67652C12.4321 7.1486 11.6386 7.03474 12.9749 6.19628C14.0816 4.61253 15.7519 3.89829 17.9756 4.06391C18.6125 4.48831 19.2284 4.93342 19.8444 5.38888C21.1076 6.09277 22.1621 6.51717 23.6028 6.13417C24.8973 5.79258 25.5237 4.79885 26.6095 4.18812C30.8481 1.80732 31.3701 2.90456 34.5855 4.58147C36.0993 5.36817 37.634 6.48612 39.461 6.08242C40.1604 5.92715 40.2127 5.67871 40.672 5.54415C42.1023 4.10531 43.9606 3.52564 46.2469 3.80512C47.0612 4.28129 47.8651 4.75745 48.669 5.25431C50.9866 6.22733 54.5049 6.23769 54.6615 3.08053C54.3065 3.22545 53.962 3.37037 53.6175 3.51529C55.622 5.75117 58.6078 6.59998 61.5205 5.5752C64.8091 4.41585 63.8277 3.02877 67.1685 4.35374C68.6614 4.94377 70.2587 5.14045 71.856 4.96447C73.6412 4.7678 75.1028 3.27721 76.6271 3.07018C79.0491 2.73894 81.3354 4.89201 84.2482 4.15707C85.3235 3.88793 86.9417 2.27313 87.7978 2.21102C88.6329 2.14891 89.9484 3.68091 90.8358 4.14672C93.3936 5.51309 96.5882 5.75117 99.3234 4.7471C101.902 3.80512 100.858 3.60845 103.124 4.30199C104.366 4.67464 105.253 5.34747 106.652 5.45099C109.628 5.65801 112.175 4.26058 113.678 1.77626C113.25 1.77626 112.822 1.77626 112.384 1.77626C114.722 5.49239 119.587 6.10312 122.771 3.05983C123.471 2.39734 122.406 1.34151 121.707 2.00399C119.316 4.29164 115.516 3.95004 113.678 1.03097C113.386 0.554807 112.687 0.544455 112.384 1.03097C110.223 4.62288 105.159 4.84026 102.549 1.7038C102.278 1.38291 101.777 1.46572 101.495 1.7038C97.6113 4.99553 91.8171 4.46761 88.6747 0.368483C88.4242 0.0372403 87.85 -0.190489 87.5159 0.223564C84.9685 3.37037 80.7717 3.86723 77.6606 1.10343C77.3787 0.854995 76.9507 0.823941 76.6584 1.10343C73.422 4.26058 68.6823 4.52972 65.1432 1.63134C64.83 1.37256 64.3706 1.38291 64.1409 1.75556C61.9799 5.40958 57.2297 5.74082 54.4631 2.65613C54.0873 2.24207 53.44 2.59402 53.4191 3.09088C53.2103 7.04509 45.6727 1.72451 43.8979 1.92118C40.4841 2.30418 40.2127 5.74082 35.7026 3.82583C33.4894 2.88386 31.8085 0.989563 29.1777 1.39326C26.9226 1.74521 25.9622 3.86723 23.9682 4.63323C20.4603 5.9789 19.2702 2.13856 16.2531 2.33524C11.2941 2.66648 14.1442 7.41774 6.43955 5.75117C4.22629 5.27501 -0.221114 3.93969 0.00856432 7.82144C0.0190042 8.05952 0.363521 8.05952 0.384401 7.82144Z" fill="currentColor"></path></svg></span><h3 class="tp-section-title">Spirita Technologies (I) Pvt Limited<span class="title-left-shape"><svg width="194" height="5" viewBox="0 0 194 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M193.649 4.22307C129.517 2.55338 65.7543 2.288 1.66891 4.99709C-0.571625 5.09661 -0.540924 2.60867 1.66891 2.48703C65.34 -0.962917 130.116 -1.06243 193.649 3.70336C194.109 3.73653 194.125 4.23412 193.649 4.22307Z" fill="#05DAC3"></path></svg></span></h3><p>Spirita Technologies (I) Pvt Limited is established to help IT professional to convert their potential to Performance . Spirita believes that every human being has potential but it is unseen most of the time due lack of technical knowledge , lack of training required and lack of team spirit. Spirit believes on core values Team Work, Integrity, Respect Of An individual & Building trust with all stakeholders </p></div><div class="row"><div class="tp-business-btn-area d-flex align-items-center"><a class="tp-btn" href="/about">Explore More</a><img alt="theme-pure" loading="lazy" width="120" height="64" decoding="async" data-nimg="1" class="d-none d-xl-block" style="color:transparent" src="_next/static/media/user.d706f3d1.png"/><i>5K+ Customer<span><svg width="90" height="3" viewBox="0 0 90 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.162866 2.53384C29.9146 1.53203 59.4954 1.3728 89.2258 2.99826C90.2652 3.05797 90.2509 1.5652 89.2258 1.49222C59.6876 -0.57775 29.6369 -0.637461 0.162866 2.22202C-0.0507143 2.24192 -0.0578337 2.54047 0.162866 2.53384Z" fill="#05DAC3"></path></svg></span></i></div></div></div></div></div></section><div id="COUNTER_SECTION_PLACEHOLDER"></div></main><footer class="tp-footer-3-area p-relative"><div class="tp-footer-bg" style="background-image:url(assets/img/footer/footer-bg.jpg)"></div><div class="container"><div class="tp-footer-3-main-area"><div class="row"><div class="col-lg-4 col-md-6"><div class="tp-footer-widget tp-footer-3-col-1"><div class="tp-footer-logo"><h4 class="text-white">Spirita Technology</h4></div><div class="tp-footer-widget-content"><div class="tp-footer-info"><div class="tp-footer-main-location"><a target="_blank" href="https://www.google.com/maps/search/16+Friends+Colony,+VMV+Road,+Amravati,+Maharashtra+444604"><i class="fa-sharp fa-light fa-location-dot"></i>16 Friends Colony, VMV Road, Amravati, Maharashtra 444604</a></div><div class="tp-footer-main-mail"><a href="mailto:info@spireeta.com"><i class="fa-light fa-message-dots"></i>info@spireeta.com <br/> +91-721-2990299</a></div></div></div></div></div><div class="col-lg-4 col-md-6"><div class="tp-footer-widget tp-footer-3-col-2"><h3 class="tp-footer-widget-title">Our Product</h3><div class="tp-footer-widget-content"><ul><li><a href="index.html#">Pathosoft </a></li><li><a href="index.html#">Clerk Made Easy (CME)</a></li><li><a href="index.html#">Oil Deal </a></li><li><a href="index.html#">Auto Soft </a></li></ul></div></div></div><div class="col-lg-4 col-md-6"><div class="tp-footer-widget tp-footer-3-col-3"><h3 class="tp-footer-widget-title">Newsletter</h3><div class="tp-footer-from"><div class="tp-footer-text-email p-relative"><input type="text" placeholder="Enter Email Address"/><span><svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.49316 13.7164C3.63379 13.8458 3.84046 13.8759 4.01071 13.7908L11.4654 10.1149L5.90522 14.0488C5.77478 14.1412 5.70122 14.2939 5.71058 14.4538L5.90157 17.7137C5.93936 18.3587 6.06262 18.9045 6.25825 19.2917C6.59438 19.9576 7.06242 20.0322 7.31139 20.0176C7.61259 20 7.90192 19.8421 8.17074 19.5482L9.20637 18.4157L10.8851 19.4378C11.3043 19.6933 11.7985 19.8118 12.3141 19.7816C13.3786 19.7192 14.4435 19.0328 15.0945 17.9905L24.1844 3.42754C24.8108 2.42378 24.7071 1.81746 24.5101 1.48593C24.38 1.26641 24.0445 0.904988 23.2627 0.950786C23.0031 0.965999 22.7113 1.02528 22.3941 1.12637L1.78045 7.70011C0.860734 7.99324 0.267482 8.54997 0.108773 9.26713C-0.0494808 9.98477 0.254344 10.7393 0.964829 11.3921L3.49316 13.7164ZM1.01287 9.46688C1.09713 9.08504 1.46951 8.7707 2.06157 8.58208L22.6756 2.00782C23.23 1.83163 23.6608 1.86665 23.7149 1.95852C23.7648 2.04228 23.7632 2.35484 23.3995 2.93758L14.3102 17.5006C13.8156 18.2927 13.0301 18.8124 12.2603 18.8575C11.9286 18.877 11.6283 18.8065 11.3672 18.6474L9.36306 17.4269C9.27991 17.3767 9.18683 17.3548 9.09535 17.3601C8.97847 17.367 8.86461 17.4181 8.781 17.5097L7.48832 18.9234C7.33843 19.087 7.25818 19.0935 7.2577 19.094C7.1674 19.0715 6.88551 18.6754 6.82599 17.6595L6.65003 14.656L16.785 7.48526C16.9817 7.34623 17.0388 7.07823 16.9149 6.87079C16.7915 6.66195 16.5265 6.58619 16.3129 6.69237L3.88618 12.8204L1.59108 10.7106C1.13392 10.2906 0.928189 9.84874 1.01287 9.46688Z" fill="#05DAC3"></path></svg></span></div><div class="tp-footer-form-check"><input class="form-check-input" id="flexCheckChecked" type="checkbox"/><label class="form-check-label" for="flexCheckChecked">I agree to all your terms and policies</label></div><div class="tp-footer-widget-social"><a target="_blank" href="http://facebook.com/"><i class="fab fa-facebook-f"></i></a><a target="_blank" href="http://twitter.com/"><i class="fab fa-twitter"></i></a><a target="_blank" href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a></div></div></div></div></div></div><div class="tp-footer-copyright-area p-relative"><div class="row"><div class="col-md-12 col-lg-12"><div class="tp-footer-copyright-inner"><p> © Copyright <span>©2025</span> Spirita Technology. All Rights Reserved </p></div></div></div></div></div><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5 pl-25" id="exampleModalLabel">Get in touch with us for more info</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form class="form-login text-center"><div class="textfield"><input class="form-control" type="text" name="name" placeholder="Full Name" required="" value=""/></div><div class="textfield"><input class="form-control" type="email" name="email" placeholder="Email ID" required="" value=""/></div><div class="textfield"><input class="form-control" type="tel" name="phone" placeholder="Phone No" required="" value=""/></div><button class="btnlogin" type="submit">Submit</button></form></div></div></div></div></footer><div class="back-to-top-wrapper "><button class="back-to-top-btn" data-target="html" id="back_to_top" type="button"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6L6 1L1 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div>
`;

const slides = [
  { title: 'Mission', text: 'Provide quality, cost-effective training designed to increase individual and organizational productivity and enrichment.' },
  { title: 'Vision', text: "To become one of the world's leading companies, bringing innovations by converting the potential of an individual to performance." },
  { title: 'Core Values', text: 'Integrity, Respect of an individual. Teamwork emphasizes collaboration and the importance of working together towards common goals.' },
];

function AnimatedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-100 d-flex flex-column align-items-center" style={{ position: 'relative', height: 'auto', minHeight: '300px', overflow: 'hidden', padding: '20px 0', boxSizing: 'border-box' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ position: 'absolute', width: '100%', top: 0, left: 0, padding: '0 15px', textAlign: 'center', boxSizing: 'border-box' }}
        >
          <h2 style={{
            color: '#070f20',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            marginBottom: '0.8rem',
            fontFamily: 'var(--heading-font)',
            wordBreak: 'break-word'
          }}>
            {slides[currentIndex].title}
          </h2>
          <p style={{
            color: '#333333',
            fontSize: 'clamp(0.85rem, 3vw, 1.15rem)',
            lineHeight: '1.6',
            margin: '0 auto',
            maxWidth: '100%',
            fontWeight: 400,
            fontFamily: 'var(--body-font)'
          }}>
            {slides[currentIndex].text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const counters = [
  { end: 10, suffix: '+', label: 'Year Experience' },
  { end: 98, suffix: '%', label: 'Client Satisfiction' },
  { end: 200, suffix: '+', label: 'Students Placement' },
  { end: 30, suffix: '+', label: 'Companies' },
];

function CounterItem({ end, suffix, label, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="col-lg-3 col-md-6 col-sm-6">
      <div className="tp-counter-wrapper tp-counter-border text-center">
        <h3 className="counter-title">
          <span className="purecounter">
            <div className="d-flex align-items-center justify-content-center">
              <span>{count}</span>
              <span><span>{suffix}</span></span>
            </div>
          </span>
        </h3>
        <span className="counter-subtitle">{label}</span>
      </div>
    </div>
  );
}

function CounterSection() {
  return (
    <section className="tp-counter-area pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-counter-box" style={{ backgroundImage: 'url(assets/img/fun-fact/counter-bg.png)' }}>
              <div className="row">
                {counters.map((c, i) => (
                  <CounterItem key={i} end={c.end} suffix={c.suffix} label={c.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const options = useParserOptions({
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.id === 'ANIMATED_SLIDER_PLACEHOLDER') {
        return <AnimatedSlider />;
      }
      if (domNode.attribs && domNode.attribs.id === 'COUNTER_SECTION_PLACEHOLDER') {
        return <CounterSection />;
      }
    }
  });


  return (
    <>
      {parse(htmlContent, options)}
    </>
  );
}

export default Home;
