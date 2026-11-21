import React, { useMemo, useState } from 'react'
import { CheckCircle2, FileDown, MessageCircle, Send } from 'lucide-react'
import { courses, locations, exams } from './data'
import { downloadEnquiryPdf } from './utils/pdf'
import { WHATSAPP_NUMBER } from './config'

const initial = { name:'', phone:'', email:'', programme:'Management', course:'MBA', location:'Greater Noida', exam:'', score:'', message:'' }

function makeWhatsAppMessage(data) {
  return [
    'Hello College Aarambh! I would like to enquire about admission.',
    '',
    `*Student name:* ${data.name}`,
    `*Mobile number:* ${data.phone}`,
    `*Email address:* ${data.email}`,
    `*Programme category:* ${data.programme}`,
    `*Preferred course:* ${data.course}`,
    `*Preferred location:* ${data.location}`,
    `*Entrance examination:* ${data.exam || 'Not specified'}`,
    `*Academic score:* ${data.score || 'Not specified'}`,
    `*Message:* ${data.message || 'Not provided'}`,
  ].join('\n')
}

export default function EnquiryForm({ formType='Admission Enquiry', compact=false }) {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('')
  const courseOptions = useMemo(() => courses.filter(c => c.group === form.programme), [form.programme])
  const update = (key, value) => setForm(prev => ({...prev, [key]:value}))
  const submit = (e) => {
    e.preventDefault()
    setStatus('')
    const payload = {...form, formType}
    try {
      downloadEnquiryPdf(payload)
      if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER) || WHATSAPP_NUMBER.includes('X')) {
        setStatus('number')
        return
      }
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeWhatsAppMessage(payload))}`
      window.open(url, '_blank', 'noopener,noreferrer')
      setStatus('opened')
      setForm(initial)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }
  return <form className={`enquiry-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
    <div className="form-intro"><span className="form-icon"><Send size={19}/></span><div><h3>{formType}</h3><p>Share a few details. Our team can help you explore suitable options.</p></div></div>
    <div className="form-grid">
      <label>Student name *<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Enter your full name"/></label>
      <label>Mobile number *<input required type="tel" pattern="[0-9+\-\s]{10,15}" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="10-digit mobile number"/></label>
      <label>Email address *<input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label>
      <label>Programme category *<select value={form.programme} onChange={e=>{update('programme',e.target.value); update('course', courses.find(c=>c.group===e.target.value)?.name || '')}}>{['Management','Commerce','Engineering & IT','Law','Pharmacy'].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Preferred course *<select required value={form.course} onChange={e=>update('course',e.target.value)}>{courseOptions.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}</select></label>
      <label>Preferred location *<select value={form.location} onChange={e=>update('location',e.target.value)}>{locations.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Entrance examination<select value={form.exam} onChange={e=>update('exam',e.target.value)}><option value="">Select if applicable</option>{exams.map(x=><option key={x.name}>{x.name}</option>)}</select></label>
      <label>Academic score / percentage<input value={form.score} onChange={e=>update('score',e.target.value)} placeholder="e.g. 78% (optional)"/></label>
      <label className="full">How can we help you?<textarea rows="3" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Tell us about your admission goals (optional)"/></label>
    </div>
    <div className="form-foot"><p>Your details will open in WhatsApp for you to send to our admission team.</p><button className="btn btn-primary" type="submit"><MessageCircle size={16}/> Submit enquiry via WhatsApp</button></div>
    {status === 'opened' && <div className="form-status success"><CheckCircle2/> WhatsApp opened with your enquiry. Please tap Send in WhatsApp to submit it. Your PDF summary has also been downloaded.</div>}
    {status === 'number' && <div className="form-status info"><FileDown/> Your PDF summary has been downloaded. The College Aarambh WhatsApp number still needs to be added in src/config.js.</div>}
    {status === 'error' && <div className="form-status error">Something went wrong while preparing your enquiry. Please try again or contact the consultancy directly.</div>}
    <small className="form-note">Submitting this form does not guarantee admission or scholarship. Final eligibility and availability are determined by the respective institution.</small>
  </form>
}
