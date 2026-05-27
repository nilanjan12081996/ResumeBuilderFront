'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { getIpData, getPlans, getPlansHome } from "./reducers/PlanSlice";
import { getFeatureJobOutSide } from "./reducers/FeatureJobSlice";

import LoginModal from "./modal/LoginModal";
import RegistrationModal from "./modal/RegistrationModal";
import ChoiceModal from "./modal/ChoiceModal";
import PriceListModal from './modal/PriceListModal';

import './home.css';

const AnimatedCounter = ({ end, duration = 2000, decimals = 0, suffix = "", prefix = "", isString = false, stringVal = "" }) => {
   const [count, setCount] = useState(0);
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         setIsVisible(entry.isIntersecting);
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      if (isString) return;
      if (!isVisible) {
         setCount(0);
         return;
      }
      let startTimestamp = null;
      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         const easeProgress = 1 - Math.pow(1 - progress, 3);
         setCount(easeProgress * end);
         if (progress < 1) {
            window.requestAnimationFrame(step);
         } else {
            setCount(end);
         }
      };
      window.requestAnimationFrame(step);
   }, [isVisible, end, duration, isString]);

   if (isString) {
      return (
         <span ref={ref} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-out 0.2s', display: 'inline-block' }}>
            {stringVal}
         </span>
      );
   }

   const formattedCount = count.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
   });
   return <span ref={ref}>{prefix}{formattedCount}{suffix}</span>;
};

const ScrollReveal = ({ children, delay = 0, style = {} }) => {
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsVisible(entry.isIntersecting);
         },
         { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      if (ref.current) observer.observe(ref.current);
      return () => {
         if (ref.current) observer.unobserve(ref.current);
      };
   }, []);

   return (
      <div
         ref={ref}
         style={{
            ...style,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(80px)',
            transition: `opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}ms, transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}ms`,
         }}
      >
         {children}
      </div>
   );
};

const AnimatedDonut = ({ end, delay = 0, className = "score-donut", innerClassName = "sd-num" }) => {
   const [count, setCount] = useState(0);
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         setIsVisible(entry.isIntersecting);
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
   }, []);

   useEffect(() => {
      if (!isVisible) {
         setCount(0);
         return;
      }
      let startTime;
      let animationFrame;
      const duration = 1500;

      const animate = (timestamp) => {
         if (!startTime) startTime = timestamp;
         const progress = timestamp - startTime;
         const percentage = Math.min(progress / duration, 1);

         const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
         setCount(end * easeOutQuart);

         if (progress < duration) {
            animationFrame = requestAnimationFrame(animate);
         } else {
            setCount(end);
         }
      };

      const timeoutId = setTimeout(() => {
         animationFrame = requestAnimationFrame(animate);
      }, delay);

      return () => {
         clearTimeout(timeoutId);
         if (animationFrame) cancelAnimationFrame(animationFrame);
      };
   }, [end, isVisible, delay]);

   const currentVal = Math.round(count);
   return (
      <div
         ref={ref}
         className={className}
         style={{ background: `conic-gradient(var(--p40) 0% ${currentVal}%, var(--surface2) ${currentVal}% 100%)` }}
      >
         <div className={innerClassName}>{currentVal}</div>
      </div>
   );
};

const AnimatedProgress = ({ width, delay = 0, className = "ats-row-fill" }) => {
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         setIsVisible(entry.isIntersecting);
      }, { threshold: 0.1 });
      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
   }, []);

   return (
      <div
         ref={ref}
         className={className}
         style={{
            width: isVisible ? `${width}%` : '0%',
            transition: `width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}ms`
         }}
      />
   );
};

const TornEdge = ({ fill = "#FBF5FB", bg = "#FFFFFF", flip = false }) => (
   <div style={{ background: bg, lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', marginTop: '-1px', marginBottom: '-1px' }}>
      <svg viewBox="0 0 1440 24" preserveAspectRatio="none" style={{ width: '100%', height: '32px', display: 'block' }}>
         <path d="M0,24 L24,4 L48,20 L72,6 L96,22 L120,8 L144,18 L168,2 L192,20 L216,5 L240,23 L264,9 L288,19 L312,3 L336,21 L360,7 L384,17 L408,1 L432,22 L456,8 L480,18 L504,4 L528,20 L552,5 L576,23 L600,9 L624,19 L648,2 L672,21 L696,7 L720,18 L744,3 L768,22 L792,8 L816,17 L840,1 L864,20 L888,6 L912,23 L936,9 L960,19 L984,4 L1008,22 L1032,7 L1056,18 L1080,2 L1104,21 L1128,8 L1152,17 L1176,1 L1200,22 L1224,9 L1248,19 L1272,4 L1296,21 L1320,6 L1344,20 L1368,3 L1392,18 L1416,8 L1440,24 Z" fill={fill} />
      </svg>
   </div>
);

const WaveEdge = ({ fill = "#FBF5FB", bg = "#FFFFFF", flip = false }) => (
   <div style={{ background: bg, lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', marginTop: '-1px', marginBottom: '-1px' }}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: '3.5vw', minHeight: '30px', display: 'block' }}>
         <path d="M0,48 C320,48 420,0 720,0 C1020,0 1120,48 1440,48 L1440,48 L0,48 Z" fill={fill} />
      </svg>
   </div>
);

export default function Home() {
   const dispatch = useDispatch();
   const router = useRouter();
   const [openLoginModal, setOpenLoginModal] = useState(false);
   const [openChoiceModal, setOpenChoiceModal] = useState(false);
   const [chooseResumeType, setChooseResumeType] = useState();
   const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
   const [openPricModal, setOpenPriceModal] = useState(false);
   const [openRegisterModal, setOpenRegisterModal] = useState(false);
   const { plans, plansHomeData } = useSelector((state) => state.planst);

   useEffect(() => {
      dispatch(getIpData()).then((res) => {
         if (res?.payload?.ip) {
            dispatch(getPlans({ plan_type: 1, ip_address: res?.payload?.ip }));
            dispatch(getPlansHome({ plan_type: 2, ip_address: res?.payload?.ip }));
         }
      });
      dispatch(getFeatureJobOutSide({ page: 1, limit: 3 }));
   }, [dispatch]);

   useEffect(() => {
      const revObs = new IntersectionObserver(entries => {
         entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.r').forEach(el => revObs.observe(el));

      const barObs = new IntersectionObserver(entries => {
         entries.forEach(e => {
            if (e.isIntersecting) {
               e.target.querySelectorAll('.ats-row-fill').forEach(b => {
                  setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 100);
               });
            }
         });
      }, { threshold: 0.4 });
      document.querySelectorAll('#atsCard').forEach(el => barObs.observe(el));

      return () => {
         revObs.disconnect();
         barObs.disconnect();
      };
   }, []);

   const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
   };

   const toggleFaq = (e) => {
      const item = e.currentTarget.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
   };

   const createRipple = (e) => {
      const btn = e.currentTarget;
      const r = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      r.className = 'ripple';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
   };

   const handleRippleClick = (action) => (e) => {
      createRipple(e);
      if (action) action();
   };

   const getPlanMeta = (placeholder) => {
      if (!placeholder) return null;
      const p = placeholder.toLowerCase();
      if (p.includes("watermark")) return { label: "Scratch Resume", color: "#6B7280", bg: "#F3F4F6" };
      if (p.includes("jd based") && p.includes("improve")) return { label: "Improve existing resume + JD based resume", color: "#7C3AED", bg: "#EDE9FE" };
      if (p.includes("jd based")) return { label: "JD Based Resume", color: "#DC2626", bg: "#FEE2E2" };
      if (p.includes("linkedin") && p.includes("improve")) return { label: "Improve existing resume + LinkedIn Rewrite", color: "#0284C7", bg: "#E0F2FE" };
      if (p.includes("linkedin")) return { label: "LinkedIn Rewrite", color: "#0077B5", bg: "#E8F4FD" };
      if (p.includes("improve")) return { label: "Improve existing resume", color: "#059669", bg: "#D1FAE5" };
      return null;
   };

   const PlanCard = ({ oneTime, popularId, onGetStarted }) => {
      const isPopular = oneTime?.id === popularId;
      const thisPrice = parseFloat(oneTime?.planPrice?.price || 0);
      const isFree = thisPrice === 0;
      const planMeta = getPlanMeta(oneTime?.placeholder);

      return (
         <div className="plan-card-wrapper" style={{ position: "relative", display: "flex", flexDirection: "column", height: '100%' }}>
            {isPopular && (
               <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #800080, #b44db4)",
                  color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                  padding: "5px 18px", borderRadius: "20px", zIndex: 10,
                  boxShadow: "0 4px 14px rgba(128,0,128,0.35)", whiteSpace: "nowrap",
                  textTransform: "uppercase",
               }}> Most Popular</div>
            )}
            <div style={{
               flex: 1, display: "flex", flexDirection: "column",
               background: isPopular ? "linear-gradient(145deg, #fdf4ff, #fae8ff)" : "#fff",
               border: isPopular ? "2px solid #800080" : "1.5px solid #e9edff",
               borderRadius: "20px", overflow: "hidden",
               boxShadow: isPopular ? "0 8px 32px rgba(128,0,128,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
               transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = isPopular ? "0 16px 40px rgba(128,0,128,0.18)" : "0 8px 28px rgba(0,0,0,0.12)"; }}
               onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isPopular ? "0 8px 32px rgba(128,0,128,0.12)" : "0 2px 12px rgba(0,0,0,0.06)"; }}
            >
               {planMeta && (
                  <div style={{ background: planMeta.bg, borderBottom: `1px solid ${planMeta.color}22`, padding: "8px 20px", textAlign: "center" }}>
                     <span style={{ fontSize: "11px", fontWeight: 700, color: planMeta.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {planMeta.label}
                     </span>
                  </div>
               )}
               <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "16px" }}>
                     <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1B223C", margin: "0 0 4px 0", lineHeight: 1.3 }}>{oneTime?.plan_name}</h3>
                     <p style={{ fontSize: "12px", color: "#808897", margin: 0, lineHeight: 1.4 }}>{oneTime?.placeholder}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                     <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#1B223C" }}>{oneTime?.planPrice?.currency}</span>
                        <span style={{ fontSize: "32px", fontWeight: 800, color: isFree ? "#16a34a" : "#1B223C", lineHeight: 1 }}>{isFree ? "Free" : thisPrice.toFixed(0)}</span>
                     </div>
                     {!isFree && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                           <span style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>{oneTime?.planPrice?.currency} {(thisPrice * 1.3).toFixed(0)}</span>
                           <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff", background: "linear-gradient(90deg, #16a34a, #22c55e)", padding: "2px 7px", borderRadius: "10px" }}>30% OFF</span>
                        </div>
                     )}
                  </div>
                  <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e9edff, transparent)", margin: "0 0 18px 0" }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                     {oneTime?.PlanAccess?.map((planAccessName, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                           <div style={{
                              width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                              background: isPopular ? "linear-gradient(135deg, #800080, #b44db4)" : "#f0fdf4",
                              border: isPopular ? "none" : "1.5px solid #16a34a",
                              display: "flex", alignItems: "center", justifyContent: "center",
                           }}>
                              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                 <path d="M2 5l2.5 2.5L8 3" stroke={isPopular ? "#fff" : "#16a34a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </div>
                           <span style={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.5 }}>{planAccessName?.plan_access_description}</span>
                        </div>
                     ))}
                  </div>
                  <button onClick={onGetStarted} style={{
                     width: "100%", padding: "12px", borderRadius: "10px", fontSize: "13px",
                     fontWeight: 700, letterSpacing: "0.03em", border: "none", cursor: "pointer",
                     transition: "all 0.2s ease",
                     background: isPopular ? "linear-gradient(135deg, #800080, #b44db4)" : "#1B223C",
                     color: "#fff", boxShadow: isPopular ? "0 4px 16px rgba(128,0,128,0.3)" : "none",
                  }}
                     onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.filter = "brightness(1.08)"; }}
                     onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}
                  >Get Started</button>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="home-page-wrapper">
         <section className="hero" style={{ marginTop: '30px' }}>
            <div className="hero-left">
               <div className="hero-chip">
                  <div className="chip-dot"></div>
                  Built by ex-MAANG recruiters · 50,000+ resumes reviewed
               </div>

               <h1 className="hero-h1">
                  Your resume is<br />
                  getting filtered out.<br />
                  <span className="italic-accent">We fix that.</span>
               </h1>

               <p className="hero-sub">
                  75% of resumes are rejected by ATS software before a human ever reads them. Sign up, build your resume with our drag-and-drop editor, and get shortlisted faster.
               </p>

               <div className="hero-ctas">
                  <button className="btn-hero-primary" onClick={handleRippleClick(() => setOpenChoiceModal(true))}>
                     Sign up &amp; build my resume
                     <span className="btn-icon">→</span>
                  </button>
                  <button className="btn-hero-secondary" onClick={() => scrollTo('services')}>
                     See our services ↓
                  </button>
               </div>

               <div className="hero-proof">
                  <div className="proof-item">
                     <div className="proof-check">
                        <svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                     </div>
                     Sign up to get started
                  </div>
                  <div className="proof-item">
                     <div className="proof-check">
                        <svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                     </div>
                     Drag-and-drop resume builder
                  </div>
                  <div className="proof-item">
                     <div className="proof-check">
                        <svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                     </div>
                     Results in minutes
                  </div>
               </div>
            </div>

            <div className="hero-right">
               <div className="hero-resume-wrap">
                  <div className="before-tag">ATS Score: 34</div>
                  <div className="after-tag">After: 83 ↑</div>

                  <div className="resume-card">
                     <div className="rc-top-bar">
                        <div className="rc-title">Optimized Resume</div>
                        <div className="rc-score-badge">
                           <span className="rc-score-num">83</span>
                           <span className="rc-score-delta">▲+49</span>
                        </div>
                     </div>
                     <div className="rc-body">
                        <div className="rc-name">Rahul Sharma</div>
                        <div className="rc-role">Senior Product Manager · 8 years · Ex-Flipkart</div>
                        <div className="rc-divider"></div>
                        <div className="rc-section-lbl">Experience</div>
                        <div className="rc-lines">
                           <div className="rcl p w100"></div>
                           <div className="rcl p w82"></div>
                           <div className="rcl p w90"></div>
                           <div className="rcl p w67"></div>
                        </div>
                        <div className="rc-section-lbl">Skills</div>
                        <div className="rc-skills">
                           <div className="rc-skill">Product Strategy</div>
                           <div className="rc-skill">SQL</div>
                           <div className="rc-skill">Agile</div>
                           <div className="rc-skill">Stakeholder Mgmt</div>
                           <div className="rc-skill">Data Analysis</div>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                           <div className="rc-section-lbl">Education</div>
                           <div className="rcl w82" style={{ background: 'var(--surface2)' }}></div>
                           <div className="rcl w55" style={{ background: 'var(--surface2)' }}></div>
                        </div>
                     </div>
                  </div>

                  <div className="score-widget">
                     <AnimatedDonut end={83} delay={200} className="sw-ring" innerClassName="sw-num" />
                     <div>
                        <div className="sw-label">JD Match Score</div>
                        <div className="sw-val"><AnimatedCounter end={91} suffix="% aligned" duration={1200} /></div>
                        <div className="sw-change">▲ +63% improvement</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <div className="metrics r">
            <div className="metric">
               <div className="metric-num"><AnimatedCounter end={8400} suffix="+" duration={2500} /></div>
               <div className="metric-label">Resumes optimized</div>
            </div>
            <div className="metric">
               <div className="metric-num"><AnimatedCounter end={3.2} decimals={1} suffix="×" duration={2500} /></div>
               <div className="metric-label">More interview callbacks</div>
            </div>
            <div className="metric">
               <div className="metric-num"><AnimatedCounter end={50} suffix="K+" duration={2500} /></div>
               <div className="metric-label">Resumes reviewed by our team</div>
            </div>
            <div className="metric">
               <div className="metric-num"><AnimatedCounter isString={true} stringVal="MAANG" /></div>
               <div className="metric-label">Insider recruiter knowledge</div>
            </div>
         </div>

         <TornEdge bg="#FFFFFF" fill="#FBF5FB" />

         <div className="trust-strip">
            <div className="trust-inner">
               <div className="sec-label r" style={{ justifyContent: 'center' }}>Why trust us</div>
               <h2 className="sec-h r" style={{ textAlign: 'center', marginBottom: '8px' }}>MAANG insider knowledge,<br /><span className="it">built into every resume.</span></h2>
               <p style={{ textAlign: 'center', fontSize: '17px', color: 'var(--on-surface2)', fontWeight: 300, maxWidth: '540px', margin: '0 auto' }} className="r">Our founding team didn't just study recruitment — they lived it.</p>

               <div className="trust-grid r">
                  <div className="trust-card">
                     <div className="trust-stat">MAANG</div>
                     <div className="trust-title">Where we recruited</div>
                     <div className="trust-desc">Our team has recruited at Meta, Amazon, Apple, Netflix, and Google. We know their exact hiring bar — and we build it into your resume.</div>
                  </div>
                  <div className="trust-card">
                     <div className="trust-stat"><AnimatedCounter end={50000} duration={2000} /><span style={{ fontWeight: 300 }}>+</span></div>
                     <div className="trust-title">Resumes reviewed by hand</div>
                     <div className="trust-desc">Not AI-generated stats. Real resumes, real hiring decisions. We have seen every mistake — and we have fixed them all into ResumeMile's engine.</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="services-bg" id="services">
            <div className="sec">
               <div className="sec-label r">What we do</div>
               <h2 className="sec-h r">Three ways to get you <span className="it">shortlisted.</span></h2>
               <p className="sec-body r">Resume builder, JD matching, LinkedIn rewrite — all in one place, all backed by MAANG recruiter expertise.</p>

               <div className="services-grid r">
                  <div className="srv">
                     <div className="srv-accent srv-accent-purple"></div>
                     <div className="srv-number">Resume Builder</div>
                     <div className="srv-badge badge-purple">Most Popular</div>
                     <h3 className="srv-h">Build or Improve<br />Your Resume</h3>
                     <p className="srv-p">Start from scratch with our drag-and-drop builder — place every section exactly where you want it — or upload an existing resume. Our AI, trained on 50,000+ real resumes, optimizes your content.</p>
                     <div className="srv-features">
                        <div className="srv-feat">
                           <div className="feat-dot"><svg viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                           ATS-friendly structure and keywords
                        </div>
                        <div className="srv-feat">
                           <div className="feat-dot"><svg viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                           Recruiter-approved impact language
                        </div>
                        <div className="srv-feat">
                           <div className="feat-dot"><svg viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                           PDF or Word download, ready to apply
                        </div>
                        <div className="srv-feat">
                           <div className="feat-dot"><svg viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                           Import from LinkedIn in one click
                        </div>
                        <div className="srv-feat">
                           <div className="feat-dot"><svg viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#80007E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                           Drag-and-drop any section — add, remove, reorder freely
                        </div>
                     </div>
                     <div onClick={() => setOpenChoiceModal(true)} className="srv-link">Build my resume →</div>
                  </div>

                  <div className="srv">
                     <div className="srv-accent srv-accent-gold"></div>
                     <div className="srv-number">JD Matching</div>
                     <div className="srv-badge badge-gold">Highest Shortlisting Rate</div>
                     <h3 className="srv-h">Match Resume to<br />Job Description</h3>
                     <p className="srv-p">Paste any job description. We rewrite your resume to use the exact keywords and language that employer's ATS is scanning for. One tailored resume per role.</p>
                     <div className="srv-mini">
                        <div className="jd-row"><span className="jd-lbl">Keyword match</span><div className="jd-bar"><AnimatedProgress width={91} delay={200} className="jd-fill" /></div><span className="jd-pct"><AnimatedCounter end={91} suffix="%" duration={1200} /></span></div>
                        <div className="jd-row"><span className="jd-lbl">Skills aligned</span><div className="jd-bar"><AnimatedProgress width={88} delay={400} className="jd-fill" /></div><span className="jd-pct"><AnimatedCounter end={88} suffix="%" duration={1200} /></span></div>
                        <div className="jd-row"><span className="jd-lbl">Role language</span><div className="jd-bar"><AnimatedProgress width={94} delay={600} className="jd-fill" /></div><span className="jd-pct"><AnimatedCounter end={94} suffix="%" duration={1200} /></span></div>
                     </div>
                     <div onClick={() => setOpenChoiceModal(true)} className="srv-link" style={{ color: '#92690A', borderColor: '#92690A' }}>Match to my dream job →</div>
                  </div>

                  <div className="srv">
                     <div className="srv-accent srv-accent-blue"></div>
                     <div className="srv-number">LinkedIn Rewrite</div>
                     <div className="srv-badge badge-blue">3× More Recruiter Views</div>
                     <h3 className="srv-h">LinkedIn Profile<br />Rewrite</h3>
                     <p className="srv-p">Recruiters search LinkedIn every day. If your profile isn't optimized, they skip you. We rewrite your headline, summary, and skills so recruiters find you first.</p>
                     <div className="srv-mini">
                        <div className="li-header">
                           <div className="li-av">R</div>
                           <div><div className="li-n">Rahul Sharma</div><div className="li-hl">Senior PM · FinTech · Ex-Flipkart</div></div>
                        </div>
                        <div className="li-stats">
                           <div className="li-stat"><div className="li-sn"><AnimatedCounter end={340} suffix="%" duration={2000} /></div><div className="li-sl">More views</div></div>
                           <div className="li-stat"><div className="li-sn"><AnimatedCounter end={12} suffix="×" duration={2000} /></div><div className="li-sl">More InMails</div></div>
                           <div className="li-stat"><div className="li-sn"><AnimatedCounter end={1} prefix="#" duration={2000} /></div><div className="li-sl">Search rank</div></div>
                        </div>
                     </div>
                     <div onClick={() => setOpenChoiceModal(true)} className="srv-link" style={{ color: '#1D4ED8', borderColor: '#1D4ED8' }}>Rewrite my LinkedIn →</div>
                  </div>
               </div>
            </div>
         </div>

         <WaveEdge bg="#FBF5FB" fill="#FFFFFF" />

         <div className="builder-bg">
            <div className="builder-inner">
               <div className="r">
                  <div className="sec-label">Resume builder</div>
                  <h2 className="sec-h">Your resume,<br /><span className="it">your way.</span></h2>
                  <p className="sec-body">Our drag-and-drop builder gives you full control. Add any section, place it anywhere, remove what you don't need. No rigid templates. No locked layouts.</p>

                  <div className="builder-features">
                     <div className="bf-item">
                        <div className="bf-icon">⠿</div>
                        <div>
                           <div className="bf-title">Drag any section anywhere</div>
                           <div className="bf-desc">Move Experience above Education, put Skills at the top, add a Projects block mid-page — arrange your resume exactly the way you want it.</div>
                        </div>
                     </div>
                     <div className="bf-item">
                        <div className="bf-icon">＋</div>
                        <div>
                           <div className="bf-title">Add or remove any field</div>
                           <div className="bf-desc">Include a Publications section, a Languages block, or a custom Summary. Remove anything that doesn't fit your profile. Every field is optional.</div>
                        </div>
                     </div>
                     <div className="bf-item">
                        <div className="bf-icon">⚡</div>
                        <div>
                           <div className="bf-title">AI fills in the gaps</div>
                           <div className="bf-desc">Once your structure is set, our AI rewrites each section with recruiter-approved language and ATS-optimised keywords — instantly.</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="builder-canvas r d2">
                  <div className="drag-hint">✦ Drag to reorder</div>
                  <div className="builder-topbar">
                     <div className="btb-dots">
                        <div className="btb-dot r"></div>
                        <div className="btb-dot y"></div>
                        <div className="btb-dot g"></div>
                     </div>
                     <div className="btb-title">Resume Builder — ResumeMile</div>
                     <div className="btb-btn">Download PDF</div>
                  </div>
                  <div className="builder-body" style={{ overflowX: 'hidden' }}>

                     <ScrollReveal delay={100}>
                        <div className="dnd-block" style={{ borderColor: 'var(--p80)', background: 'var(--p99)' }}>
                           <div className="dnd-header">
                              <div className="dnd-grip" style={{ opacity: 0.2 }}>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                              </div>
                              <div className="dnd-label" style={{ color: 'var(--p30)' }}>Contact Header</div>
                              <div className="dnd-actions">
                                 <div className="dnd-action">✎</div>
                              </div>
                           </div>
                           <div className="dnd-content">
                              <div className="dnd-line p w75"></div>
                              <div className="dnd-line p w40"></div>
                           </div>
                        </div>
                     </ScrollReveal>

                     <ScrollReveal delay={250}>
                        <div className="dnd-block dragging">
                           <div className="dnd-header">
                              <div className="dnd-grip">
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                              </div>
                              <div className="dnd-label">Experience</div>
                              <div className="dnd-actions">
                                 <div className="dnd-action">✎</div>
                                 <div className="dnd-action">⊕</div>
                                 <div className="dnd-action">✕</div>
                              </div>
                           </div>
                           <div className="dnd-content">
                              <div className="dnd-line p w88"></div>
                              <div className="dnd-line w100"></div>
                              <div className="dnd-line w75"></div>
                              <div className="dnd-line w55"></div>
                           </div>
                        </div>
                     </ScrollReveal>

                     <ScrollReveal delay={400}>
                        <div className="dnd-block">
                           <div className="dnd-header">
                              <div className="dnd-grip">
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                              </div>
                              <div className="dnd-label">Skills</div>
                              <div className="dnd-actions">
                                 <div className="dnd-action">✎</div>
                                 <div className="dnd-action">✕</div>
                              </div>
                           </div>
                           <div className="dnd-content">
                              <div className="dnd-line p w55"></div>
                              <div className="dnd-line w40"></div>
                           </div>
                        </div>
                     </ScrollReveal>

                     <ScrollReveal delay={550}>
                        <div className="dnd-block">
                           <div className="dnd-header">
                              <div className="dnd-grip">
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                                 <div className="grip-row"><div className="grip-dot"></div><div className="grip-dot"></div></div>
                              </div>
                              <div className="dnd-label">Education</div>
                              <div className="dnd-actions">
                                 <div className="dnd-action">✎</div>
                                 <div className="dnd-action">✕</div>
                              </div>
                           </div>
                           <div className="dnd-content">
                              <div className="dnd-line w88"></div>
                              <div className="dnd-line w55"></div>
                           </div>
                        </div>
                     </ScrollReveal>

                     <ScrollReveal delay={700}>
                        <div className="dnd-add" onMouseEnter={(e) => e.currentTarget.style.background = 'var(--p95)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                           <div className="dnd-add-icon">+</div>
                           Add a section — Certifications, Projects, Languages…
                        </div>
                     </ScrollReveal>

                  </div>
               </div>
            </div>
         </div>



         <div id="how">
            <div className="sec">
               <div className="how-grid">
                  <div>
                     <div className="sec-label r">How it works</div>
                     <h2 className="sec-h r">Three steps.<br /><span className="it">One shortlist.</span></h2>
                     <div className="how-steps">
                        <ScrollReveal delay={100} style={{ transform: 'translateX(0)', transform: 'translateY(30px)' }}>
                           <div className="how-step r">
                              <div className="how-step-num">1</div>
                              <div>
                                 <div className="how-step-tag">2 minutes to set up</div>
                                 <div className="how-step-h">Sign up and build your resume</div>
                                 <p className="how-step-p">Create an account and use our drag-and-drop resume builder — add, remove, and rearrange any section exactly where you want it. Or import your existing resume.</p>
                              </div>
                           </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300} style={{ transform: 'translateX(0)', transform: 'translateY(30px)' }}>
                           <div className="how-step r d1">
                              <div className="how-step-num">2</div>
                              <div>
                                 <div className="how-step-h">Paste the job description</div>
                                 <p className="how-step-p">Our AI rewrites your resume with the exact keywords and structure that employer's ATS is scanning for — matched to that specific role.</p>
                              </div>
                           </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500} style={{ transform: 'translateX(0)', transform: 'translateY(30px)' }}>
                           <div className="how-step r d2">
                              <div className="how-step-num">3</div>
                              <div>
                                 <div className="how-step-h">Download and apply</div>
                                 <p className="how-step-p">Download as PDF or Word in one click. ATS-tested. Recruiter-approved. Apply knowing your resume will actually reach a human.</p>
                              </div>
                           </div>
                        </ScrollReveal>
                     </div>
                  </div>

                  <div className="r d2">
                     <div className="ats-dashboard" id="atsCard">
                        <div className="ats-dash-header">
                           <div className="ats-dash-title">ATS Analysis Report</div>
                           <div className="ats-dash-meta">ResumeMile · Live score</div>
                        </div>
                        <div className="ats-dash-body">
                           <div className="score-display">
                              <AnimatedDonut end={83} delay={200} />
                              <div>
                                 <div className="score-info-lbl">Your ATS score</div>
                                 <div className="score-info-val">Highly optimized</div>
                                 <div className="score-delta-badge">▲ +49 after ResumeMile</div>
                              </div>
                           </div>
                           <div className="ats-sep"></div>
                           <div className="ats-row"><div className="ats-row-lbl">Keyword match</div><div className="ats-row-bar"><AnimatedProgress width={83} delay={400} /></div><div className="ats-row-pct"><AnimatedCounter end={83} suffix="%" duration={1200} /></div></div>
                           <div className="ats-row"><div className="ats-row-lbl">JD alignment</div><div className="ats-row-bar"><AnimatedProgress width={91} delay={500} /></div><div className="ats-row-pct"><AnimatedCounter end={91} suffix="%" duration={1200} /></div></div>
                           <div className="ats-row"><div className="ats-row-lbl">Skills section</div><div className="ats-row-bar"><AnimatedProgress width={78} delay={600} /></div><div className="ats-row-pct"><AnimatedCounter end={78} suffix="%" duration={1200} /></div></div>
                           <div className="ats-row"><div className="ats-row-lbl">Format score</div><div className="ats-row-bar"><AnimatedProgress width={96} delay={700} /></div><div className="ats-row-pct"><AnimatedCounter end={96} suffix="%" duration={1200} /></div></div>
                           <div className="ats-row"><div className="ats-row-lbl">Action verbs</div><div className="ats-row-bar"><AnimatedProgress width={88} delay={800} /></div><div className="ats-row-pct"><AnimatedCounter end={88} suffix="%" duration={1200} /></div></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <WaveEdge bg="#FFFFFF" fill="#FBF5FB" />

         <div className="compare-bg">
            <div className="sec">
               <div className="sec-label r">Why not ChatGPT or any other LLM model?</div>
               <h2 className="sec-h r">Text generation ≠ <span className="it">getting hired.</span></h2>
               <div className="compare-table r">
                  <div className="ct-head">
                     <div className="ct-hcell label">Feature</div>
                     <div className="ct-hcell gpt">ChatGPT</div>
                     <div className="ct-hcell rm"><div className="rm-live-dot"></div> ResumeMile</div>
                  </div>
                  <div className="ct-row"><div className="ct-cell label">Drag-and-drop resume builder</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">ATS score for your resume</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">Match resume to job description</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">LinkedIn profile rewrite</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">Formatted PDF or Word download</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">MAANG recruiter-approved templates</div><div className="ct-cell gpt"><span className="icon-cross">✗</span></div><div className="ct-cell rm"><span className="icon-check">✓</span></div></div>
                  <div className="ct-row"><div className="ct-cell label">Avoids ATS-flagged AI phrasing</div><div className="ct-cell gpt"><span className="icon-cross">✗ Flags your resume</span></div><div className="ct-cell rm"><span className="icon-check">✓ Human-like</span></div></div>
               </div>
            </div>
         </div>

         <TornEdge bg="#FBF5FB" fill="#FFFFFF" />

         <div className="sec" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="sec-label r">Real results</div>
            <h2 className="sec-h r">They applied. <span className="it">They got called.</span></h2>
            <div className="testi-grid">
               <div className="testi r">
                  <div className="testi-chip">↑ ATS score: 34 → 83</div>
                  <p className="testi-q">"40 applications. Zero callbacks. Used ResumeMile — 3 interview calls in 2 weeks. Turned out my ATS score was 34. I had no idea that was even a thing."</p>
                  <div className="testi-person"><div className="testi-av">P</div><div><div className="testi-nm">Priya M.</div><div className="testi-role">Software Engineer · Bangalore</div></div></div>
               </div>
               <div className="testi r d1">
                  <div className="testi-chip">↑ JD match: 28% → 91%</div>
                  <p className="testi-q">"My resume looked fine to me. ResumeMile showed my JD match was 28% for the exact role I wanted. After the rewrite it hit 91%. Offer in 6 weeks."</p>
                  <div className="testi-person"><div className="testi-av">R</div><div><div className="testi-nm">Rahul S.</div><div className="testi-role">Product Manager · Hyderabad</div></div></div>
               </div>
               <div className="testi r d2">
                  <div className="testi-chip">↑ LinkedIn views +340%</div>
                  <p className="testi-q">"I had a good profile but nobody was finding me. The LinkedIn rewrite changed everything — recruiters started reaching out within days. Worth every rupee."</p>
                  <div className="testi-person"><div className="testi-av">A</div><div><div className="testi-nm">Anjali K.</div><div className="testi-role">Data Analyst · Pune</div></div></div>
               </div>
            </div>
         </div>

         <WaveEdge bg="#FFFFFF" fill="#FBF5FB" />

         <div className="faq-bg">
            <div className="sec" style={{ maxWidth: '1280px', margin: '0 auto' }}>
               <div className="sec-label r">Common questions</div>
               <h2 className="sec-h r">Everything you need<br /><span className="it">to know.</span></h2>

               <div className="faq-grid r">
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        What exactly is an ATS score?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">ATS stands for Applicant Tracking System — software that companies use to automatically scan and filter resumes before any human sees them. We ensure your resume passes this scan.</div></div>
                  </div>
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        What happens after I upload my resume?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">Sign up, then use our drag-and-drop builder to create your resume — add any section, place it anywhere, and reorder with a simple drag. Our AI will then optimize it.</div></div>
                  </div>
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        How is this different from just using ChatGPT?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">ChatGPT generates generic text. ResumeMile is purpose-built for getting hired — it scores your resume against ATS criteria, matches it to a job description, and provides a formatted PDF.</div></div>
                  </div>
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        How does the drag-and-drop builder work?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">After signing up, you get a live resume canvas. Every section — Summary, Experience, Education, Skills, Projects, Certifications — is a draggable block. Arrange them easily.</div></div>
                  </div>
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        Will my resume look professional, not AI-generated?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">Yes. Our AI is trained to avoid the generic phrasing that ATS systems and recruiters flag as AI-written. The output reads like a human wrote it.</div></div>
                  </div>
                  <div className="faq-item">
                     <div className="faq-q" onClick={toggleFaq}>
                        What formats can I download?
                        <div className="faq-chevron">▾</div>
                     </div>
                     <div className="faq-a"><div className="faq-a-inner">PDF and Word (.docx) — both included in every paid plan. PDF for submitting online applications. Word for recruiters who ask for an editable version.</div></div>
                  </div>
               </div>
            </div>
         </div>

         <WaveEdge bg="#FBF5FB" fill="#FFFFFF" />

         <div id="pricing">
            <div className="sec" style={{ maxWidth: '1280px', margin: '0 auto' }}>
               <div className="sec-label r">Pricing</div>
               <h2 className="sec-h r">Simple plans. <span className="it">Real results.</span></h2>
               <p className="sec-body r" style={{ marginBottom: '32px' }}>Every plan includes PDF or Word download, 5 AI improvement rounds, and 3-month validity.</p>

               <div className="subscription_tab_section" style={{ marginTop: '20px' }}>
                  <Tabs>
                     <TabList style={{ display: 'flex', justifyContent: 'center', gap: '10px', border: 'none', marginBottom: '24px' }}>
                        <Tab className="nav-tab" selectedClassName="active">Build</Tab>
                        <Tab className="nav-tab" selectedClassName="active">Break Through </Tab>
                        <Tab className="nav-tab" selectedClassName="active">Institution </Tab>
                     </TabList>
                     <p className="text-sm text-[#a536a2] font-bold my-2 text-center" style={{ marginBottom: '24px' }}>
                        Buy as many plans as you want. You can use each plan until its expiry date, and purchasing a new plan will not affect your existing plan.
                     </p>

                     <TabPanel>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-transparent rounded-4xl mx-4 lg:mx-0" style={{ justifyItems: 'center' }}>
                           {plans?.data?.map((oneTime) => (
                              oneTime?.plan_frequency === 1 && (
                                 <div key={oneTime?.id} style={{ width: '100%', maxWidth: '300px' }}>
                                    <PlanCard oneTime={oneTime} popularId={3} onGetStarted={() => setOpenLoginModal(true)} />
                                 </div>
                              )
                           ))}
                        </div>
                     </TabPanel>

                     <TabPanel>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-transparent rounded-4xl mx-4 lg:mx-0" style={{ justifyItems: 'center' }}>
                           {plans?.data?.map((oneTime) => (
                              oneTime?.plan_frequency === 3 && (
                                 <div key={oneTime?.id} style={{ width: '100%', maxWidth: '300px' }}>
                                    <PlanCard oneTime={oneTime} popularId={12} onGetStarted={() => setOpenLoginModal(true)} />
                                 </div>
                              )
                           ))}
                        </div>
                     </TabPanel>

                     <TabPanel>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-transparent rounded-4xl mx-4 lg:mx-0" style={{ justifyItems: 'center' }}>
                           {plansHomeData?.data?.map((oneTime) => (
                              oneTime?.plan_frequency === 12 && (
                                 <div key={oneTime?.id} style={{ width: '100%', maxWidth: '300px' }}>
                                    <PlanCard oneTime={oneTime} popularId={7} onGetStarted={() => setOpenLoginModal(true)} />
                                 </div>
                              )
                           ))}
                        </div>
                     </TabPanel>
                  </Tabs>
               </div>
            </div>
         </div>

         <WaveEdge bg="#FFFFFF" fill="#FBF5FB" />

         <section className="bottom-cta">
            <div className="bottom-inner r">
               <h2>Your next job starts<br /><span className="it">here.</span></h2>
               <p>Sign up, build with our drag-and-drop editor, and apply with a resume that actually gets read.</p>
               <button className="btn-hero-primary" style={{ margin: '0 auto' }} onClick={handleRippleClick(() => setOpenChoiceModal(true))}>
                  Get my optimised resume
                  <span className="btn-icon">→</span>
               </button>
               <div className="bottom-trust">
                  <div className="bottom-trust-item">Sign up in 2 minutes</div>
                  <div className="bottom-trust-item">No credit card</div>
                  <div className="bottom-trust-item">8,400+ already shortlisted</div>
               </div>
            </div>
         </section>

         {openLoginModal && (
            <LoginModal
               openLoginModal={openLoginModal}
               setOpenLoginModal={setOpenLoginModal}
               setOpenRegisterModal={setOpenRegisterModal}
               setOpenChoiceModal={setOpenChoiceModal}
            />
         )}

         {openRegisterModal && (
            <RegistrationModal
               openRegisterModal={openRegisterModal}
               setOpenRegisterModal={setOpenRegisterModal}
               openVerifyOtpModal={openVerifyOtpModal}
               setOpenVerifyOtpModal={setOpenVerifyOtpModal}
               setOpenLoginModal={setOpenLoginModal}
               openPricModal={openPricModal}
               setOpenPriceModal={setOpenPriceModal}
               chooseResumeType={chooseResumeType}
            />
         )}

         {openChoiceModal && (
            <ChoiceModal
               openChoiceModal={openChoiceModal}
               setOpenChoiceModal={setOpenChoiceModal}
               setChooseResumeType={setChooseResumeType}
               setOpenRegisterModal={setOpenRegisterModal}
            />
         )}

         {openPricModal && (
            <PriceListModal
               openPricModal={openPricModal}
               setOpenPriceModal={setOpenPriceModal}
            />
         )}
      </div>
   );
}
