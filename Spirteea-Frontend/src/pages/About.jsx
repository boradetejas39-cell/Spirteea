import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { headerHtml, footerHtml } from '../components/SharedLayout';
import { useInView } from 'framer-motion';
import { useParserOptions } from '../utils/parserOptions';

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

function About() {
  const options = useParserOptions();

  const counters = [
    { end: 10, suffix: '+', label: 'Year Experience' },
    { end: 98, suffix: '%', label: 'Client Satisfiction' },
    { end: 200, suffix: '+', label: 'Students Placement' },
    { end: 30, suffix: '+', label: 'Companies' },
  ];

  return (
    <>
      {parse(headerHtml, options)}

      {/* Hero Banner */}
      <section className="breadcrumb__area breadcrumb-style pt-60 pb-60 p-relative z-index-1" style={{
        backgroundImage: 'linear-gradient(90deg, #22D4E6 0%, #1B8D9B 100%)',
        textAlign: 'center',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div className="breadcrumb__bg-overlay m-img"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="breadcrumb__content text-center">
                <h3 className="breadcrumb-title" style={{ fontSize: 'clamp(2rem, 8vw, 3.4rem)' }}>
                  Who We Are
                  <img 
                    alt="underline" 
                    loading="lazy" 
                    width="213" 
                    height="5" 
                    src="/_next/static/media/titile.9b6539c6.svg"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '70%',
                      maxWidth: '213px'
                    }}
                  />
                </h3>
                <div className="breadcrumb-list" style={{ marginTop: '20px' }}>
                  <span> <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a> </span>
                  <span className="separator"><i className="fa-regular fa-angle-right"></i></span>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="tp-business-area p-relative pt-60 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                alt="About Spirita" 
                loading="lazy" 
                width="1000" 
                height="563" 
                className="img-fluid" 
                style={{ color: 'transparent', borderRadius: '8px' }} 
                src="https://spireeta.com/_next/static/media/about-img.1848c58b.jpg"
              />
            </div>
            <div className="col-lg-6">
              <div className="tp-business-title-wrapper">
                <span className="tp-section-title__pre">
                  About <span className="title-pre-color"> Us</span>
                </span>
                <h3 className="tp-section-title">
                  Spirita <span style={{ color: '#05DAC3' }}>Technologies</span> (I) Pvt Limited
                </h3>
                <p>
                  Spirita Technologies (I) Pvt Limited is established to help IT professional to convert their potential to Performance. Spirita believes that every human being has potential but it is unseen most of the time due lack of technical knowledge, lack of training required and lack of team spirit. Spirit believes on core values Team Work, Integrity, Respect Of An individual &amp; Building trust with all stakeholders
                </p>

                <p style={{ marginTop: '15px' }}>
                  Spirita has its mission to provide cost effective training designed to increase an individual and organizational productivity and enrichment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
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

      {/* Our Vision, Mission & Core Values Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h3 className="tp-section-title" style={{ fontStyle: 'italic' }}>
                Our Vision , Mission <span style={{ color: '#05DAC3' }}>&amp;</span> Core Values
                <span className="title-left-shape">
                  <svg width="194" height="5" viewBox="0 0 194 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M193.649 4.22307C129.517 2.55338 65.7543 2.288 1.66891 4.99709C-0.571625 5.09661 -0.540924 2.60867 1.66891 2.48703C65.34 -0.962917 130.116 -1.06243 193.649 3.70336C194.109 3.73653 194.125 4.23412 193.649 4.22307Z" fill="#05DAC3"></path>
                  </svg>
                </span>
              </h3>
            </div>
          </div>
          <div className="row g-4">
            {[
              {
                title: 'Our Mission',
                text: 'Provide quality, cost-effective training designed to increase individual and organizational productivity and enrichment.',
                img: '_next/static/media/img-1.96831ed1.png',
                icon: '📈'
              },
              {
                title: 'Our Vision',
                text: "To become one of the world's leading companies, bringing innovations by converting the potential of an individual to performance.",
                img: '_next/static/media/img-2.d440cce1.png',
                icon: '📊'
              },
              {
                title: 'Core Values',
                text: 'Integrity, Respect of an individual. Teamwork emphasizes collaboration and the importance of working together towards common goals.',
                img: '_next/static/media/img-3.1956858b.png',
                icon: '📋'
              }
            ].map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                <div className="value-card" style={{
                  borderRadius: '12px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  minHeight: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: 'clamp(140px, 40vw, 180px)', 
                    height: 'clamp(140px, 40vw, 180px)', 
                    borderRadius: '50%',
                    position: 'relative',
                    margin: '0 auto 20px',
                  }}>
                    <div className="floating-badge" style={{ transform: 'scale(0.8)' }}>
                      {item.icon}
                    </div>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      overflow: 'hidden',
                      border: '4px solid #f8f9fa',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 700, marginBottom: '5px', color: '#070f20', fontSize: '1.25rem' }}>{item.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                    <img src="/_next/static/media/titile.9b6539c6.svg" alt="underline" style={{ width: '80px', height: 'auto' }} />
                  </div>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>{item.text}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {parse(footerHtml, options)}
    </>
  );
}

export default About;
