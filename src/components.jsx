import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Menu, X, GraduationCap, ChevronDown, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { locations } from './data'

// Add the Facebook URL here later; the icon is already reserved in the footer.
const FACEBOOK_URL = ''

export function Header() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState('')
  const close = () => { setOpen(false); setDrop('') }
  return <header className="header">
    <div className="topbar"><div className="container topbar-inner"><span>Admission guidance for your next big step</span><div><a href="tel:+917007086568"><Phone size={13}/> +91 70070 86568</a><a href="mailto:collegeaarambh@gmail.com"><Mail size={13}/> Email us</a></div></div></div>
    <div className="container nav-wrap">
      <Link to="/" className="brand" onClick={close}><span className="brand-mark brand-logo"><img src="/images/college-aarambh-wordmark.jpg" alt="College Aarambh logo"/></span></Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <NavLink to="/" onClick={close}>Home</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <div className="nav-dropdown" onMouseEnter={() => setDrop('courses')} onMouseLeave={() => setDrop('')}>
          <button onClick={() => setDrop(drop === 'courses' ? '' : 'courses')}>Courses <ChevronDown size={14}/></button>
          {drop === 'courses' && <div className="dropdown-menu"><Link to="/courses" onClick={close}>All programmes</Link><Link to="/courses?group=Management" onClick={close}>MBA & PGDM</Link><Link to="/courses?group=Commerce" onClick={close}>Commerce</Link><Link to="/courses?group=Engineering%20%26%20IT" onClick={close}>Engineering & IT</Link><Link to="/courses?group=Law" onClick={close}>Law</Link><Link to="/courses?group=Pharmacy" onClick={close}>Pharmacy</Link></div>}
        </div>
        <NavLink to="/colleges" onClick={close}>Colleges</NavLink>
        <NavLink to="/exams" onClick={close}>Entrance Exams</NavLink>
        <NavLink to="/scholarship" onClick={close}>Scholarships</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
        <Link className="btn btn-primary nav-cta" to="/apply-now" onClick={close}>Apply Now <ArrowRight size={16}/></Link>
      </nav>
    </div>
  </header>
}

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark brand-logo"><img src="/images/college-aarambh-wordmark.jpg" alt="College Aarambh logo"/></span></Link><p>Thoughtful admission guidance to help students explore courses, colleges and the next step in their education journey.</p><div className="socials"><a href="https://www.instagram.com/collegeaaramabhh_99?knvt=Mm5naHp2cG9wdnBu" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={FACEBOOK_URL || undefined} aria-label="Facebook" className={!FACEBOOK_URL ? "social-placeholder" : ""} onClick={e=>{if(!FACEBOOK_URL)e.preventDefault()}}><Facebook/></a><a href="https://www.linkedin.com/in/college-aarambh-14b537392?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a></div></div>
    <div><h4>Explore</h4><Link to="/courses">Courses</Link><Link to="/colleges">Colleges</Link><Link to="/exams">Entrance exams</Link><Link to="/scholarship">Scholarship assistance</Link></div>
    <div><h4>Popular programmes</h4><Link to="/courses">MBA</Link><Link to="/courses">PGDM</Link><Link to="/courses">BBA & B.Com</Link><Link to="/courses">B.Tech & BCA</Link></div>
    <div><h4>Get in touch</h4><p><Phone size={15}/> <a href="tel:+917007086568">+91 70070 86568</a></p><p><Mail size={15}/> <a href="mailto:collegeaarambh@gmail.com">collegeaarambh@gmail.com</a></p><p><MapPin size={15}/> Noida, Uttar Pradesh, India</p><Link to="/contact">Contact our team <ArrowRight size={14}/></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} College Aarambh. All rights reserved.</span><span>Admission guidance • Student-first approach</span></div></footer>
}

export function PageHero({eyebrow, title, description}) {
  return <section className="page-hero"><div className="container"><div className="eyebrow light">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>
}

export function SectionHeading({eyebrow, title, text, center=false}) {
  return <div className={`section-heading ${center ? 'center' : ''}`}><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

export function CTA({title='Ready to take the next step?', text='Speak with our guidance team and explore your options with clarity.'}) {
  return <section className="cta-band"><div className="container cta-inner"><div><div className="eyebrow light">LET'S BEGIN</div><h2>{title}</h2><p>{text}</p></div><Link to="/apply-now" className="btn btn-white">Start your enquiry <ArrowRight size={17}/></Link></div></section>
}