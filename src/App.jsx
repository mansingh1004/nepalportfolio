// import { useState, useEffect, useRef } from "react";

// // ============================================================
// // UTILITY: useInView hook (scroll reveal)
// // ============================================================
// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, inView];
// }

// // ============================================================
// // UTILITY: Animated Counter
// // ============================================================
// function Counter({ end, suffix = "", duration = 2000 }) {
//   const [count, setCount] = useState(0);
//   const [ref, inView] = useInView(0.3);
//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = end / (duration / 16);
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= end) { setCount(end); clearInterval(timer); }
//       else setCount(Math.floor(start));
//     }, 16);
//     return () => clearInterval(timer);
//   }, [inView, end, duration]);
//   return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
// }

// // ============================================================
// // STYLES (injected via <style>)
// // ============================================================
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

// *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// html, body, #root { width: 100%; min-height: 100vh; }
// :root {
//   --navy: #040d1a;
//   --navy2: #071428;
//   --navy3: #0a1d3a;
//   --blue: #1a6bd4;
//   --cyan: #00c6ff;
//   --gold: #c9a227;
//   --gold2: #f0d060;
//   --white: #f0f4ff;
//   --muted: #8899bb;
//   --glass: rgba(10,25,60,0.55);
//   --glass2: rgba(255,255,255,0.04);
//   --border: rgba(0,198,255,0.18);
//   --glow: 0 0 30px rgba(0,198,255,0.22);
//   --gold-glow: 0 0 20px rgba(201,162,39,0.3);
// }
// html { scroll-behavior: smooth; }
// body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
// ::selection { background: rgba(0,198,255,0.3); }

// /* Scrollbar */
// ::-webkit-scrollbar { width: 5px; }
// ::-webkit-scrollbar-track { background: var(--navy); }
// ::-webkit-scrollbar-thumb { background: linear-gradient(var(--cyan),var(--gold)); border-radius: 3px; }

// /* Scroll progress */
// #progress-bar { position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,var(--cyan),var(--gold)); z-index:9999; transition:width .1s; }

// /* Particles */
// .particle { position:absolute; border-radius:50%; pointer-events:none; animation: float-particle linear infinite; }
// @keyframes float-particle { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:1} 90%{opacity:.4} 100%{transform:translateY(-100px) scale(1);opacity:0} }

// /* Cursor glow */
// .cursor-glow { position:fixed; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle,rgba(0,198,255,0.07),transparent 70%); pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:transform .08s; display:none; }
// @media(pointer: fine) { .cursor-glow { display:block; } } /* Hide on touch devices */

// /* Typing */
// @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
// .cursor { display:inline-block; width:3px; height:1em; background:var(--cyan); margin-left:4px; animation:blink 1s infinite; vertical-align:middle; }

// /* Reveal animation */
// .reveal { opacity:0; transform:translateY(40px); transition:opacity .7s ease, transform .7s ease; }
// .reveal.visible { opacity:1; transform:none; }
// .reveal-left { opacity:0; transform:translateX(-50px); transition:opacity .8s ease, transform .8s ease; }
// .reveal-left.visible { opacity:1; transform:none; }
// .reveal-right { opacity:0; transform:translateX(50px); transition:opacity .8s ease, transform .8s ease; }
// .reveal-right.visible { opacity:1; transform:none; }

// /* Stagger */
// .stagger > * { opacity:0; transform:translateY(30px); transition: opacity .6s ease, transform .6s ease; }
// .stagger.visible > *:nth-child(1){opacity:1;transform:none;transition-delay:.05s}
// .stagger.visible > *:nth-child(2){opacity:1;transform:none;transition-delay:.15s}
// .stagger.visible > *:nth-child(3){opacity:1;transform:none;transition-delay:.25s}
// .stagger.visible > *:nth-child(4){opacity:1;transform:none;transition-delay:.35s}
// .stagger.visible > *:nth-child(5){opacity:1;transform:none;transition-delay:.45s}
// .stagger.visible > *:nth-child(6){opacity:1;transform:none;transition-delay:.55s}
// .stagger.visible > *:nth-child(7){opacity:1;transform:none;transition-delay:.65s}
// .stagger.visible > *:nth-child(8){opacity:1;transform:none;transition-delay:.75s}

// /* Glass card */
// .glass-card { background:var(--glass); backdrop-filter:blur(16px); border:1px solid var(--border); border-radius:16px; }

// /* Gradient text */
// .grad-text { background:linear-gradient(135deg,var(--cyan),var(--white),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
// .grad-cyan { background:linear-gradient(135deg,var(--cyan),#60a5fa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

// /* Glow btn */
// .btn-glow { position:relative; padding:14px 36px; border-radius:50px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:.95rem; cursor:pointer; transition:all .3s; border:none; outline:none; text-align:center; }
// .btn-primary { background:linear-gradient(135deg,var(--blue),var(--cyan)); color:#fff; box-shadow:0 0 20px rgba(0,198,255,.35); }
// .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(0,198,255,.55); }
// .btn-outline { background:transparent; color:var(--white); border:1.5px solid rgba(0,198,255,.5); }
// .btn-outline:hover { background:rgba(0,198,255,.1); border-color:var(--cyan); transform:translateY(-2px); box-shadow:var(--glow); }
// .btn-gold { background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#080808; box-shadow:0 0 20px rgba(201,162,39,.35); }
// .btn-gold:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(201,162,39,.55); }

// /* Navbar */
// nav { position:fixed; top:0; left:0; right:0; z-index:1000; transition:all .4s; padding:20px 0; }
// nav.scrolled { background:rgba(4,13,26,.92); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); padding:12px 0; }
// .nav-link { color:var(--muted); font-size:.9rem; font-weight:500; cursor:pointer; transition:color .3s; position:relative; padding:4px 0; }
// .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:linear-gradient(90deg,var(--cyan),var(--gold)); transition:width .3s; border-radius:2px; }
// .nav-link:hover, .nav-link.active { color:var(--white); }
// .nav-link:hover::after, .nav-link.active::after { width:100%; }

// /* Hero */
// .hero-bg { background:linear-gradient(135deg, #040d1a 0%, #071428 30%, #091828 60%, #040d1a 100%); position:relative; overflow:hidden; }
// .hero-bg::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 50% at 50% 40%,rgba(26,107,212,.18),transparent); }
// .hero-bg::after { content:''; position:absolute; top:-50%; left:-20%; width:60%; height:120%; background:radial-gradient(ellipse,rgba(0,198,255,.08),transparent 60%); animation:hero-pulse 6s ease-in-out infinite alternate; }
// @keyframes hero-pulse { 0%{transform:scale(1) translateX(0)} 100%{transform:scale(1.1) translateX(5%)} }

// .hero-stats-wrapper { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(4,13,26,.85); backdrop-filter: blur(20px); border-top: 1px solid rgba(0,198,255,.12); }
// .hero-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 900px; margin: 0 auto; }
// .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }

// /* Service & Features cards */
// .service-card { background:var(--glass2); border:1px solid rgba(0,198,255,.1); border-radius:14px; padding:28px 22px; transition:all .4s; cursor:default; position:relative; overflow:hidden; }
// .service-card::before { content:''; position:absolute; inset:0; border-radius:14px; opacity:0; background:linear-gradient(135deg,rgba(0,198,255,.08),rgba(26,107,212,.08)); transition:opacity .4s; }
// .service-card:hover { border-color:rgba(0,198,255,.4); transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,198,255,.12),var(--glow); }
// .service-card:hover::before { opacity:1; }
// .service-icon { width:52px; height:52px; border-radius:12px; background:linear-gradient(135deg,rgba(0,198,255,.15),rgba(26,107,212,.15)); display:flex; align-items:center; justify-content:center; margin-bottom:16px; font-size:1.5rem; transition:all .4s; }
// .service-card:hover .service-icon { background:linear-gradient(135deg,rgba(0,198,255,.3),rgba(26,107,212,.3)); box-shadow:0 0 20px rgba(0,198,255,.25); }

// /* Package cards */
// .pkg-card { border-radius:18px; overflow:hidden; position:relative; cursor:pointer; transition:all .4s; border:1px solid rgba(255,255,255,.06); }
// .pkg-card:hover { transform:translateY(-8px); box-shadow:0 30px 80px rgba(0,0,0,.5); }
// .pkg-img { width:100%; height:220px; object-fit:cover; transition:transform .5s; }
// .pkg-card:hover .pkg-img { transform:scale(1.08); }
// .pkg-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(4,13,26,.98) 0%,rgba(4,13,26,.5) 50%,transparent 80%); pointer-events: none;}

// /* Gallery */
// .gallery-item { position:relative; overflow:hidden; border-radius:12px; cursor:pointer; }
// .gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
// .gallery-item:hover img { transform:scale(1.1); }
// .gallery-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,198,255,.6),transparent); opacity:0; transition:opacity .4s; display:flex; align-items:flex-end; padding:16px; }
// .gallery-item:hover .gallery-overlay { opacity:1; }

// /* Testimonial slider */
// .testimonial-track { display:flex; gap:24px; animation:slide-testimonials 30s linear infinite; }
// .testimonial-track:hover { animation-play-state:paused; }
// @keyframes slide-testimonials { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

// /* FAQ accordion */
// .faq-item { border:1px solid rgba(0,198,255,.12); border-radius:12px; overflow:hidden; transition:border-color .3s; margin-bottom:12px; }
// .faq-item.open { border-color:rgba(0,198,255,.35); }
// .faq-q { padding:20px 24px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:background .3s; }
// .faq-q:hover { background:rgba(0,198,255,.05); }
// .faq-a { max-height:0; overflow:hidden; transition:max-height .4s ease, padding .4s; }
// .faq-a.open { max-height:200px; padding:0 24px 20px; }
// .faq-icon { transition:transform .3s; font-size:1.2rem; color:var(--cyan); }
// .faq-item.open .faq-icon { transform:rotate(45deg); }

// /* Contact form */
// .form-input { width:100%; background:rgba(255,255,255,.04); border:1px solid rgba(0,198,255,.2); border-radius:10px; padding:14px 18px; color:var(--white); font-family:'DM Sans',sans-serif; font-size:.9rem; transition:all .3s; outline:none; }
// .form-input:focus { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(0,198,255,.12); }
// .form-input::placeholder { color:var(--muted); }
// textarea.form-input { resize:vertical; min-height:120px; }

// /* Layout Utilities */
// .grad-line { height:1px; background:linear-gradient(90deg,transparent,var(--cyan),var(--gold),transparent); }
// .section-label { font-size:.78rem; font-family:'DM Sans',sans-serif; letter-spacing:.2em; text-transform:uppercase; color:var(--cyan); font-weight:600; margin-bottom:12px; }
// .section-title { font-family:'Cinzel',serif; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:700; line-height:1.2; margin-bottom:16px; }
// .section-sub { color:var(--muted); font-size:1rem; max-width:520px; line-height:1.7; }
// .stars { color:var(--gold); letter-spacing:2px; }

// /* Mobile menu */
// .mobile-menu { position:fixed; inset:0; background:rgba(4,13,26,.98); backdrop-filter:blur(20px); z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; }

// /* Filter tabs */
// .filter-tab { padding:9px 22px; border-radius:50px; font-size:.88rem; font-weight:500; cursor:pointer; transition:all .3s; border:1.5px solid rgba(0,198,255,.2); color:var(--muted); background:transparent; }
// .filter-tab.active, .filter-tab:hover { background:linear-gradient(135deg,var(--blue),rgba(0,198,255,.3)); border-color:var(--cyan); color:var(--white); }
// .feature-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,var(--cyan),var(--blue)); flex-shrink:0; margin-top:6px; box-shadow:0 0 8px rgba(0,198,255,.5); }

// /* Global Buttons */
// .wa-btn { position:fixed; bottom:80px; right:24px; width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#25D366,#128C7E); display:flex; align-items:center; justify-content:center; font-size:1.5rem; cursor:pointer; z-index:500; box-shadow:0 4px 20px rgba(37,211,102,.4); transition:all .3s; }
// .wa-btn:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(37,211,102,.6); }

// /* Chatbot Button */
// .chat-btn { position:fixed; bottom:150px; right:24px; width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--cyan)); display:flex; align-items:center; justify-content:center; font-size:1.5rem; cursor:pointer; z-index:500; box-shadow:0 4px 20px rgba(0,198,255,.4); transition:all .3s; }
// .chat-btn:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(0,198,255,.6); }

// .back-top { position:fixed; bottom:18px; right:24px; width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--cyan)); display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:500; transition:all .3s; opacity:0; pointer-events:none; font-size:1.1rem; }
// .back-top.show { opacity:1; pointer-events:all; }
// .back-top:hover { transform:translateY(-3px); box-shadow:var(--glow); }

// /* Loaders & Decor */
// .loader { position:fixed; inset:0; background:var(--navy); z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center; transition:opacity .6s, visibility .6s; }
// .loader.done { opacity:0; visibility:hidden; }
// .loader-ring { width:60px; height:60px; border:3px solid rgba(0,198,255,.2); border-top-color:var(--cyan); border-radius:50%; animation:spin 1s linear infinite; }
// @keyframes spin { to{transform:rotate(360deg)} }
// .loader-logo { font-family:'Cinzel',serif; font-size:1.4rem; margin-top:20px; background:linear-gradient(135deg,var(--cyan),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

// .why-card { padding:32px 28px; border-radius:16px; background:linear-gradient(135deg,rgba(10,25,60,.6),rgba(7,20,40,.6)); border:1px solid rgba(0,198,255,.1); transition:all .4s; }
// .why-card:hover { border-color:rgba(0,198,255,.3); transform:translateY(-4px); box-shadow:0 20px 50px rgba(0,0,0,.3); }
// .stat-item { text-align:center; padding:24px 20px; border-right:1px solid rgba(0,198,255,.15); }
// .stat-item:last-child { border-right:none; }

// .newsletter-input { flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(0,198,255,.2); border-radius:50px 0 0 50px; padding:14px 22px; color:var(--white); outline:none; font-family:'DM Sans'; min-width:0; }
// .newsletter-input:focus { border-color:var(--cyan); }
// .newsletter-btn { padding:14px 28px; background:linear-gradient(135deg,var(--blue),var(--cyan)); border:none; border-radius:0 50px 50px 0; color:#fff; font-weight:600; cursor:pointer; transition:all .3s; white-space:nowrap; }
// .newsletter-btn:hover { box-shadow:var(--glow); }

// .social-icon { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all .3s; font-size:1rem; }
// .social-icon:hover { background:rgba(0,198,255,.15); border-color:var(--cyan); transform:translateY(-3px); color:var(--cyan); }

// /* Responsive Adjustments */
// @media (max-width:768px) {
//   .desktop-nav { display:none !important; } 

//   .hero-btns { flex-direction:column; align-items:center; }
//   .btn-glow { width: 100%; }
//   .hero-stats-wrapper { position: relative; border-top: none; background: transparent; padding-top: 20px; }
//   .hero-stats-grid { grid-template-columns: 1fr; gap: 10px; }
//   .stat-item { border-right:none; border-bottom:1px solid rgba(0,198,255,.15); padding: 15px; }
//   .stat-item:last-child { border-bottom:none; }
  
//   .responsive-2col { grid-template-columns: 1fr!important; gap: 40px; }
//   .contact-grid { grid-template-columns: 1fr; margin-bottom: 0; }
//   .footer-grid { grid-template-columns: 1fr!important; }
// }
// @media (min-width:769px) {
//   .mobile-ham { display:none !important; }
// }
// `;

// // ============================================================
// // DATA (Truncated standard data structure as original)
// // ============================================================
// const navLinks = ["Home","About","Services","Packages","Gallery","Testimonials","Contact"];

// const services = [
//   { icon: "🗺️", title: "Nepal Tour Packages", desc: "Expertly crafted tours covering Nepal's most breathtaking landscapes and cultural wonders." },
//   { icon: "🏨", title: "Hotel Booking", desc: "Handpicked luxury and budget-friendly accommodations for a comfortable stay." },
//   { icon: "🚗", title: "Car Rental", desc: "Comfortable, well-maintained vehicles with professional drivers for all terrains." },
//   { icon: "✈️", title: "Flight Booking", desc: "Best deals on domestic and international flights to and from Nepal." },
//   { icon: "🥾", title: "Trekking Tours", desc: "Guided treks to Everest Base Camp, Annapurna Circuit, Langtang and beyond." },
//   { icon: "💑", title: "Honeymoon Packages", desc: "Romantic getaways to Pokhara, Nagarkot, and scenic hill stations of Nepal." },
//   { icon: "👥", title: "Group Tours", desc: "Specially designed group packages with exclusive discounts and tailored itineraries." },
//   { icon: "🎯", title: "Adventure Activities", desc: "Paragliding, bungee jumping, white-water rafting, zip-lining and much more." },
// ];

// const packages = [
//   { title: "Kathmandu & Pokhara Tour", location: "Kathmandu · Pokhara", days: "7 Days", rating: 5, price: "₹18,999", tag: "Popular", category: "Cultural" },
//   { title: "Muktinath Yatra", location: "Mustang · Muktinath", days: "10 Days", rating: 5, price: "₹24,999", tag: "Spiritual", category: "Spiritual" },
//   { title: "Chitwan Jungle Safari", location: "Chitwan National Park", days: "5 Days", rating: 4, price: "₹14,999", tag: "Adventure", category: "Adventure" },
//   { title: "Nepal Honeymoon Tour", location: "Pokhara · Nagarkot", days: "6 Days", rating: 5, price: "₹21,999", tag: "Romantic", category: "Honeymoon" },
//   { title: "Everest Adventure Trek", location: "Everest Base Camp", days: "14 Days", rating: 5, price: "₹39,999", tag: "Trending", category: "Adventure" },
//   { title: "Luxury Nepal Vacation", location: "Kathmandu · Pokhara · Chitwan", days: "12 Days", rating: 5, price: "₹54,999", tag: "Luxury", category: "Luxury" },
// ];

// const whyFeatures = [
//   { icon: "💎", title: "Best Price Guarantee", desc: "We promise the most competitive prices with no hidden fees." },
//   { icon: "🔒", title: "Secure Booking", desc: "Your data and payments are fully protected with bank-level security." },
//   { icon: "🧭", title: "Professional Guides", desc: "Licensed, multilingual guides with 30+ years of local expertise." },
//   { icon: "🕐", title: "24/7 Support", desc: "Round-the-clock customer support before, during, and after your trip." },
//   { icon: "👑", title: "Luxury Experience", desc: "Premium accommodations and services that redefine travel comfort." },
//   { icon: "✨", title: "Personalized Plans", desc: "Fully customized itineraries crafted around your preferences." },
// ];

// const testimonials = [
//   { name: "Priya Sharma", loc: "Delhi, India", text: "An absolutely magical experience! Nepal Tour Package organized everything perfectly — from the Everest views to Pokhara's tranquility. Highly recommended!", rating: 5 },
//   { name: "Rahul Mehta", loc: "Mumbai, India", text: "Our honeymoon in Nepal was a dream come true. The team was incredibly professional and attentive. The hotel choices were stunning!", rating: 5 },
//   { name: "Anita Joshi", loc: "Pune, India", text: "Best family trip we've ever had! Chitwan safari was phenomenal. Kids loved every moment and we felt completely safe throughout.", rating: 5 },
//   { name: "Vikram Singh", loc: "Jaipur, India", text: "The Muktinath Yatra was spiritually enriching and beautifully organized. Every detail was handled with care and devotion.", rating: 5 },
//   { name: "Sunita Patel", loc: "Ahmedabad, India", text: "Trekking to Everest Base Camp was a lifelong dream. The guides were exceptional and the entire experience was unforgettable!", rating: 5 },
//   { name: "Deepak Kumar", loc: "Bangalore, India", text: "Absolutely worth every rupee! The luxury package exceeded our expectations. Nepal Tour Package truly delivers premium experiences.", rating: 5 },
// ];

// const faqs = [
//   { q: "How do I book a package?", a: "You can book directly through our website contact form, WhatsApp, phone, or email. Our team will confirm your booking within 24 hours with a detailed itinerary and payment options." },
//   { q: "Do you provide transport within Nepal?", a: "Yes! All our packages include comfortable A/C transport throughout the tour. We use well-maintained vehicles with experienced drivers who know every route in Nepal." },
//   { q: "Can I customize my tour package?", a: "Absolutely! We specialize in personalized travel experiences. Share your preferences and dates, and we'll craft a custom itinerary just for you." },
//   { q: "Is hotel accommodation included?", a: "Yes, all our packages include carefully selected hotel accommodations. You can choose from budget-friendly, standard, or luxury options based on your preference." },
//   { q: "Do you offer group discounts?", a: "We offer attractive group discounts for groups of 6 or more travelers. Contact us for special group pricing and well create a tailored package for your group." },
// ];

// const galleryItems = [
//   { label: "Everest Base Camp", color: "#1a3a5c", h: 280 },
//   { label: "Phewa Lake Pokhara", color: "#0d2b4e", h: 200 },
//   { label: "Swayambhunath Temple", color: "#1e3a2e", h: 200 },
//   { label: "Annapurna Range", color: "#1a2a4a", h: 260 },
//   { label: "Chitwan Safari", color: "#1a3022", h: 220 },
//   { label: "Pashupatinath", color: "#2a1a3a", h: 240 },
//   { label: "Muktinath", color: "#1a3a4a", h: 200 },
//   { label: "Rara Lake", color: "#0d2a3e", h: 220 },
// ];

// // ============================================================
// // COMPONENTS
// // ============================================================

// function Particle({ style }) {
//   return <div className="particle" style={style} />;
// }

// function ParticlesField() {
//   const particles = useRef([...Array(20)].map((_, i) => ({
//     left: `${Math.random() * 100}%`,
//     width: `${Math.random() * 4 + 1}px`,
//     height: `${Math.random() * 4 + 1}px`,
//     animationDuration: `${Math.random() * 15 + 8}s`,
//     animationDelay: `${Math.random() * 10}s`,
//     background: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--gold)" : "var(--blue)",
//     opacity: Math.random() * 0.5 + 0.1,
//   }))).current;
//   return (
//     <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
//       {particles.map((s, i) => <Particle key={i} style={s} />)}
//     </div>
//   );
// }

// function RevealSection({ children, className = "", type = "reveal", threshold = 0.15 }) {
//   const [ref, inView] = useInView(threshold);
//   return (
//     <div ref={ref} className={`${type} ${inView ? "visible" : ""} ${className}`}>
//       {children}
//     </div>
//   );
// }

// // ============================================================
// // NAVBAR
// // ============================================================
// function Navbar({ active, setActive }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollTo = (id) => {
//     document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
//     setActive(id);
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className={scrolled ? "scrolled" : ""}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("Home")}>
//             <span style={{ fontSize: "1.6rem" }}>🏔️</span>
//             <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               Nepal Tour and Travels 
//             </span>
//           </div>
//           <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
//             {navLinks.map(l => (
//               <span key={l} className={`nav-link ${active === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
//             ))}
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <button className="btn-glow btn-gold desktop-nav" style={{ padding: "10px 24px", fontSize: ".85rem", width: 'auto' }} onClick={() => scrollTo("Contact")}>Book Now</button>
//             <button className="mobile-ham" onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", color: "var(--white)", fontSize: "1.5rem", cursor: "pointer" }}>☰</button>
//           </div>
//         </div>
//       </nav>

//       {menuOpen && (
//         <div className="mobile-menu">
//           <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--white)", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
//           <div style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", marginBottom: 8, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🏔️ Nepal Tour Package</div>
//           {navLinks.map(l => (
//             <span key={l} style={{ fontSize: "1.3rem", fontFamily: "Cinzel, serif", color: "var(--white)", cursor: "pointer" }} onClick={() => scrollTo(l)}>{l}</span>
//           ))}
//           <button className="btn-glow btn-gold" style={{width: '200px'}} onClick={() => { scrollTo("Contact"); setMenuOpen(false); }}>Book Now</button>
//         </div>
//       )}
//     </>
//   );
// }

// // ============================================================
// // HERO
// // ============================================================
// function TypeWriter({ words }) {
//   const [wordIndex, setWordIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [deleting, setDeleting] = useState(false);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     const word = words[wordIndex];
//     const delay = deleting ? 60 : 110;
//     const timer = setTimeout(() => {
//       if (!deleting) {
//         setText(word.slice(0, charIndex + 1));
//         if (charIndex + 1 === word.length) {
//           setTimeout(() => setDeleting(true), 1800);
//         } else setCharIndex(c => c + 1);
//       } else {
//         setText(word.slice(0, charIndex - 1));
//         if (charIndex - 1 === 0) {
//           setDeleting(false);
//           setWordIndex(i => (i + 1) % words.length);
//         }
//         setCharIndex(c => c - 1);
//       }
//     }, delay);
//     return () => clearTimeout(timer);
//   }, [charIndex, deleting, wordIndex, words]);

//   return <span style={{ color: "var(--cyan)" }}>{text}<span className="cursor" /></span>;
// }

// function Hero() {
//   return (
//     <section id="home" className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative" }}>
//       <ParticlesField />

//       {/* Decorative orbs */}
//       <div style={{ position: "absolute", top: "20%", left: "8%", width: "max(200px, 20vw)", aspectRatio: '1/1', borderRadius: "50%", background: "radial-gradient(circle,rgba(0,198,255,.1),transparent 70%)", pointerEvents: "none" }} />
//       <div style={{ position: "absolute", bottom: "25%", right: "8%", width: "max(150px, 15vw)", aspectRatio: '1/1', borderRadius: "50%", background: "radial-gradient(circle,rgba(201,162,39,.08),transparent 70%)", pointerEvents: "none" }} />

//       {/* Floating icons */}
//       <div className="float-icon" style={{ position: "absolute", top: "18%", left: "12%", fontSize: "2rem", animationDelay: "0s", opacity: .6 }}>⛰️</div>
//       <div className="float-icon" style={{ position: "absolute", top: "30%", right: "10%", fontSize: "1.6rem", animationDelay: "1.5s", opacity: .5 }}>✈️</div>
//       <div className="float-icon" style={{ position: "absolute", bottom: "30%", left: "8%", fontSize: "1.4rem", animationDelay: "0.8s", opacity: .4 }}>🧭</div>
//       <div className="float-icon" style={{ position: "absolute", top: "55%", right: "14%", fontSize: "1.3rem", animationDelay: "2s", opacity: .4 }}>🌿</div>

//       <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto", flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,198,255,.1)", border: "1px solid rgba(0,198,255,.25)", borderRadius: 50, padding: "8px 20px", marginBottom: 28, fontSize: ".82rem", color: "var(--cyan)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, alignSelf: 'center' }}>
//           <span>🏆</span> Nepal Tour and Travels
//         </div>

//         <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(2.2rem,8vw,4.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 12 }}>
//           <span className="grad-text">Explore Nepal</span><br />
//           Like Never Before
//         </h1>

//         <div style={{ fontSize: "clamp(1rem,4vw,1.25rem)", marginBottom: 16, minHeight: 36, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
//           <TypeWriter words={["Breathtaking Mountains...", "Sacred Temples...", "Jungle Safari Adventures...", "Romantic Honeymoons...", "Epic Treks...", "Luxury Escapes..."]} />
//         </div>

//         <p style={{ color: "var(--muted)", fontSize: "clamp(1rem, 3vw, 1.15rem)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px", fontFamily: "Cormorant Garamond, serif" }}>
//           Discover breathtaking destinations, adventure tours, honeymoon packages, and unforgettable experiences across Nepal with comfort and affordability.
//         </p>

//         <div className="hero-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//           <button className="btn-glow btn-primary" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
//             🗺️ &nbsp;Explore Packages
//           </button>
//           <button className="btn-glow btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
//             📞 &nbsp;Contact Us
//           </button>
//         </div>
//       </div>

//       {/* Stats bar */}
//       <div className="hero-stats-wrapper">
//         <div className="hero-stats-grid">
//           {[["5000+", "Happy Travelers"], ["3000+", "Tours Completed"], ["30+", "Years of Excellence"]].map(([n, l]) => (
//             <div key={l} className="stat-item">
//               <div style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.5rem, 5vw, 1.8rem)", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
//               <div style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 4 }}>{l}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // ABOUT
// // ============================================================
// function About() {
//   const [ref, inView] = useInView();
//   return (
//     <section id="about" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="responsive-2col">
//         {/* Left: Image */}
//         <RevealSection type="reveal-left">
//           <div style={{ position: "relative", maxWidth: '500px', margin: '0 auto' }}>
//             <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 20, background: "linear-gradient(135deg,#0a2040,#041830,#071428)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 30px 80px rgba(0,0,0,.5)", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(0,198,255,.12),transparent 60%)" }} />
//               <span style={{ fontSize: "6rem" }}>🏔️</span>
//               <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", color: "var(--cyan)", opacity: .8 }}>Himalayan Experiences</span>
//               <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", padding: "0 20px" }}>
//                 {["Trekking", "Safari", "Culture", "Adventure"].map(t => (
//                   <span key={t} style={{ padding: "4px 14px", background: "rgba(0,198,255,.1)", border: "1px solid rgba(0,198,255,.2)", borderRadius: 50, fontSize: ".75rem", color: "var(--cyan)" }}>{t}</span>
//                 ))}
//               </div>
//             </div>

//             <div style={{ position: "absolute", bottom: -20, right: -10, background: "linear-gradient(135deg,var(--gold),var(--gold2))", borderRadius: "50%", width: 110, height: 110, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(201,162,39,.4)", border: "4px solid var(--navy2)" }}>
//               <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.8rem", fontWeight: 900, color: "#080808", lineHeight: 1 }}>30+</span>
//               <span style={{ fontSize: ".65rem", color: "#333", fontWeight: 600, textAlign: "center" }}>Years<br />Experience</span>
//             </div>

//             <div className="glass-card" style={{ position: "absolute", top: -16, left: -10, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
//               <span style={{ fontSize: "1.5rem" }}>⭐</span>
//               <div>
//                 <div style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--gold)" }}>98%</div>
//                 <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>Satisfaction Rate</div>
//               </div>
//             </div>
//           </div>
//         </RevealSection>

//         {/* Right: Content */}
//         <RevealSection type="reveal-right">
//           <div>
//             <div className="section-label">About Us</div>
//             <h2 className="section-title">Your Trusted <span className="grad-text">Nepal Tour</span> and Travels</h2>
//             <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: 28, fontFamily: "Cormorant Garamond, serif", fontSize: "1.08rem" }}>
//               <strong style={{ color: "var(--white)" }}>Nepal Tour and Travels</strong> is a trusted travel company providing premium and affordable Nepal tour experiences. We specialize in honeymoon packages, family tours, adventure trips, trekking, jungle safaris, religious tours, and luxury travel experiences across Nepal.
//             </p>
//             <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: 36, fontFamily: "Cormorant Garamond, serif", fontSize: "1.08rem" }}>
//               With over a decade of experience and 5,000+ satisfied travelers, we craft journeys that transform into lifelong memories. Our team of certified local guides ensures every moment is safe, enriching, and extraordinary.
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               {["Affordable Pricing & No Hidden Charges", "Customized Tour Plans for Every Need", "Professional Licensed Tour Guides", "24/7 Dedicated Customer Support", "Safe, Comfortable & Reliable Travel"].map(f => (
//                 <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
//                   <div className="feature-dot" />
//                   <span style={{ color: "var(--white)", fontSize: ".95rem" }}>{f}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="hero-btns" style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
//               <button className="btn-glow btn-primary" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
//                 View Packages
//               </button>
//               <button className="btn-glow btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
//                 Contact Us
//               </button>
//             </div>
//           </div>
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // SERVICES
// // ============================================================
// function Services() {
//   const [ref, inView] = useInView();
//   return (
//     <section id="services" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy2),var(--navy))" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">What We Offer</div>
//             <h2 className="section-title">Our Premium <span className="grad-text">Services</span></h2>
//             <p className="section-sub" style={{ margin: "0 auto" }}>Everything you need for an unforgettable Nepal travel experience — all in one place.</p>
//           </div>
//         </RevealSection>

//         <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
//           {services.map(s => (
//             <div key={s.title} className="service-card">
//               <div className="service-icon">{s.icon}</div>
//               <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 10, color: "var(--white)" }}>{s.title}</h3>
//               <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{s.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // PACKAGES
// // ============================================================
// function PackageCard({ pkg }) {
//   const [liked, setLiked] = useState(false);
//   const colors = { Popular: "#1a6bd4", Spiritual: "#8b5cf6", Adventure: "#22c55e", Romantic: "#ec4899", Trending: "#f59e0b", Luxury: "#c9a227" };
//   return (
//     <div className="pkg-card" style={{ background: "linear-gradient(180deg,var(--navy3),var(--navy2))" }}>
//       <div style={{ position: "relative", overflow: "hidden" }}>
//         <div style={{ width: "100%", height: 220, background: `linear-gradient(135deg,${colors[pkg.tag] || "#1a6bd4"}22,var(--navy))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
//           {pkg.title.includes("Everest") ? "🏔️" : pkg.title.includes("Honeymoon") ? "💑" : pkg.title.includes("Jungle") ? "🐘" : pkg.title.includes("Muktinath") ? "🛕" : pkg.title.includes("Luxury") ? "👑" : "🗺️"}
//         </div>
//         <div className="pkg-overlay" />
//         <div style={{ position: "absolute", top: 14, left: 14, padding: "5px 14px", borderRadius: 50, background: colors[pkg.tag] || "var(--blue)", fontSize: ".75rem", fontWeight: 600, color: "#fff", zIndex:2 }}>{pkg.tag}</div>
//         <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,.4)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: liked ? "#ef4444" : "#fff", transition: "all .3s", zIndex:2 }}>
//           {liked ? "❤️" : "🤍"}
//         </button>
//       </div>
//       <div style={{ padding: "20px" }}>
//         <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 700, marginBottom: 10, color: "var(--white)" }}>{pkg.title}</h3>
//         <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
//           <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>📍 {pkg.location}</span>
//           <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>⏱️ {pkg.days}</span>
//         </div>
//         <div style={{ display: "flex", gap: 2, marginBottom: 16, color: "var(--gold)", fontSize: ".9rem" }}>
//           {[...Array(pkg.rating)].map((_, i) => <span key={i}>★</span>)}
//           {[...Array(5 - pkg.rating)].map((_, i) => <span key={i} style={{ opacity: .3 }}>★</span>)}
//         </div>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
//           <div>
//             <span style={{ fontSize: ".75rem", color: "var(--muted)" }}>Starting from</span>
//             <div style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--gold)" }}>{pkg.price}</div>
//           </div>
//           <button className="btn-glow btn-primary" style={{ padding: "10px 20px", fontSize: ".82rem" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Packages() {
//   const cats = ["All", "Adventure", "Cultural", "Honeymoon", "Spiritual", "Luxury"];
//   const [cat, setCat] = useState("All");
//   const filtered = cat === "All" ? packages : packages.filter(p => p.category === cat);

//   return (
//     <section id="packages" style={{ padding: "100px 24px" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 40 }}>
//             <div className="section-label">Travel Packages</div>
//             <h2 className="section-title">Popular <span className="grad-text">Tour Packages</span></h2>
//             <p className="section-sub" style={{ margin: "0 auto" }}>Handcrafted itineraries for every kind of traveler — from solo adventures to luxury family getaways.</p>
//           </div>
//         </RevealSection>

//         <RevealSection>
//           <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
//             {cats.map(c => (
//               <button key={c} className={`filter-tab ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
//             ))}
//           </div>
//         </RevealSection>

//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
//           {filtered.map(p => <PackageCard key={p.title} pkg={p} />)}
//         </div>

//         <RevealSection>
//           <div style={{ textAlign: "center", marginTop: 48 }}>
//             <button className="btn-glow btn-outline" style={{width: 'auto'}} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
//               ✨ &nbsp;Request Custom Package
//             </button>
//           </div>
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // WHY CHOOSE US
// // ============================================================
// function WhyUs() {
//   const [ref, inView] = useInView();
//   return (
//     <section id="why" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy),var(--navy2))", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "max(300px, 60vw)", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,198,255,.05),transparent 70%)", pointerEvents: "none" }} />

//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">Why Choose Us</div>
//             <h2 className="section-title">The <span className="grad-text">Nepal Tour Package</span> Advantage</h2>
//           </div>
//         </RevealSection>

//         <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, marginBottom: 80 }}>
//           {whyFeatures.map(f => (
//             <div key={f.title} className="why-card">
//               <div style={{ fontSize: "2.2rem", marginBottom: 16 }}>{f.icon}</div>
//               <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 10, color: "var(--white)" }}>{f.title}</h3>
//               <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{f.desc}</p>
//             </div>
//           ))}
//         </div>

//         {/* Animated counters */}
//         <div className="glass-card" style={{ padding: "48px 24px" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
//             {[
//               { end: 5000, suffix: "+", label: "Happy Travelers", icon: "😊" },
//               { end: 98, suffix: "%", label: "Positive Reviews", icon: "⭐" },
//               { end: 3000, suffix: "+", label: "Tours Completed", icon: "🗺️" },
//               { end: 10, suffix: "+", label: "Years of Experience", icon: "🏆" },
//             ].map(c => (
//               <div key={c.label} className="stat-item" style={{border: 'none'}}>
//                 <div style={{ fontSize: "2rem", marginBottom: 8 }}>{c.icon}</div>
//                 <div style={{ fontFamily: "Cinzel, serif", fontSize: "2.2rem", fontWeight: 800, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                   <Counter end={c.end} suffix={c.suffix} />
//                 </div>
//                 <div style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 6 }}>{c.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // GALLERY
// // ============================================================
// function Gallery() {
//   const [lightbox, setLightbox] = useState(null);
//   const [ref, inView] = useInView();

//   return (
//     <section id="gallery" style={{ padding: "100px 24px" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">Visual Journey</div>
//             <h2 className="section-title">Nepal Through <span className="grad-text">Our Lens</span></h2>
//             <p className="section-sub" style={{ margin: "0 auto" }}>A glimpse of the breathtaking beauty waiting for you across Nepal.</p>
//           </div>
//         </RevealSection>

//         <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, gridAutoRows: "200px", gridAutoFlow: "dense" }}>
//           {galleryItems.map((item, i) => (
//             <div key={item.label} className="gallery-item" style={{ gridRow: i === 0 || i === 3 ? "span 2" : "span 1", cursor: "pointer" }} onClick={() => setLightbox(item)}>
//               <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${item.color},${item.color}88)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
//                 <span style={{ fontSize: "3rem" }}>{i % 4 === 0 ? "🏔️" : i % 4 === 1 ? "🌊" : i % 4 === 2 ? "🛕" : "🌿"}</span>
//               </div>
//               <div className="gallery-overlay">
//                 <span style={{ color: "#fff", fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600 }}>{item.label}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Lightbox */}
//         {lightbox && (
//           <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
//             <div onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: "100%", background: lightbox.color, borderRadius: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, border: "1px solid var(--border)", boxShadow: "0 30px 100px rgba(0,0,0,.8)" }}>
//               <span style={{ fontSize: "6rem" }}>🏔️</span>
//               <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", color: "var(--white)", textAlign: 'center' }}>{lightbox.label}</span>
//               <button onClick={() => setLightbox(null)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: 10 }}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // TESTIMONIALS
// // ============================================================
// function Testimonials() {
//   const doubled = [...testimonials, ...testimonials];
//   return (
//     <section id="testimonials" style={{ padding: "100px 0", background: "linear-gradient(180deg,var(--navy2),var(--navy))", overflow: "hidden" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">Traveler Stories</div>
//             <h2 className="section-title">What Our <span className="grad-text">Guests Say</span></h2>
//             <p className="section-sub" style={{ margin: "0 auto" }}>Real experiences from real travelers who trusted us with their Nepal adventure.</p>
//           </div>
//         </RevealSection>
//       </div>

//       <div style={{ overflow: "hidden", padding: "8px 0", width: '100vw' }}>
//         <div className="testimonial-track" style={{ width: "max-content" }}>
//           {doubled.map((t, i) => (
//             <div key={i} className="glass-card" style={{ width: "min(320px, 85vw)", padding: "28px 24px", flexShrink: 0, borderRadius: 18, border: "1px solid rgba(0,198,255,.15)" }}>
//               <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
//                 <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,var(--blue),var(--cyan))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontFamily: "Cinzel, serif", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
//                   {t.name[0]}
//                 </div>
//                 <div>
//                   <div style={{ fontFamily: "Cinzel, serif", fontWeight: 600, fontSize: ".95rem" }}>{t.name}</div>
//                   <div style={{ color: "var(--muted)", fontSize: ".78rem" }}>📍 {t.loc}</div>
//                 </div>
//               </div>
//               <div style={{ color: "var(--gold)", fontSize: ".9rem", marginBottom: 12 }}>
//                 {"★".repeat(t.rating)}
//               </div>
//               <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.75, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
//                 "{t.text}"
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // FAQ
// // ============================================================
// function FAQ() {
//   const [open, setOpen] = useState(null);
//   return (
//     <section id="faq" style={{ padding: "100px 24px" }}>
//       <div style={{ maxWidth: 800, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">FAQ</div>
//             <h2 className="section-title">Frequently Asked <span className="grad-text">Questions</span></h2>
//           </div>
//         </RevealSection>

//         {faqs.map((f, i) => (
//           <RevealSection key={i}>
//             <div className={`faq-item ${open === i ? "open" : ""}`}>
//               <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
//                 <span style={{ fontWeight: 500, fontSize: ".95rem", paddingRight: 16 }}>{f.q}</span>
//                 <span className="faq-icon">{open === i ? "−" : "+"}</span>
//               </div>
//               <div className={`faq-a ${open === i ? "open" : ""}`}>
//                 <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.75 }}>{f.a}</p>
//               </div>
//             </div>
//           </RevealSection>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // CONTACT
// // ============================================================
// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", destination: "", date: "", message: "" });
//   const [sent, setSent] = useState(false);

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
//   const submit = async (e) => {
//     e.preventDefault();
    
//     const payload = {
//       access_key: "b6ab9076-6553-467d-b219-b5d73012fafc", // IMPORTANT: Replace this with your Web3Forms access key
//       ...form
//     };

//     try {
//       const res = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       const resData = await res.json();
      
//       if (resData.success) {
//         setSent(true);
//         setForm({ name: "", email: "", destination: "", date: "", message: "" });
//         setTimeout(() => setSent(false), 4000);
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <section id="contact" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy),var(--navy2))" }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         <RevealSection>
//           <div style={{ textAlign: "center", marginBottom: 64 }}>
//             <div className="section-label">Get In Touch</div>
//             <h2 className="section-title">Book Your <span className="grad-text">Dream Journey</span></h2>
//             <p className="section-sub" style={{ margin: "0 auto" }}>Ready to explore Nepal? Contact us and we'll craft the perfect package just for you.</p>
//           </div>
//         </RevealSection>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }} className="responsive-2col">
//           {/* Info */}
//           <RevealSection type="reveal-left">
//             <div>
//               <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
//                 <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", marginBottom: 24, color: "var(--cyan)" }}>Contact Information</h3>
//                 {[
//                   { icon: "📞", label: "Phone", val: "+91- 9422799108" },
//                   { icon: "✉️", label: "Email", val: "info@nepaltoursandtravels.com" },
//                   { icon: "📍", label: "Address", val: "Head Office Opp. Gate No. -1, Railway Station ,Gorakhpur (U.P) - 273001" },
//                   { icon: "⏰", label: "Hours", val: "Mon–Sat: 9AM – 7PM NPT" },
//                 ].map(item => (
//                   <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
//                     <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
//                     <div style={{wordBreak: 'break-word'}}>
//                       <div style={{ fontSize: ".75rem", color: "var(--muted)", marginBottom: 2 }}>{item.label}</div>
//                       <div style={{ fontSize: ".9rem", color: "var(--white)" }}>{item.val}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* WhatsApp */}
//               <a href="https://wa.me/919918001088" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
//                 <button className="btn-glow" style={{ width: "100%", padding: "16px 24px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", borderRadius: 12, fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 20px rgba(37,211,102,.3)", border: "none", cursor: "pointer", transition: "all .3s" }}>
//                   💬 &nbsp;Chat on WhatsApp
//                 </button>
//               </a>

//               {/* Social */}
//               <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
//                 {["📘", "📸", "▶️", "🐦"].map((s, i) => (
//                   <button key={i} className="social-icon" style={{ color: "var(--muted)", background: "none" }}>{s}</button>
//                 ))}
//               </div>
//             </div>
//           </RevealSection>

//           {/* Form */}
//           <RevealSection type="reveal-right">
//             <form onSubmit={submit} className="glass-card" style={{ padding: "36px 24px" }}>
//               <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", marginBottom: 28, color: "var(--cyan)" }}>Send Us a Message</h3>

//               {sent && (
//                 <div style={{ background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 10, padding: "14px 20px", marginBottom: 20, color: "#22c55e", fontSize: ".9rem" }}>
//                   ✅ Message sent! We'll get back to you within 24 hours.
//                 </div>
//               )}

//               <div className="contact-grid">
//                 <div>
//                   <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name *</label>
//                   <input className="form-input" name="name" placeholder="Your full name" value={form.name} onChange={handle} required />
//                 </div>
//                 <div>
//                   <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Email *</label>
//                   <input className="form-input" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} required />
//                 </div>
//               </div>

//               <div className="contact-grid">
//                 <div>
//                   <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Destination</label>
//                   <input className="form-input" name="destination" placeholder="e.g. Everest Trek" value={form.destination} onChange={handle} />
//                 </div>
//                 <div>
//                   <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Travel Date</label>
//                   <input className="form-input" name="date" type="date" value={form.date} onChange={handle} style={{ colorScheme: "dark" }} />
//                 </div>
//               </div>

//               <div style={{ marginBottom: 24 }}>
//                 <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Message</label>
//                 <textarea className="form-input" name="message" placeholder="Tell us about your dream Nepal trip..." value={form.message} onChange={handle} />
//               </div>

//               <button type="submit" className="btn-glow btn-gold" style={{ width: "100%", padding: "16px", fontSize: "1rem", borderRadius: 10 }}>
//                 🚀 &nbsp;Send Enquiry
//               </button>
//             </form>
//           </RevealSection>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // FOOTER
// // ============================================================
// function Footer() {
//   const [email, setEmail] = useState("");
//   return (
//     <footer style={{ background: "var(--navy2)", borderTop: "1px solid rgba(0,198,255,.12)" }}>
//       <div className="grad-line" />
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 40, marginBottom: 48 }} className="footer-grid">
//           {/* Brand */}
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//               <span style={{ fontSize: "1.6rem" }}>🏔️</span>
//               <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nepal Tour and Travels</span>
//             </div>
//             <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, marginBottom: 20, maxWidth: 280 }}>
//               Nepal's trusted travel partner for over a decade. We create extraordinary journeys across the Himalayas and beyond.
//             </p>
//             <div style={{ display: "flex", gap: 8 }}>
//               {["📘", "📸", "▶️", "🐦"].map((s, i) => (
//                 <button key={i} className="social-icon" style={{ color: "var(--muted)", background: "none", border: "1px solid rgba(255,255,255,.1)" }}>{s}</button>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Quick Links</h4>
//             {navLinks.map(l => (
//               <div key={l} style={{ marginBottom: 10 }}>
//                 <span onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} style={{ color: "var(--muted)", fontSize: ".85rem", cursor: "pointer", transition: "color .3s" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</span>
//               </div>
//             ))}
//           </div>

//           {/* Tour Types */}
//           <div>
//             <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Tour Categories</h4>
//             {["Trekking Tours", "Honeymoon Packages", "Family Tours", "Group Tours", "Spiritual Tours", "Adventure Tours", "Luxury Travel"].map(t => (
//               <div key={t} style={{ marginBottom: 10 }}>
//                 <span style={{ color: "var(--muted)", fontSize: ".85rem", cursor: "pointer", transition: "color .3s" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{t}</span>
//               </div>
//             ))}
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Stay Updated</h4>
//             <p style={{ color: "var(--muted)", fontSize: ".85rem", marginBottom: 16, lineHeight: 1.7 }}>Subscribe for exclusive deals, travel tips, and Nepal travel inspiration.</p>
//             <div style={{ display: "flex" }}>
//               <input className="newsletter-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
//               <button className="newsletter-btn" onClick={() => { setEmail(""); }}>Subscribe</button>
//             </div>
//             <div style={{ marginTop: 24 }}>
//               <div style={{ color: "var(--muted)", fontSize: ".8rem", marginBottom: 8 }}>📞 +91-9422799108</div>
//               <div style={{ color: "var(--muted)", fontSize: ".8rem", marginBottom: 8 }}>✉️ info@nepaltoursandtravels.com</div>
//               <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>📍 Head Office Opp. Gate No. -1, Railway Station ,Gorakhpur (U.P) - 273001</div>
//             </div>
//           </div>
//         </div>

//         <div className="grad-line" style={{ marginBottom: 28 }} />

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
//           <div style={{ color: "var(--muted)", fontSize: ".82rem" }}>© 2025 Nepal Tour and Travels. All rights reserved. Crafted with ❤️ in Nepal.</div>
//           <div style={{ display: "flex", gap: 24 }}>
//             {["Privacy Policy", "Terms of Service", "Sitemap"].map(l => (
//               <span key={l} style={{ color: "var(--muted)", fontSize: ".8rem", cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ============================================================
// // MAIN APP
// // ============================================================
// export default function App() {
//   const [active, setActive] = useState("Home");
//   const [loaded, setLoaded] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showTop, setShowTop] = useState(false);
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => setLoaded(true), 1800);

//     const onScroll = () => {
//       const el = document.documentElement;
//       const scrolled = el.scrollTop;
//       const total = el.scrollHeight - el.clientHeight;
//       setProgress((scrolled / total) * 100);
//       setShowTop(scrolled > 400);

//       // Update active nav
//       navLinks.forEach(link => {
//         const domEl = document.getElementById(link.toLowerCase());
//         if (domEl) {
//           const rect = domEl.getBoundingClientRect();
//           if (rect.top <= 80 && rect.bottom > 80) setActive(link);
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll);

//     // Cursor glow
//     const onMove = (e) => {
//       if (cursorRef.current) {
//         cursorRef.current.style.left = e.clientX + "px";
//         cursorRef.current.style.top = e.clientY + "px";
//       }
//     };
//     window.addEventListener("mousemove", onMove);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("mousemove", onMove);
//     };
//   }, []);

//   return (
//     <>
//       <style>{CSS}</style>

//       {/* Loading screen */}
//       <div className={`loader ${loaded ? "done" : ""}`}>
//         <div className="loader-ring" />
//         <div className="loader-logo">🏔️ Nepal Tour Package</div>
//         <div style={{ marginTop: 12, color: "var(--muted)", fontSize: ".8rem" }}>Preparing your journey...</div>
//       </div>

//       {/* Cursor glow */}
//       <div className="cursor-glow" ref={cursorRef} />

//       {/* Progress bar */}
//       <div id="progress-bar" style={{ width: `${progress}%` }} />

//       {/* Navbar */}
//       <Navbar active={active} setActive={setActive} />

//       {/* Main content */}
//       <main>
//         <Hero />
//         <div className="grad-line" />
//         <About />
//         <div className="grad-line" />
//         <Services />
//         <div className="grad-line" />
//         <Packages />
//         <div className="grad-line" />
//         <WhyUs />
//         <div className="grad-line" />
//         <Gallery />
//         <div className="grad-line" />
//         <Testimonials />
//         <div className="grad-line" />
//         <FAQ />
//         <div className="grad-line" />
//         <Contact />
//       </main>

//       <Footer />

//       {/* Chatbot float */}
//       <div className="chat-btn" title="Open Chatbot" onClick={() => alert("Chatbot coming soon!")}>🤖</div>

//       {/* WhatsApp float */}
//       <a href="https://wa.me/919918001088" target="_blank" rel="noreferrer">
//         <div className="wa-btn" title="Chat on WhatsApp">💬</div>
//       </a>

//       {/* Back to top */}
//       <div className={`back-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">↑</div>
//     </>
//   );
// }







import { useState, useEffect, useRef } from "react";

// ============================================================
// UTILITY: useInView hook (scroll reveal)
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ============================================================
// UTILITY: Animated Counter
// ============================================================
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ============================================================
// STYLES (injected via <style>)
// ============================================================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { width: 100%; min-height: 100vh; }
:root {
  --navy: #040d1a;
  --navy2: #071428;
  --navy3: #0a1d3a;
  --blue: #1a6bd4;
  --cyan: #00c6ff;
  --gold: #c9a227;
  --gold2: #f0d060;
  --white: #f0f4ff;
  --muted: #8899bb;
  --glass: rgba(10,25,60,0.55);
  --glass2: rgba(255,255,255,0.04);
  --border: rgba(0,198,255,0.18);
  --glow: 0 0 30px rgba(0,198,255,0.22);
  --gold-glow: 0 0 20px rgba(201,162,39,0.3);
}
html { scroll-behavior: smooth; }
body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
::selection { background: rgba(0,198,255,0.3); }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--navy); }
::-webkit-scrollbar-thumb { background: linear-gradient(var(--cyan),var(--gold)); border-radius: 3px; }

/* Scroll progress */
#progress-bar { position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,var(--cyan),var(--gold)); z-index:9999; transition:width .1s; }

/* Particles */
.particle { position:absolute; border-radius:50%; pointer-events:none; animation: float-particle linear infinite; }
@keyframes float-particle { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:1} 90%{opacity:.4} 100%{transform:translateY(-100px) scale(1);opacity:0} }

/* Cursor glow */
.cursor-glow { position:fixed; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle,rgba(0,198,255,0.07),transparent 70%); pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:transform .08s; display:none; }
@media(pointer: fine) { .cursor-glow { display:block; } } /* Hide on touch devices */

/* Typing */
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.cursor { display:inline-block; width:3px; height:1em; background:var(--cyan); margin-left:4px; animation:blink 1s infinite; vertical-align:middle; }

/* Reveal animation */
.reveal { opacity:0; transform:translateY(40px); transition:opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity:1; transform:none; }
.reveal-left { opacity:0; transform:translateX(-50px); transition:opacity .8s ease, transform .8s ease; }
.reveal-left.visible { opacity:1; transform:none; }
.reveal-right { opacity:0; transform:translateX(50px); transition:opacity .8s ease, transform .8s ease; }
.reveal-right.visible { opacity:1; transform:none; }

/* Stagger */
.stagger > * { opacity:0; transform:translateY(30px); transition: opacity .6s ease, transform .6s ease; }
.stagger.visible > *:nth-child(1){opacity:1;transform:none;transition-delay:.05s}
.stagger.visible > *:nth-child(2){opacity:1;transform:none;transition-delay:.15s}
.stagger.visible > *:nth-child(3){opacity:1;transform:none;transition-delay:.25s}
.stagger.visible > *:nth-child(4){opacity:1;transform:none;transition-delay:.35s}
.stagger.visible > *:nth-child(5){opacity:1;transform:none;transition-delay:.45s}
.stagger.visible > *:nth-child(6){opacity:1;transform:none;transition-delay:.55s}
.stagger.visible > *:nth-child(7){opacity:1;transform:none;transition-delay:.65s}
.stagger.visible > *:nth-child(8){opacity:1;transform:none;transition-delay:.75s}

/* Glass card */
.glass-card { background:var(--glass); backdrop-filter:blur(16px); border:1px solid var(--border); border-radius:16px; }

/* Gradient text */
.grad-text { background:linear-gradient(135deg,var(--cyan),var(--white),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.grad-cyan { background:linear-gradient(135deg,var(--cyan),#60a5fa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

/* Glow btn */
.btn-glow { position:relative; padding:14px 36px; border-radius:50px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:.95rem; cursor:pointer; transition:all .3s; border:none; outline:none; text-align:center; }
.btn-primary { background:linear-gradient(135deg,var(--blue),var(--cyan)); color:#fff; box-shadow:0 0 20px rgba(0,198,255,.35); }
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(0,198,255,.55); }
.btn-outline { background:transparent; color:var(--white); border:1.5px solid rgba(0,198,255,.5); }
.btn-outline:hover { background:rgba(0,198,255,.1); border-color:var(--cyan); transform:translateY(-2px); box-shadow:var(--glow); }
.btn-gold { background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#080808; box-shadow:0 0 20px rgba(201,162,39,.35); }
.btn-gold:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(201,162,39,.55); }

/* Navbar */
nav { position:fixed; top:0; left:0; right:0; z-index:1000; transition:all .4s; padding:20px 0; }
nav.scrolled { background:rgba(4,13,26,.92); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); padding:12px 0; }
.nav-link { color:var(--muted); font-size:.9rem; font-weight:500; cursor:pointer; transition:color .3s; position:relative; padding:4px 0; }
.nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:linear-gradient(90deg,var(--cyan),var(--gold)); transition:width .3s; border-radius:2px; }
.nav-link:hover, .nav-link.active { color:var(--white); }
.nav-link:hover::after, .nav-link.active::after { width:100%; }

/* Hero */
.hero-bg { background:linear-gradient(135deg, #040d1a 0%, #071428 30%, #091828 60%, #040d1a 100%); position:relative; overflow:hidden; }
.hero-bg::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 50% at 50% 40%,rgba(26,107,212,.18),transparent); }
.hero-bg::after { content:''; position:absolute; top:-50%; left:-20%; width:60%; height:120%; background:radial-gradient(ellipse,rgba(0,198,255,.08),transparent 60%); animation:hero-pulse 6s ease-in-out infinite alternate; }
@keyframes hero-pulse { 0%{transform:scale(1) translateX(0)} 100%{transform:scale(1.1) translateX(5%)} }

.hero-stats-wrapper { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(4,13,26,.85); backdrop-filter: blur(20px); border-top: 1px solid rgba(0,198,255,.12); }
.hero-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 900px; margin: 0 auto; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }

/* Service & Features cards */
.service-card { background:var(--glass2); border:1px solid rgba(0,198,255,.1); border-radius:14px; padding:28px 22px; transition:all .4s; cursor:default; position:relative; overflow:hidden; }
.service-card::before { content:''; position:absolute; inset:0; border-radius:14px; opacity:0; background:linear-gradient(135deg,rgba(0,198,255,.08),rgba(26,107,212,.08)); transition:opacity .4s; }
.service-card:hover { border-color:rgba(0,198,255,.4); transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,198,255,.12),var(--glow); }
.service-card:hover::before { opacity:1; }
.service-icon { width:52px; height:52px; border-radius:12px; background:linear-gradient(135deg,rgba(0,198,255,.15),rgba(26,107,212,.15)); display:flex; align-items:center; justify-content:center; margin-bottom:16px; font-size:1.5rem; transition:all .4s; }
.service-card:hover .service-icon { background:linear-gradient(135deg,rgba(0,198,255,.3),rgba(26,107,212,.3)); box-shadow:0 0 20px rgba(0,198,255,.25); }

/* Package cards */
.pkg-card { border-radius:18px; overflow:hidden; position:relative; cursor:pointer; transition:all .4s; border:1px solid rgba(255,255,255,.06); }
.pkg-card:hover { transform:translateY(-8px); box-shadow:0 30px 80px rgba(0,0,0,.5); }
.pkg-img { width:100%; height:220px; object-fit:cover; transition:transform .5s; }
.pkg-card:hover .pkg-img { transform:scale(1.08); }
.pkg-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(4,13,26,.98) 0%,rgba(4,13,26,.5) 50%,transparent 80%); pointer-events: none;}

/* Gallery */
.gallery-item { position:relative; overflow:hidden; border-radius:12px; cursor:pointer; }
.gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
.gallery-item:hover img { transform:scale(1.1); }
.gallery-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,198,255,.6),transparent); opacity:0; transition:opacity .4s; display:flex; align-items:flex-end; padding:16px; }
.gallery-item:hover .gallery-overlay { opacity:1; }

/* Testimonial slider */
.testimonial-track { display:flex; gap:24px; animation:slide-testimonials 30s linear infinite; }
.testimonial-track:hover { animation-play-state:paused; }
@keyframes slide-testimonials { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* FAQ accordion */
.faq-item { border:1px solid rgba(0,198,255,.12); border-radius:12px; overflow:hidden; transition:border-color .3s; margin-bottom:12px; }
.faq-item.open { border-color:rgba(0,198,255,.35); }
.faq-q { padding:20px 24px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:background .3s; }
.faq-q:hover { background:rgba(0,198,255,.05); }
.faq-a { max-height:0; overflow:hidden; transition:max-height .4s ease, padding .4s; }
.faq-a.open { max-height:200px; padding:0 24px 20px; }
.faq-icon { transition:transform .3s; font-size:1.2rem; color:var(--cyan); }
.faq-item.open .faq-icon { transform:rotate(45deg); }

/* Contact form */
.form-input { width:100%; background:rgba(255,255,255,.04); border:1px solid rgba(0,198,255,.2); border-radius:10px; padding:14px 18px; color:var(--white); font-family:'DM Sans',sans-serif; font-size:.9rem; transition:all .3s; outline:none; }
.form-input:focus { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(0,198,255,.12); }
.form-input::placeholder { color:var(--muted); }
textarea.form-input { resize:vertical; min-height:120px; }

/* Layout Utilities */
.grad-line { height:1px; background:linear-gradient(90deg,transparent,var(--cyan),var(--gold),transparent); }
.section-label { font-size:.78rem; font-family:'DM Sans',sans-serif; letter-spacing:.2em; text-transform:uppercase; color:var(--cyan); font-weight:600; margin-bottom:12px; }
.section-title { font-family:'Cinzel',serif; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:700; line-height:1.2; margin-bottom:16px; }
.section-sub { color:var(--muted); font-size:1rem; max-width:520px; line-height:1.7; }
.stars { color:var(--gold); letter-spacing:2px; }

/* Mobile menu */
.mobile-menu { position:fixed; inset:0; background:rgba(4,13,26,.98); backdrop-filter:blur(20px); z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; }

/* Filter tabs */
.filter-tab { padding:9px 22px; border-radius:50px; font-size:.88rem; font-weight:500; cursor:pointer; transition:all .3s; border:1.5px solid rgba(0,198,255,.2); color:var(--muted); background:transparent; }
.filter-tab.active, .filter-tab:hover { background:linear-gradient(135deg,var(--blue),rgba(0,198,255,.3)); border-color:var(--cyan); color:var(--white); }
.feature-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,var(--cyan),var(--blue)); flex-shrink:0; margin-top:6px; box-shadow:0 0 8px rgba(0,198,255,.5); }

/* Global Buttons */
.wa-btn { position:fixed; bottom:80px; right:24px; width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#25D366,#128C7E); display:flex; align-items:center; justify-content:center; font-size:1.5rem; cursor:pointer; z-index:500; box-shadow:0 4px 20px rgba(37,211,102,.4); transition:all .3s; }
.wa-btn:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(37,211,102,.6); }

/* Chatbot Button */
.chat-btn { position:fixed; bottom:150px; right:24px; width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--cyan)); display:flex; align-items:center; justify-content:center; font-size:1.5rem; cursor:pointer; z-index:500; box-shadow:0 4px 20px rgba(0,198,255,.4); transition:all .3s; }
.chat-btn:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(0,198,255,.6); }

/* Chat Window */
.chat-window { position:fixed; bottom:220px; right:24px; width:320px; height:400px; background:var(--navy); border:1px solid var(--border); border-radius:12px; display:flex; flex-direction:column; z-index:1000; box-shadow:0 10px 40px rgba(0,0,0,0.6); overflow:hidden; animation: chat-pop 0.3s ease; }
@keyframes chat-pop { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:none; } }
.chat-header { background:linear-gradient(135deg,var(--blue),var(--cyan)); padding:14px 16px; color:#fff; font-family:'DM Sans', sans-serif; font-weight:600; display:flex; justify-content:space-between; align-items:center; }
.chat-close { background:none; border:none; color:#fff; cursor:pointer; font-size:1.4rem; line-height:1; }
.chat-body { flex:1; padding:16px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; background:var(--navy2); }
.chat-msg { padding:10px 14px; border-radius:10px; max-width:85%; font-size:0.9rem; line-height:1.4; word-wrap: break-word; }
.chat-msg.user { background:var(--cyan); color:#000; align-self:flex-end; border-bottom-right-radius:2px; }
.chat-msg.bot { background:var(--glass); color:var(--white); border:1px solid var(--border); align-self:flex-start; border-bottom-left-radius:2px; }
.chat-footer { padding:12px; background:var(--navy); border-top:1px solid var(--border); display:flex; gap:8px; }
.chat-input { flex:1; padding:10px 12px; border-radius:6px; border:1px solid rgba(0,198,255,0.2); background:rgba(255,255,255,0.03); color:var(--white); outline:none; font-family:'DM Sans'; font-size:0.9rem; transition:border 0.3s; }
.chat-input:focus { border-color:var(--cyan); }
.chat-send { background:linear-gradient(135deg,var(--blue),var(--cyan)); color:#fff; border:none; padding:0 16px; border-radius:6px; cursor:pointer; font-weight:600; transition:all 0.3s; }
.chat-send:hover { box-shadow:0 0 10px rgba(0,198,255,0.4); }

.back-top { position:fixed; bottom:18px; right:24px; width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--cyan)); display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:500; transition:all .3s; opacity:0; pointer-events:none; font-size:1.1rem; }
.back-top.show { opacity:1; pointer-events:all; }
.back-top:hover { transform:translateY(-3px); box-shadow:var(--glow); }

/* Loaders & Decor */
.loader { position:fixed; inset:0; background:var(--navy); z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center; transition:opacity .6s, visibility .6s; }
.loader.done { opacity:0; visibility:hidden; }
.loader-ring { width:60px; height:60px; border:3px solid rgba(0,198,255,.2); border-top-color:var(--cyan); border-radius:50%; animation:spin 1s linear infinite; }
@keyframes spin { to{transform:rotate(360deg)} }
.loader-logo { font-family:'Cinzel',serif; font-size:1.4rem; margin-top:20px; background:linear-gradient(135deg,var(--cyan),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

.why-card { padding:32px 28px; border-radius:16px; background:linear-gradient(135deg,rgba(10,25,60,.6),rgba(7,20,40,.6)); border:1px solid rgba(0,198,255,.1); transition:all .4s; }
.why-card:hover { border-color:rgba(0,198,255,.3); transform:translateY(-4px); box-shadow:0 20px 50px rgba(0,0,0,.3); }
.stat-item { text-align:center; padding:24px 20px; border-right:1px solid rgba(0,198,255,.15); }
.stat-item:last-child { border-right:none; }

.newsletter-input { flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(0,198,255,.2); border-radius:50px 0 0 50px; padding:14px 22px; color:var(--white); outline:none; font-family:'DM Sans'; min-width:0; }
.newsletter-input:focus { border-color:var(--cyan); }
.newsletter-btn { padding:14px 28px; background:linear-gradient(135deg,var(--blue),var(--cyan)); border:none; border-radius:0 50px 50px 0; color:#fff; font-weight:600; cursor:pointer; transition:all .3s; white-space:nowrap; }
.newsletter-btn:hover { box-shadow:var(--glow); }

.social-icon { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition:all .3s; font-size:1rem; }
.social-icon:hover { background:rgba(0,198,255,.15); border-color:var(--cyan); transform:translateY(-3px); color:var(--cyan); }

/* Responsive Adjustments */
@media (max-width:768px) {
  .desktop-nav { display:none !important; } 

  .hero-btns { flex-direction:column; align-items:center; }
  .btn-glow { width: 100%; }
  .hero-stats-wrapper { position: relative; border-top: none; background: transparent; padding-top: 20px; }
  .hero-stats-grid { grid-template-columns: 1fr; gap: 10px; }
  .stat-item { border-right:none; border-bottom:1px solid rgba(0,198,255,.15); padding: 15px; }
  .stat-item:last-child { border-bottom:none; }
  
  .responsive-2col { grid-template-columns: 1fr!important; gap: 40px; }
  .contact-grid { grid-template-columns: 1fr; margin-bottom: 0; }
  .footer-grid { grid-template-columns: 1fr!important; }

  /* Mobile Chat Adjustments */
  .chat-window { bottom:150px; right:15px; left:15px; width:auto; z-index:1000; }
}
@media (min-width:769px) {
  .mobile-ham { display:none !important; }
}
`;

// ============================================================
// DATA (Truncated standard data structure as original)
// ============================================================
const navLinks = ["Home","About","Services","Packages","Gallery","Testimonials","Contact"];

const services = [
  { icon: "🗺️", title: "Nepal Tour Packages", desc: "Expertly crafted tours covering Nepal's most breathtaking landscapes and cultural wonders." },
  { icon: "🏨", title: "Hotel Booking", desc: "Handpicked luxury and budget-friendly accommodations for a comfortable stay." },
  { icon: "🚗", title: "Car Rental", desc: "Comfortable, well-maintained vehicles with professional drivers for all terrains." },
  { icon: "✈️", title: "Flight Booking", desc: "Best deals on domestic and international flights to and from Nepal." },
  { icon: "🥾", title: "Trekking Tours", desc: "Guided treks to Everest Base Camp, Annapurna Circuit, Langtang and beyond." },
  { icon: "💑", title: "Honeymoon Packages", desc: "Romantic getaways to Pokhara, Nagarkot, and scenic hill stations of Nepal." },
  { icon: "👥", title: "Group Tours", desc: "Specially designed group packages with exclusive discounts and tailored itineraries." },
  { icon: "🎯", title: "Adventure Activities", desc: "Paragliding, bungee jumping, white-water rafting, zip-lining and much more." },
];

const packages = [
  { title: "Kathmandu & Pokhara Tour", location: "Kathmandu · Pokhara", days: "7 Days", rating: 5, price: "₹18,999", tag: "Popular", category: "Cultural" },
  { title: "Muktinath Yatra", location: "Mustang · Muktinath", days: "10 Days", rating: 5, price: "₹24,999", tag: "Spiritual", category: "Spiritual" },
  { title: "Chitwan Jungle Safari", location: "Chitwan National Park", days: "5 Days", rating: 4, price: "₹14,999", tag: "Adventure", category: "Adventure" },
  { title: "Nepal Honeymoon Tour", location: "Pokhara · Nagarkot", days: "6 Days", rating: 5, price: "₹21,999", tag: "Romantic", category: "Honeymoon" },
  { title: "Everest Adventure Trek", location: "Everest Base Camp", days: "14 Days", rating: 5, price: "₹39,999", tag: "Trending", category: "Adventure" },
  { title: "Luxury Nepal Vacation", location: "Kathmandu · Pokhara · Chitwan", days: "12 Days", rating: 5, price: "₹54,999", tag: "Luxury", category: "Luxury" },
];

const whyFeatures = [
  { icon: "💎", title: "Best Price Guarantee", desc: "We promise the most competitive prices with no hidden fees." },
  { icon: "🔒", title: "Secure Booking", desc: "Your data and payments are fully protected with bank-level security." },
  { icon: "🧭", title: "Professional Guides", desc: "Licensed, multilingual guides with 30+ years of local expertise." },
  { icon: "🕐", title: "24/7 Support", desc: "Round-the-clock customer support before, during, and after your trip." },
  { icon: "👑", title: "Luxury Experience", desc: "Premium accommodations and services that redefine travel comfort." },
  { icon: "✨", title: "Personalized Plans", desc: "Fully customized itineraries crafted around your preferences." },
];

const testimonials = [
  { name: "Priya Sharma", loc: "Delhi, India", text: "An absolutely magical experience! Nepal Tour Package organized everything perfectly — from the Everest views to Pokhara's tranquility. Highly recommended!", rating: 5 },
  { name: "Rahul Mehta", loc: "Mumbai, India", text: "Our honeymoon in Nepal was a dream come true. The team was incredibly professional and attentive. The hotel choices were stunning!", rating: 5 },
  { name: "Anita Joshi", loc: "Pune, India", text: "Best family trip we've ever had! Chitwan safari was phenomenal. Kids loved every moment and we felt completely safe throughout.", rating: 5 },
  { name: "Vikram Singh", loc: "Jaipur, India", text: "The Muktinath Yatra was spiritually enriching and beautifully organized. Every detail was handled with care and devotion.", rating: 5 },
  { name: "Sunita Patel", loc: "Ahmedabad, India", text: "Trekking to Everest Base Camp was a lifelong dream. The guides were exceptional and the entire experience was unforgettable!", rating: 5 },
  { name: "Deepak Kumar", loc: "Bangalore, India", text: "Absolutely worth every rupee! The luxury package exceeded our expectations. Nepal Tour Package truly delivers premium experiences.", rating: 5 },
];

const faqs = [
  { q: "How do I book a package?", a: "You can book directly through our website contact form, WhatsApp, phone, or email. Our team will confirm your booking within 24 hours with a detailed itinerary and payment options." },
  { q: "Do you provide transport within Nepal?", a: "Yes! All our packages include comfortable A/C transport throughout the tour. We use well-maintained vehicles with experienced drivers who know every route in Nepal." },
  { q: "Can I customize my tour package?", a: "Absolutely! We specialize in personalized travel experiences. Share your preferences and dates, and we'll craft a custom itinerary just for you." },
  { q: "Is hotel accommodation included?", a: "Yes, all our packages include carefully selected hotel accommodations. You can choose from budget-friendly, standard, or luxury options based on your preference." },
  { q: "Do you offer group discounts?", a: "We offer attractive group discounts for groups of 6 or more travelers. Contact us for special group pricing and well create a tailored package for your group." },
];

const galleryItems = [
  { label: "Everest Base Camp", color: "#1a3a5c", h: 280 },
  { label: "Phewa Lake Pokhara", color: "#0d2b4e", h: 200 },
  { label: "Swayambhunath Temple", color: "#1e3a2e", h: 200 },
  { label: "Annapurna Range", color: "#1a2a4a", h: 260 },
  { label: "Chitwan Safari", color: "#1a3022", h: 220 },
  { label: "Pashupatinath", color: "#2a1a3a", h: 240 },
  { label: "Muktinath", color: "#1a3a4a", h: 200 },
  { label: "Rara Lake", color: "#0d2a3e", h: 220 },
];





const nepalBotKnowledge = [
  // Core Packages & Pricing
  { keywords: ["nepal tour package", "packages", "options"], reply: "We offer a variety of Nepal Tour Packages starting from ₹14,999! This includes Everest treks, honeymoon specials, and cultural tours. Would you like me to share a specific itinerary?" },
  { keywords: ["price", "cost", "how much", "budget", "fees"], reply: "Our packages range from ₹14,999 to ₹54,999 depending on the duration, hotel category, and transport type. Check our 'Packages' tab for detailed pricing." },
  { keywords: ["cheap", "budget friendly", "discount"], reply: "We have fantastic budget packages starting at just ₹14,999 for 3N/4D, including accommodation and sightseeing." },
  
  // Destinations
  { keywords: ["kathmandu", "ktm"], reply: "Kathmandu is the heart of Nepal! Our Kathmandu tours cover Pashupatinath, Boudhanath Stupa, Swayambhunath (Monkey Temple), and Durbar Square." },
  { keywords: ["pokhara"], reply: "Pokhara is the city of lakes! It features Phewa Lake boating, Davis Falls, Gupteshwor Cave, and stunning sunrise views from Sarangkot." },
  { keywords: ["chitwan", "safari", "jungle"], reply: "Our Chitwan National Park packages include elephant/jeep safaris, canoe rides, jungle walks, and the Tharu cultural dance. Great for wildlife lovers!" },
  { keywords: ["lumbini", "buddha"], reply: "Lumbini is the birthplace of Lord Buddha. We offer peaceful pilgrimage packages to visit the Maya Devi Temple and international monasteries." },
  { keywords: ["muktinath", "pilgrimage", "darshan"], reply: "We offer dedicated Muktinath Darshan packages via flight (Jomsom) or road. Let us know if you need helicopter packages!" },
  
  // Activities
  { keywords: ["trekking", "trek", "hiking"], reply: "Nepal is a trekker's paradise! We organize Everest Base Camp, Annapurna Circuit, and short hikes like Nagarkot or Dhampus." },
  { keywords: ["everest", "ebc", "mount everest"], reply: "You can experience Mount Everest via our 14-day EBC trek, or take a 1-hour scenic mountain flight from Kathmandu!" },
  { keywords: ["paragliding", "adventure", "bungee", "rafting"], reply: "Pokhara is the adventure capital! We can add Paragliding, Bungee Jumping, Zip-lining, or River Rafting to any package." },
  { keywords: ["honeymoon", "couple", "romantic"], reply: "Our Nepal Honeymoon packages include luxury stays, candlelit dinners in Pokhara, and private cabs. Shall I send you the brochure?" },
  
  // Logistics & Travel
  { keywords: ["visa", "passport"], reply: "Indian citizens do NOT need a visa for Nepal! Just carry a valid Indian Passport or Voter ID card. Aadhar cards are not accepted for flight travel." },
  { keywords: ["flight", "airport", "air ticket"], reply: "Most of our packages start from Tribhuvan International Airport (KTM). We can assist with booking your flights from India as well." },
  { keywords: ["train", "gorakhpur", "raxaul"], reply: "We offer customized packages starting right from Gorakhpur or Raxaul borders with private cab pickups!" },
  { keywords: ["weather", "best time", "season", "climate"], reply: "The best time to visit Nepal is Spring (March-May) or Autumn (September-November) for clear skies and pleasant weather." },
  { keywords: ["snow", "snowfall"], reply: "If you want to see snow, we recommend visiting Kalinchowk or Chandragiri Hills during January and February." },
  
  // Customization & Support
  { keywords: ["customize", "custom", "own plan"], reply: "Absolutely! All our tour packages are 100% customizable. Tell us your travel dates and preferred places, and we'll tailor it." },
  { keywords: ["family", "kids", "children"], reply: "Nepal is very family-friendly. We provide comfortable SUVs and select child-friendly hotels for family groups." },
  { keywords: ["group", "college", "corporate"], reply: "We specialize in group tours! If you have a group of 10+ people, we provide special discounts and large coach transport." },
  
  // Policies & Contact
  { keywords: ["book", "booking", "reserve"], reply: "To book, you just need to pay a 25% advance. The rest can be paid upon arrival in Nepal. Shall I share the payment link?" },
  { keywords: ["cancel", "refund"], reply: "We offer a flexible cancellation policy. Cancellations made 15 days prior get a full refund minus minimal processing fees." },
  { keywords: ["contact", "number", "call", "whatsapp", "phone"], reply: "You can reach our Nepal Tour experts directly at [Your Phone Number] or email us at [Your Email]." },
  { keywords: ["hello", "hi", "hey"], reply: "Namaste! Welcome to Nepal Tour and Travel. How can I help you plan your Himalayan trip today?" }
];
// ============================================================
// COMPONENTS
// ============================================================

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function ParticlesField() {
  const particles = useRef([...Array(20)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 1}px`,
    height: `${Math.random() * 4 + 1}px`,
    animationDuration: `${Math.random() * 15 + 8}s`,
    animationDelay: `${Math.random() * 10}s`,
    background: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--gold)" : "var(--blue)",
    opacity: Math.random() * 0.5 + 0.1,
  }))).current;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((s, i) => <Particle key={i} style={s} />)}
    </div>
  );
}

function RevealSection({ children, className = "", type = "reveal", threshold = 0.15 }) {
  const [ref, inView] = useInView(threshold);
  return (
    <div ref={ref} className={`${type} ${inView ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("Home")}>
            <span style={{ fontSize: "1.6rem" }}>🏔️</span>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nepal Tour and Travels 
            </span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map(l => (
              <span key={l} className={`nav-link ${active === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn-glow btn-gold desktop-nav" style={{ padding: "10px 24px", fontSize: ".85rem", width: 'auto' }} onClick={() => scrollTo("Contact")}>Book Now</button>
            <button className="mobile-ham" onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", color: "var(--white)", fontSize: "1.5rem", cursor: "pointer" }}>☰</button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--white)", fontSize: "1.8rem", cursor: "pointer" }}>✕</button>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", marginBottom: 8, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🏔️ Nepal Tour Package</div>
          {navLinks.map(l => (
            <span key={l} style={{ fontSize: "1.3rem", fontFamily: "Cinzel, serif", color: "var(--white)", cursor: "pointer" }} onClick={() => scrollTo(l)}>{l}</span>
          ))}
          <button className="btn-glow btn-gold" style={{width: '200px'}} onClick={() => { scrollTo("Contact"); setMenuOpen(false); }}>Book Now</button>
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function TypeWriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = words[wordIndex];
    const delay = deleting ? 60 : 110;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else setCharIndex(c => c + 1);
      } else {
        setText(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(i => (i + 1) % words.length);
        }
        setCharIndex(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words]);

  return <span style={{ color: "var(--cyan)" }}>{text}<span className="cursor" /></span>;
}

function Hero() {
  return (
    <section id="home" className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative" }}>
      <ParticlesField />

      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "20%", left: "8%", width: "max(200px, 20vw)", aspectRatio: '1/1', borderRadius: "50%", background: "radial-gradient(circle,rgba(0,198,255,.1),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "8%", width: "max(150px, 15vw)", aspectRatio: '1/1', borderRadius: "50%", background: "radial-gradient(circle,rgba(201,162,39,.08),transparent 70%)", pointerEvents: "none" }} />

      {/* Floating icons */}
      <div className="float-icon" style={{ position: "absolute", top: "18%", left: "12%", fontSize: "2rem", animationDelay: "0s", opacity: .6 }}>⛰️</div>
      <div className="float-icon" style={{ position: "absolute", top: "30%", right: "10%", fontSize: "1.6rem", animationDelay: "1.5s", opacity: .5 }}>✈️</div>
      <div className="float-icon" style={{ position: "absolute", bottom: "30%", left: "8%", fontSize: "1.4rem", animationDelay: "0.8s", opacity: .4 }}>🧭</div>
      <div className="float-icon" style={{ position: "absolute", top: "55%", right: "14%", fontSize: "1.3rem", animationDelay: "2s", opacity: .4 }}>🌿</div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto", flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,198,255,.1)", border: "1px solid rgba(0,198,255,.25)", borderRadius: 50, padding: "8px 20px", marginBottom: 28, fontSize: ".82rem", color: "var(--cyan)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, alignSelf: 'center' }}>
          <span>🏆</span> Nepal Tour and Travels
        </div>

        <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(2.2rem,8vw,4.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 12 }}>
          <span className="grad-text">Explore Nepal</span><br />
          Like Never Before
        </h1>

        <div style={{ fontSize: "clamp(1rem,4vw,1.25rem)", marginBottom: 16, minHeight: 36, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
          <TypeWriter words={["Breathtaking Mountains...", "Sacred Temples...", "Jungle Safari Adventures...", "Romantic Honeymoons...", "Epic Treks...", "Luxury Escapes..."]} />
        </div>

        <p style={{ color: "var(--muted)", fontSize: "clamp(1rem, 3vw, 1.15rem)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px", fontFamily: "Cormorant Garamond, serif" }}>
          Discover breathtaking destinations, adventure tours, honeymoon packages, and unforgettable experiences across Nepal with comfort and affordability.
        </p>

        <div className="hero-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-glow btn-primary" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
            🗺️ &nbsp;Explore Packages
          </button>
          <button className="btn-glow btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            📞 &nbsp;Contact Us
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats-wrapper">
        <div className="hero-stats-grid">
          {[["5000+", "Happy Travelers"], ["3000+", "Tours Completed"], ["30+", "Years of Excellence"]].map(([n, l]) => (
            <div key={l} className="stat-item">
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.5rem, 5vw, 1.8rem)", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
              <div style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="responsive-2col">
        {/* Left: Image */}
        <RevealSection type="reveal-left">
          <div style={{ position: "relative", maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 20, background: "linear-gradient(135deg,#0a2040,#041830,#071428)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, boxShadow: "0 30px 80px rgba(0,0,0,.5)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(0,198,255,.12),transparent 60%)" }} />
              <span style={{ fontSize: "6rem" }}>🏔️</span>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", color: "var(--cyan)", opacity: .8 }}>Himalayan Experiences</span>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", padding: "0 20px" }}>
                {["Trekking", "Safari", "Culture", "Adventure"].map(t => (
                  <span key={t} style={{ padding: "4px 14px", background: "rgba(0,198,255,.1)", border: "1px solid rgba(0,198,255,.2)", borderRadius: 50, fontSize: ".75rem", color: "var(--cyan)" }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ position: "absolute", bottom: -20, right: -10, background: "linear-gradient(135deg,var(--gold),var(--gold2))", borderRadius: "50%", width: 110, height: 110, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(201,162,39,.4)", border: "4px solid var(--navy2)" }}>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.8rem", fontWeight: 900, color: "#080808", lineHeight: 1 }}>30+</span>
              <span style={{ fontSize: ".65rem", color: "#333", fontWeight: 600, textAlign: "center" }}>Years<br />Experience</span>
            </div>

            <div className="glass-card" style={{ position: "absolute", top: -16, left: -10, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.5rem" }}>⭐</span>
              <div>
                <div style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--gold)" }}>98%</div>
                <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Right: Content */}
        <RevealSection type="reveal-right">
          <div>
            <div className="section-label">About Us</div>
            <h2 className="section-title">Your Trusted <span className="grad-text">Nepal Tour</span> and Travels</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: 28, fontFamily: "Cormorant Garamond, serif", fontSize: "1.08rem" }}>
              <strong style={{ color: "var(--white)" }}>Nepal Tour and Travels</strong> is a trusted travel company providing premium and affordable Nepal tour experiences. We specialize in honeymoon packages, family tours, adventure trips, trekking, jungle safaris, religious tours, and luxury travel experiences across Nepal.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: 36, fontFamily: "Cormorant Garamond, serif", fontSize: "1.08rem" }}>
              With over a decade of experience and 5,000+ satisfied travelers, we craft journeys that transform into lifelong memories. Our team of certified local guides ensures every moment is safe, enriching, and extraordinary.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Affordable Pricing & No Hidden Charges", "Customized Tour Plans for Every Need", "Professional Licensed Tour Guides", "24/7 Dedicated Customer Support", "Safe, Comfortable & Reliable Travel"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div className="feature-dot" />
                  <span style={{ color: "var(--white)", fontSize: ".95rem" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="hero-btns" style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-glow btn-primary" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
                View Packages
              </button>
              <button className="btn-glow btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Us
              </button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES
// ============================================================
function Services() {
  const [ref, inView] = useInView();
  return (
    <section id="services" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy2),var(--navy))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Our Premium <span className="grad-text">Services</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Everything you need for an unforgettable Nepal travel experience — all in one place.</p>
          </div>
        </RevealSection>

        <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 }}>
          {services.map(s => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 10, color: "var(--white)" }}>{s.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PACKAGES
// ============================================================
function PackageCard({ pkg }) {
  const [liked, setLiked] = useState(false);
  const colors = { Popular: "#1a6bd4", Spiritual: "#8b5cf6", Adventure: "#22c55e", Romantic: "#ec4899", Trending: "#f59e0b", Luxury: "#c9a227" };
  return (
    <div className="pkg-card" style={{ background: "linear-gradient(180deg,var(--navy3),var(--navy2))" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", height: 220, background: `linear-gradient(135deg,${colors[pkg.tag] || "#1a6bd4"}22,var(--navy))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
          {pkg.title.includes("Everest") ? "🏔️" : pkg.title.includes("Honeymoon") ? "💑" : pkg.title.includes("Jungle") ? "🐘" : pkg.title.includes("Muktinath") ? "🛕" : pkg.title.includes("Luxury") ? "👑" : "🗺️"}
        </div>
        <div className="pkg-overlay" />
        <div style={{ position: "absolute", top: 14, left: 14, padding: "5px 14px", borderRadius: 50, background: colors[pkg.tag] || "var(--blue)", fontSize: ".75rem", fontWeight: 600, color: "#fff", zIndex:2 }}>{pkg.tag}</div>
        <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,.4)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: liked ? "#ef4444" : "#fff", transition: "all .3s", zIndex:2 }}>
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 700, marginBottom: 10, color: "var(--white)" }}>{pkg.title}</h3>
        <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>📍 {pkg.location}</span>
          <span style={{ color: "var(--muted)", fontSize: ".82rem" }}>⏱️ {pkg.days}</span>
        </div>
        <div style={{ display: "flex", gap: 2, marginBottom: 16, color: "var(--gold)", fontSize: ".9rem" }}>
          {[...Array(pkg.rating)].map((_, i) => <span key={i}>★</span>)}
          {[...Array(5 - pkg.rating)].map((_, i) => <span key={i} style={{ opacity: .3 }}>★</span>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <span style={{ fontSize: ".75rem", color: "var(--muted)" }}>Starting from</span>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--gold)" }}>{pkg.price}</div>
          </div>
          <button className="btn-glow btn-primary" style={{ padding: "10px 20px", fontSize: ".82rem" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Packages() {
  const cats = ["All", "Adventure", "Cultural", "Honeymoon", "Spiritual", "Luxury"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? packages : packages.filter(p => p.category === cat);

  return (
    <section id="packages" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label">Travel Packages</div>
            <h2 className="section-title">Popular <span className="grad-text">Tour Packages</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Handcrafted itineraries for every kind of traveler — from solo adventures to luxury family getaways.</p>
          </div>
        </RevealSection>

        <RevealSection>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {cats.map(c => (
              <button key={c} className={`filter-tab ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
          {filtered.map(p => <PackageCard key={p.title} pkg={p} />)}
        </div>

        <RevealSection>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-glow btn-outline" style={{width: 'auto'}} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              ✨ &nbsp;Request Custom Package
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE US
// ============================================================
function WhyUs() {
  const [ref, inView] = useInView();
  return (
    <section id="why" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy),var(--navy2))", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "max(300px, 60vw)", aspectRatio: "1/1", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,198,255,.05),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">The <span className="grad-text">Nepal Tour Package</span> Advantage</h2>
          </div>
        </RevealSection>

        <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, marginBottom: 80 }}>
          {whyFeatures.map(f => (
            <div key={f.title} className="why-card">
              <div style={{ fontSize: "2.2rem", marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600, marginBottom: 10, color: "var(--white)" }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Animated counters */}
        <div className="glass-card" style={{ padding: "48px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { end: 5000, suffix: "+", label: "Happy Travelers", icon: "😊" },
              { end: 98, suffix: "%", label: "Positive Reviews", icon: "⭐" },
              { end: 3000, suffix: "+", label: "Tours Completed", icon: "🗺️" },
              { end: 10, suffix: "+", label: "Years of Experience", icon: "🏆" },
            ].map(c => (
              <div key={c.label} className="stat-item" style={{border: 'none'}}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: "2.2rem", fontWeight: 800, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Counter end={c.end} suffix={c.suffix} />
                </div>
                <div style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 6 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GALLERY
// ============================================================
function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="gallery" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">Visual Journey</div>
            <h2 className="section-title">Nepal Through <span className="grad-text">Our Lens</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>A glimpse of the breathtaking beauty waiting for you across Nepal.</p>
          </div>
        </RevealSection>

        <div ref={ref} className={`stagger ${inView ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, gridAutoRows: "200px", gridAutoFlow: "dense" }}>
          {galleryItems.map((item, i) => (
            <div key={item.label} className="gallery-item" style={{ gridRow: i === 0 || i === 3 ? "span 2" : "span 1", cursor: "pointer" }} onClick={() => setLightbox(item)}>
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${item.color},${item.color}88)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <span style={{ fontSize: "3rem" }}>{i % 4 === 0 ? "🏔️" : i % 4 === 1 ? "🌊" : i % 4 === 2 ? "🛕" : "🌿"}</span>
              </div>
              <div className="gallery-overlay">
                <span style={{ color: "#fff", fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600 }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: "100%", background: lightbox.color, borderRadius: 16, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, border: "1px solid var(--border)", boxShadow: "0 30px 100px rgba(0,0,0,.8)" }}>
              <span style={{ fontSize: "6rem" }}>🏔️</span>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.2rem", color: "var(--white)", textAlign: 'center' }}>{lightbox.label}</span>
              <button onClick={() => setLightbox(null)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: 10 }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" style={{ padding: "100px 0", background: "linear-gradient(180deg,var(--navy2),var(--navy))", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">Traveler Stories</div>
            <h2 className="section-title">What Our <span className="grad-text">Guests Say</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Real experiences from real travelers who trusted us with their Nepal adventure.</p>
          </div>
        </RevealSection>
      </div>

      <div style={{ overflow: "hidden", padding: "8px 0", width: '100vw' }}>
        <div className="testimonial-track" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div key={i} className="glass-card" style={{ width: "min(320px, 85vw)", padding: "28px 24px", flexShrink: 0, borderRadius: 18, border: "1px solid rgba(0,198,255,.15)" }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,var(--blue),var(--cyan))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontFamily: "Cinzel, serif", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontWeight: 600, fontSize: ".95rem" }}>{t.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".78rem" }}>📍 {t.loc}</div>
                </div>
              </div>
              <div style={{ color: "var(--gold)", fontSize: ".9rem", marginBottom: 12 }}>
                {"★".repeat(t.rating)}
              </div>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.75, fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Frequently Asked <span className="grad-text">Questions</span></h2>
          </div>
        </RevealSection>

        {faqs.map((f, i) => (
          <RevealSection key={i}>
            <div className={`faq-item ${open === i ? "open" : ""}`}>
              <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ fontWeight: 500, fontSize: ".95rem", paddingRight: 16 }}>{f.q}</span>
                <span className="faq-icon">{open === i ? "−" : "+"}</span>
              </div>
              <div className={`faq-a ${open === i ? "open" : ""}`}>
                <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.75 }}>{f.a}</p>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", destination: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const submit = async (e) => {
    e.preventDefault();
    
    const payload = {
      access_key: "b6ab9076-6553-467d-b219-b5d73012fafc", // IMPORTANT: Replace this with your Web3Forms access key
      ...form
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      
      if (resData.success) {
        setSent(true);
        setForm({ name: "", email: "", destination: "", date: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section id="contact" style={{ padding: "100px 24px", background: "linear-gradient(180deg,var(--navy),var(--navy2))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Book Your <span className="grad-text">Dream Journey</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Ready to explore Nepal? Contact us and we'll craft the perfect package just for you.</p>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }} className="responsive-2col">
          {/* Info */}
          <RevealSection type="reveal-left">
            <div>
              <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
                <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", marginBottom: 24, color: "var(--cyan)" }}>Contact Information</h3>
                {[
                  { icon: "📞", label: "Phone", val: "+91- 9422799108" },
                  { icon: "✉️", label: "Email", val: "info@nepaltoursandtravels.com" },
                  { icon: "📍", label: "Address", val: "Head Office Opp. Gate No. -1, Railway Station ,Gorakhpur (U.P) - 273001" },
                  { icon: "⏰", label: "Hours", val: "Mon–Sat: 9AM – 7PM NPT" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                    <div style={{wordBreak: 'break-word'}}>
                      <div style={{ fontSize: ".75rem", color: "var(--muted)", marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: ".9rem", color: "var(--white)" }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/919918001088" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-glow" style={{ width: "100%", padding: "16px 24px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", borderRadius: 12, fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 20px rgba(37,211,102,.3)", border: "none", cursor: "pointer", transition: "all .3s" }}>
                  💬 &nbsp;Chat on WhatsApp
                </button>
              </a>

              {/* Social */}
              <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
                {["📘", "📸", "▶️", "🐦"].map((s, i) => (
                  <button key={i} className="social-icon" style={{ color: "var(--muted)", background: "none" }}>{s}</button>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Form */}
          <RevealSection type="reveal-right">
            <form onSubmit={submit} className="glass-card" style={{ padding: "36px 24px" }}>
              <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", marginBottom: 28, color: "var(--cyan)" }}>Send Us a Message</h3>

              {sent && (
                <div style={{ background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 10, padding: "14px 20px", marginBottom: 20, color: "#22c55e", fontSize: ".9rem" }}>
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <div className="contact-grid">
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name *</label>
                  <input className="form-input" name="name" placeholder="Your full name" value={form.name} onChange={handle} required />
                </div>
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Email *</label>
                  <input className="form-input" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} required />
                </div>
              </div>

              <div className="contact-grid">
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Destination</label>
                  <input className="form-input" name="destination" placeholder="e.g. Everest Trek" value={form.destination} onChange={handle} />
                </div>
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Travel Date</label>
                  <input className="form-input" name="date" type="date" value={form.date} onChange={handle} style={{ colorScheme: "dark" }} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: ".78rem", color: "var(--muted)", display: "block", marginBottom: 6 }}>Message</label>
                <textarea className="form-input" name="message" placeholder="Tell us about your dream Nepal trip..." value={form.message} onChange={handle} />
              </div>

              <button type="submit" className="btn-glow btn-gold" style={{ width: "100%", padding: "16px", fontSize: "1rem", borderRadius: 10 }}>
                🚀 &nbsp;Send Enquiry
              </button>
            </form>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "var(--navy2)", borderTop: "1px solid rgba(0,198,255,.12)" }}>
      <div className="grad-line" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: "1.6rem" }}>🏔️</span>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "1.1rem", fontWeight: 700, background: "linear-gradient(135deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nepal Tour and Travels</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, marginBottom: 20, maxWidth: 280 }}>
              Nepal's trusted travel partner for over a decade. We create extraordinary journeys across the Himalayas and beyond.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["📘", "📸", "▶️", "🐦"].map((s, i) => (
                <button key={i} className="social-icon" style={{ color: "var(--muted)", background: "none", border: "1px solid rgba(255,255,255,.1)" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Quick Links</h4>
            {navLinks.map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <span onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} style={{ color: "var(--muted)", fontSize: ".85rem", cursor: "pointer", transition: "color .3s" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</span>
              </div>
            ))}
          </div>

          {/* Tour Types */}
          <div>
            <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Tour Categories</h4>
            {["Trekking Tours", "Honeymoon Packages", "Family Tours", "Group Tours", "Spiritual Tours", "Adventure Tours", "Luxury Travel"].map(t => (
              <div key={t} style={{ marginBottom: 10 }}>
                <span style={{ color: "var(--muted)", fontSize: ".85rem", cursor: "pointer", transition: "color .3s" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{t}</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "Cinzel, serif", fontSize: ".9rem", fontWeight: 600, marginBottom: 20, color: "var(--white)" }}>Stay Updated</h4>
            <p style={{ color: "var(--muted)", fontSize: ".85rem", marginBottom: 16, lineHeight: 1.7 }}>Subscribe for exclusive deals, travel tips, and Nepal travel inspiration.</p>
            <div style={{ display: "flex" }}>
              <input className="newsletter-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="newsletter-btn" onClick={() => { setEmail(""); }}>Subscribe</button>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ color: "var(--muted)", fontSize: ".8rem", marginBottom: 8 }}>📞 +91-9422799108</div>
              <div style={{ color: "var(--muted)", fontSize: ".8rem", marginBottom: 8 }}>✉️ info@nepaltoursandtravels.com</div>
              <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>📍 Head Office Opp. Gate No. -1, Railway Station ,Gorakhpur (U.P) - 273001</div>
            </div>
          </div>
        </div>

        <div className="grad-line" style={{ marginBottom: 28 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "var(--muted)", fontSize: ".82rem" }}>© 2025 Nepal Tour and Travels. All rights reserved. Crafted with ❤️ in Nepal.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Sitemap"].map(l => (
              <span key={l} style={{ color: "var(--muted)", fontSize: ".8rem", cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "var(--cyan)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [active, setActive] = useState("Home");
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ sender: 'bot', text: 'Namaste! How can I help you plan your Nepal trip today?' }]);
  const [chatInput, setChatInput] = useState('');
  
  const cursorRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1800);

    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress((scrolled / total) * 100);
      setShowTop(scrolled > 400);

      // Update active nav
      navLinks.forEach(link => {
        const domEl = document.getElementById(link.toLowerCase());
        if (domEl) {
          const rect = domEl.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) setActive(link);
        }
      });
    };

    window.addEventListener("scroll", onScroll);

    // Cursor glow
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

 const handleSendMessage = (e) => {
  e.preventDefault();
  if (!chatInput.trim()) return;
  
  // 1. Add user message
  const userMsg = chatInput.trim();
  setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
  setChatInput('');

  // 2. Logic for auto-reply
  setTimeout(() => {
    // Default fallback message if no keywords match
    let botReply = "Thank you for reaching out! Our travel experts are reviewing your message and will connect with you shortly.";
    
    // Convert user message to lowercase for case-insensitive matching
    const lowerMsg = userMsg.toLowerCase();

    // Search the knowledge base for a match
    const match = nepalBotKnowledge.find(entry => 
      entry.keywords.some(keyword => lowerMsg.includes(keyword))
    );

    // If a match is found, replace the default reply
    if (match) {
      botReply = match.reply;
    }

    setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
  }, 1000); // 1 second delay to simulate typing
};

  return (
    <>
      <style>{CSS}</style>

      {/* Loading screen */}
      <div className={`loader ${loaded ? "done" : ""}`}>
        <div className="loader-ring" />
        <div className="loader-logo">🏔️ Nepal Tour Package</div>
        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: ".8rem" }}>Preparing your journey...</div>
      </div>

      {/* Cursor glow */}
      <div className="cursor-glow" ref={cursorRef} />

      {/* Progress bar */}
      <div id="progress-bar" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Main content */}
      <main>
        <Hero />
        <div className="grad-line" />
        <About />
        <div className="grad-line" />
        <Services />
        <div className="grad-line" />
        <Packages />
        <div className="grad-line" />
        <WhyUs />
        <div className="grad-line" />
        <Gallery />
        <div className="grad-line" />
        <Testimonials />
        <div className="grad-line" />
        <FAQ />
        <div className="grad-line" />
        <Contact />
      </main>

      <Footer />

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Nepal Tour Guide 🤖</span>
            <button className="chat-close" onClick={() => setIsChatOpen(false)}>✕</button>
          </div>
          <div className="chat-body">
            {chatMessages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input type="text" className="chat-input" placeholder="Type a message..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
            <button type="submit" className="chat-send">Send</button>
          </form>
        </div>
      )}

      {/* Chatbot float */}
      <div className="chat-btn" title="Open Chatbot" onClick={() => setIsChatOpen(!isChatOpen)}>🤖</div>

      {/* WhatsApp float */}
      <a href="https://wa.me/919918001088" target="_blank" rel="noreferrer">
        <div className="wa-btn" title="Chat on WhatsApp">💬</div>
      </a>

      {/* Back to top */}
      <div className={`back-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">↑</div>
    </>
  );
}