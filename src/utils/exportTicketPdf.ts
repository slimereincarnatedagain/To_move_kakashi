import jsPDF from 'jspdf';
import { Ticket } from '../types';

export function exportTicketPdf(ticket: Ticket): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  let y = 60;

  const line = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(label, 60, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 200, y);
    y += 22;
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('GTT TO move — Ticket', pageW / 2, y, { align: 'center' });
  y += 10;

  doc.setDrawColor(28, 64, 140);
  doc.setLineWidth(1);
  doc.line(60, y, pageW - 60, y);
  y += 24;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Ticket ID: ${ticket.id}`, 60, y);
  doc.setTextColor(0);
  y += 28;

  // Fields
  doc.setFontSize(11);
  line('FARE DESCRIPTION', ticket.fareDescription);
  line('TYPE', ticket.ticketType);
  line('DURATION', ticket.duration);
  line('VALIDATION START', ticket.validationStart ?? 'Not yet validated');
  line('LAST VALIDATION', ticket.lastValidation ?? 'Not yet validated');
  line('VALIDATION END', ticket.validationEnd ?? 'Not yet validated');
  if (ticket.selfValidatedLine) line('LINE', ticket.selfValidatedLine);
  line('REMAINING RIDES', String(ticket.remainingRides));
  line('PURCHASE DATE', ticket.purchaseDate);
  line('EXPIRATION', ticket.expiration);

  // Footer
  y += 16;
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(60, y, pageW - 60, y);
  y += 16;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This is a dummy ticket export. Layout will be updated in a future release.', pageW / 2, y, { align: 'center' });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  // window.open must be called synchronously inside the click handler for iOS compatibility.
  // If blocked, fallback to a programmatic anchor click.
  const opened = window.open(url, '_blank');
  if (!opened) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
