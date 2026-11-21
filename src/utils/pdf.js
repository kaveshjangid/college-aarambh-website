import { jsPDF } from 'jspdf'

export function downloadEnquiryPdf(data) {
  const doc = new jsPDF()
  const navy = [16, 43, 82]
  doc.setFillColor(...navy)
  doc.rect(0, 0, 210, 38, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('COLLEGE AARAMBH', 16, 18)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Student Enquiry Summary', 16, 27)

  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text(data.formType || 'Admission Enquiry', 16, 54)

  const rows = [
    ['Student name', data.name],
    ['Mobile number', data.phone],
    ['Email address', data.email],
    ['Programme category', data.programme],
    ['Preferred course', data.course],
    ['Preferred location', data.location],
    ['Entrance examination', data.exam || 'Not specified'],
    ['Academic score', data.score || 'Not specified'],
    ['Additional message', data.message || 'Not provided'],
  ]

  let y = 68
  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text(`${label}:`, 16, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(15, 23, 42)
    const lines = doc.splitTextToSize(String(value || '-'), 112)
    doc.text(lines, 78, y)
    y += Math.max(9, lines.length * 5 + 3)
    if (y > 265) { doc.addPage(); y = 22 }
  })

  doc.setDrawColor(226, 232, 240)
  doc.line(16, 280, 194, 280)
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text('This document is an enquiry summary, not an admission offer or scholarship confirmation.', 16, 287)
  const fileName = `College-Aarambh-${(data.name || 'Enquiry').replace(/[^a-z0-9]/gi, '-')}.pdf`
  const pdfDataUri = doc.output('datauristring')
  doc.save(fileName)
  return { pdfDataUri, fileName }
}