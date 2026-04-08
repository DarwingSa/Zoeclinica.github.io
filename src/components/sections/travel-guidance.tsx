'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Plane, PawPrint, CalendarIcon, Banknote, FileText, Printer, User, Info, Mail } from 'lucide-react';
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CustomDatePicker } from '@/components/ui/custom-date-picker';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const travelFormSchema = z.object({
  ownerName: z.string().min(2, "El nombre es obligatorio"),
  destination: z.enum(["europa", "norteamerica", "asia", "latinoamerica"], {
    required_error: "Selecciona un destino",
  }),
  petName: z.string().min(1, "El nombre de la mascota es obligatorio"),
  species: z.enum(["dog", "cat"], {
    required_error: "Selecciona perro o gato",
  }),
  breed: z.string().min(2, "La raza es obligatoria"),
  color: z.string().min(2, "El color es obligatorio"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  weight: z.string()
    .min(1, "El peso es obligatorio")
    .regex(/^\d+(\.\d{1,2})?$/, "Ingresa solo números (ej: 5 o 5.5)"),
});

type TravelFormValues = z.infer<typeof travelFormSchema>;

type ServiceItem = {
  label: string;
  detail: string;
  price: number;
};

type ExtraFee = {
  title: string;
  price: number;
  note: string;
};

type DestinationData = {
  title: string;
  description: string;
  estimatedTime: string;
  alert: string;
  extraFees?: ExtraFee[];
  budgetUnavailable?: boolean;
  getServices: (species: "dog" | "cat") => ServiceItem[];
};

const destinationServices: Record<string, DestinationData> = {
  europa: {
    title: "Presupuesto de Viaje a Europa (UE)",
    description: "Cumplimiento total normativa CEXGAN y UE. Incluye gestión sanitaria completa.",
    estimatedTime: "Mínimo 21 días antes del viaje",
    alert: "Si tu mascota es menor de 3 meses, contáctanos directamente.",
    extraFees: [
      {
        title: "Tasas y Aranceles de Exportación",
        price: 70,
        note: "Pago directo a cuenta del cliente (Tasa Oficial). Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica."
      },
      {
        title: "Aranceles del INSAI (Aeropuertos)",
        price: 20,
        note: "Destinado a trámites de aeropuertos. Pago directo a cuenta del cliente (Tasa Oficial). Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica."
      }
    ],
    getServices: (species) => [
      {
        label: "Plan de Vacunación Anual (Revacunación)",
        detail: species === 'dog'
          ? "Séxtuple + Antirrábica + Desparasitación + KC"
          : "Quíntuple Felina + Antirrábica + Desparasitación",
        price: 100
      },
      {
        label: "Implante de Microchips",
        detail: "Microchip ISO 11784/11785 Homologado",
        price: 50
      },
      {
        label: "Titulación de Anticuerpos Contra la Rabia",
        detail: "Dura en llegar al laboratorio de Alemania 1 a 2 meses",
        price: 200
      },
      {
        label: "Permisología Sanitaria (INSAI)",
        detail: "Gestión y emisión de permisos ante autoridades sanitarias",
        price: 150
      },
      {
        label: "Guía de Movilización Europea (Anexo 4)",
        detail: "Documento oficial requerido por la UE para el ingreso",
        price: 40
      },
      {
        label: "Pago de la Muestras en Alemania",
        detail: "Costo del procesamiento de muestras en laboratorio alemán",
        price: 65
      }
    ]
  },
  norteamerica: {
    title: "Pack Viaje a Norteamérica",
    description: "Gestión completa de requisitos CDC (EE.UU.) o CFIA (Canadá).",
    estimatedTime: "Iniciar 30 días antes",
    alert: "Nuevos requisitos estrictos para el ingreso a EE.UU.",
    budgetUnavailable: true,
    getServices: (species) => []
  },
  asia: {
    title: "Pack Viaje a Asia",
    description: "Protocolo completo para países con requisitos de cuarentena.",
    estimatedTime: "4-6 meses antes del viaje",
    alert: "Proceso largo. Requiere titulación de anticuerpos obligatoria.",
    budgetUnavailable: true,
    getServices: (species) => []
  },
  latinoamerica: {
    title: "Pack Viaje a Latinoamérica",
    description: "Certificados de exportación para países de la región.",
    estimatedTime: "15-20 días antes",
    alert: "Puede requerir legalizaciones adicionales.",
    extraFees: [
      {
        title: "Tasas y Aranceles de Exportación",
        price: 70,
        note: "Pago directo a cuenta del cliente (Tasa Oficial). Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica."
      },
      {
        title: "Aranceles del INSAI (Aeropuertos)",
        price: 20,
        note: "Destinado a trámites de aeropuertos. Pago directo a cuenta del cliente (Tasa Oficial). Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica."
      }
    ],
    getServices: (species) => [
      { label: "Plan de vacunación", detail: "Al día según requisito país de destino", price: 100 },
      { label: "Microchips", detail: "Implantación de Microchip", price: 50 },
      { label: "Desparasitacion", detail: "Interna y Externa", price: 30 },
      { label: "Certificado zoosanitario", detail: "Emisión oficial", price: 150 }
    ]
  }
};

import { NAV_LINKS, CLINIC_INFO } from '@/lib/constants';

const contactFormSchema = z.object({
  contactName: z.string().min(2, "El nombre es obligatorio"),
  contactPhone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  contactEmail: z.string().email("Correo electrónico inválido"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type TravelResult = {
  data: TravelFormValues;
  services: ServiceItem[];
  info: DestinationData;
  total: number;
};

export default function TravelGuidance() {
  const [result, setResult] = useState<TravelResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      ownerName: "",
      petName: "",
      species: "dog", // Corrected from petSpecies
      weight: "", // Corrected from petWeight
      destination: "europa", // Corrected from ue
      birthDate: undefined, // Corrected from travelDate
      breed: "",
      color: "",
    },
  });

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  function onSubmit(values: TravelFormValues) {
    setIsLoading(true);
    setResult(null);

    // Simulación de procesamiento
    setTimeout(() => {
      const info = destinationServices[values.destination];
      const services = info.getServices(values.species);
      const extraFeesTotal = info.extraFees?.reduce((acc, f) => acc + f.price, 0) || 0;
      const total = services.reduce((acc, s) => acc + s.price, 0) + extraFeesTotal;

      setResult({ data: values, services, info, total }); // Add total to result
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

      toast({
        title: "¡Presupuesto Generado!",
        description: "Revisa los detalles a la derecha para tu viaje.",
      });
    }, 1000);
  }

  const handlePrint = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const origin = window.location.origin;
    const totalServicios = result.services.reduce((acc, s) => acc + s.price, 0);
    const extraFeesTotal = result.info.extraFees?.reduce((acc, f) => acc + f.price, 0) || 0;
    const grandTotal = totalServicios + extraFeesTotal;
    const todayStr    = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es });
    const birthStr    = format(result.data.birthDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
    const speciesLabel = result.data.species === 'dog' ? 'Perro' : 'Gato';
    const destinationLabel = result.info.title
      .replace('Presupuesto de Viaje a ', '')
      .replace('Pack Viaje a ', '');

    const servicesRows = result.services.map((s, i) => `
      <tr class="${i % 2 === 1 ? 'alt' : ''}">
        <td class="td-name">
          <span class="name-main">${s.label}</span>
          ${s.detail ? `<span class="name-sub">${s.detail}</span>` : ''}
        </td>
        <td class="td-r">USD ${s.price.toFixed(2)}</td>
        <td class="td-c dim">&mdash;</td>
        <td class="td-c">1</td>
        <td class="td-r bold">USD ${s.price.toFixed(2)}</td>
      </tr>`).join('');

    printWindow.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Presupuesto &mdash; Centro Veterinario Zo&eacute;</title>
  <style>
    /* ── PAGE SETUP ── */
    @page {
      size: letter;
      margin: 20mm 22mm;   /* margen en todos los lados */
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 10.5px;
      color: #1e293b;
      line-height: 1.6;
      background: #fff;
    }

    /* ── HEADER ── */
    .header {
      display: grid;
      grid-template-columns: 64px 1fr auto;
      align-items: center;
      gap: 14px;
      padding-bottom: 14px;
      border-bottom: 2.5px solid #0e7490;
      margin-bottom: 18px;
    }
    .header img { width: 60px; height: 60px; object-fit: contain; }
    .clinic-info .clinic-name {
      font-size: 14px; font-weight: 800; color: #0e7490; letter-spacing: -0.3px;
    }
    .clinic-info .clinic-detail {
      font-size: 8.5px; color: #64748b; margin-top: 3px; line-height: 1.5;
    }
    .clinic-info .clinic-email { color: #0e7490; }
    .doc-badge {
      text-align: right;
    }
    .doc-badge .badge-word {
      font-size: 8px; font-weight: 700; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 1.2px; display: block;
    }
    .doc-badge .badge-type {
      font-size: 15px; font-weight: 900; color: #0e7490; letter-spacing: 1px;
    }

    /* ── SECTION TITLES ── */
    .section-title {
      font-size: 8px; font-weight: 800; color: #0e7490;
      text-transform: uppercase; letter-spacing: 1px;
      border-bottom: 1.5px solid #0e7490;
      padding-bottom: 4px; margin-bottom: 10px;
    }

    /* ── INFO GRIDS ── */
    .info-strip {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 24px;
    }
    .info-row { display: flex; gap: 6px; align-items: baseline; }
    .info-lbl {
      font-size: 8px; font-weight: 700; color: #64748b;
      text-transform: uppercase; letter-spacing: 0.5px;
      min-width: 90px; flex-shrink: 0;
    }
    .info-val { font-size: 10.5px; font-weight: 600; color: #0c2340; }
    .info-row.full { grid-column: 1 / -1; }

    /* ── PET / OWNER CARDS ── */
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 18px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
    }
    .card-head {
      background: #0c2340;
      color: #fff;
      font-size: 8px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.8px;
      padding: 5px 10px;
    }
    .card-body { padding: 8px 10px; }
    .card-row { display: flex; gap: 6px; margin-bottom: 3px; }
    .card-lbl {
      font-size: 8px; color: #64748b; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.4px;
      min-width: 80px; flex-shrink: 0;
    }
    .card-val { font-size: 10px; font-weight: 600; color: #1e293b; }

    /* ── TABLE ── */
    .tbl { width: 100%; border-collapse: collapse; margin-bottom: 0; }
    .tbl thead tr { background: #0c2340; }
    .tbl thead th {
      padding: 7px 10px;
      font-size: 8px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.8px;
      color: rgba(255,255,255,0.85);
      text-align: left; white-space: nowrap;
    }
    .tbl thead th.td-r { text-align: right; }
    .tbl thead th.td-c { text-align: center; }
    .tbl tbody tr { border-bottom: 1px solid #e8edf2; }
    .tbl tbody tr.alt { background: #f8fafc; }
    .tbl tbody td { padding: 8px 10px; vertical-align: top; }
    .td-r { text-align: right; }
    .td-c { text-align: center; }
    .dim { color: #cbd5e1; }
    .bold { font-weight: 700; color: #0c2340; }
    .name-main { display: block; font-size: 10.5px; font-weight: 600; color: #1e293b; line-height: 1.3; }
    .name-sub  { display: block; font-size: 8.5px; color: #64748b; margin-top: 2px; line-height: 1.4; }

    /* ── TOTALS ── */
    .totals-wrap {
      display: flex;
      justify-content: flex-end;
      border-top: 2px solid #0e7490;
    }
    .totals-box { width: 260px; }
    .t-row {
      display: flex; justify-content: space-between;
      padding: 5px 12px;
      font-size: 10px; color: #475569;
      border-bottom: 1px solid #e8edf2;
    }
    .t-row .val { font-weight: 600; color: #1e293b; }
    .t-row.grand {
      background: #0c2340;
      border-bottom: none; border-radius: 0 0 4px 4px;
      padding: 9px 12px;
    }
    .t-row.grand .lbl { color: rgba(255,255,255,0.7); font-size: 11px; font-weight: 600; }
    .t-row.grand .val { color: #fff; font-size: 15px; font-weight: 800; }

    /* ── NOTES ── */
    .notes {
      margin-top: 20px;
      border-left: 3px solid #0e7490;
      background: #f0f9ff;
      border-radius: 0 6px 6px 0;
      padding: 10px 14px;
    }
    .notes-title {
      font-size: 8.5px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.8px;
      color: #0e7490; margin-bottom: 6px;
    }
    .notes ul { padding-left: 14px; }
    .notes li { font-size: 9px; color: #475569; margin-bottom: 4px; line-height: 1.55; }

    /* ── FOOTER ── */
    .doc-footer {
      margin-top: 18px; padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      display: flex; justify-content: space-between;
      font-size: 8px; color: #94a3b8;
    }
    .doc-footer strong { color: #0e7490; }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <img src="${origin}/logo.png" alt="ZO&Eacute;" />
    <div class="clinic-info">
      <div class="clinic-name">Centro Veterinario Zo&eacute;</div>
      <div class="clinic-detail">
        M.V. Eduardo Pe&ntilde;a Rodr&iacute;guez &nbsp;|&nbsp; +58 412&#8209;5957240<br>
        Calle Miranda Av.1, La Campi&ntilde;a, Caracas 1041<br>
        <span class="clinic-email">m.v.eduardo.pena@gmail.com</span>
      </div>
    </div>
    <div class="doc-badge">
      <span class="badge-word">Documento</span>
      <span class="badge-type">PRESUPUESTO</span>
    </div>
  </div>

  <!-- DOCUMENT INFO STRIP -->
  <div class="section-title">Informaci&oacute;n del Documento</div>
  <div class="info-strip">
    <div class="info-row">
      <span class="info-lbl">Proveedor</span>
      <span class="info-val">M.V. Eduardo Pe&ntilde;a Rodr&iacute;guez</span>
    </div>
    <div class="info-row">
      <span class="info-lbl">Fecha de emisi&oacute;n</span>
      <span class="info-val">${todayStr}</span>
    </div>
    <div class="info-row">
      <span class="info-lbl">Propietario</span>
      <span class="info-val">${result.data.ownerName.toUpperCase()}</span>
    </div>
    <div class="info-row">
      <span class="info-lbl">Destino</span>
      <span class="info-val">${destinationLabel.toUpperCase()}</span>
    </div>
    <div class="info-row full">
      <span class="info-lbl">Referencia</span>
      <span class="info-val">Permiso de viaje hacia ${destinationLabel.toUpperCase()} &mdash; Mascota: ${result.data.petName.toUpperCase()}</span>
    </div>
  </div>

  <!-- PET + OWNER CARDS -->
  <div class="section-title">Datos del Solicitante y Mascota</div>
  <div class="cards">
    <div class="card">
      <div class="card-head">&#128100; Datos del Propietario</div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-lbl">Nombre</span>
          <span class="card-val">${result.data.ownerName}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Destino</span>
          <span class="card-val">${destinationLabel}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Fecha emisi&oacute;n</span>
          <span class="card-val">${todayStr}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-head">&#128062; Datos de la Mascota</div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-lbl">Nombre</span>
          <span class="card-val">${result.data.petName}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Especie</span>
          <span class="card-val">${speciesLabel}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Raza</span>
          <span class="card-val">${result.data.breed}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Color</span>
          <span class="card-val">${result.data.color}</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Peso</span>
          <span class="card-val">${result.data.weight} kg</span>
        </div>
        <div class="card-row">
          <span class="card-lbl">Fecha de nacimiento</span>
          <span class="card-val">${birthStr}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SERVICES TABLE -->
  <div class="section-title">Detalle de Servicios</div>
  <table class="tbl">
    <thead>
      <tr>
        <th style="width:44%">Concepto</th>
        <th class="td-r" style="width:14%">Base</th>
        <th class="td-c" style="width:13%">Descuento</th>
        <th class="td-c" style="width:13%">Cantidad</th>
        <th class="td-r" style="width:16%">Monto</th>
      </tr>
    </thead>
    <tbody>${servicesRows}</tbody>
  </table>

  <!-- TOTALS -->
  <div class="totals-wrap">
    <div class="totals-box">
      <div class="t-row"><span class="lbl">Subtotal</span><span class="val">USD ${grandTotal.toFixed(2)}</span></div>
      <div class="t-row"><span class="lbl">Descuentos</span><span class="val">USD 0.00</span></div>
      <div class="t-row"><span class="lbl">Retenciones</span><span class="val">USD 0.00</span></div>
      <div class="t-row"><span class="lbl">Impuestos</span><span class="val">USD 0.00</span></div>
      <div class="t-row grand"><span class="lbl">Total a Pagar</span><span class="val">USD ${grandTotal.toFixed(2)}</span></div>
    </div>
  </div>

  <!-- NOTES -->
  <div class="notes">
    <div class="notes-title">&#9432; Condiciones y Notas Importantes</div>
    <ul>
      <li>Los pagos del laboratorio de Alemania se realizan cuando la muestra est&eacute; en el mismo laboratorio.</li>
      <li>El pago de los aranceles del INSAI se realiza 15 d&iacute;as antes del viaje.</li>
      <li>El restante de USD 540 se cancela en dos partes: el 75% en la primera etapa, y el 25% restante cuando la muestra est&eacute; en el laboratorio.</li>
    </ul>
  </div>

  <!-- FOOTER -->
  <div class="doc-footer">
    <span>Centro Veterinario Zo&eacute; &mdash; Asesor&iacute;a de Viajes Internacionales &mdash; Este presupuesto es referencial.</span>
    <span>Generado el ${todayStr} &nbsp;|&nbsp; <strong>centrovetzoe.com</strong></span>
  </div>

</body>
</html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 600);
  };



  const handleScheduleAppointment = () => {
    if (!result) return;
    // Open the contact modal instead of sending directly
    setIsContactModalOpen(true);
  };

  const submitContactForm = async (contactData: ContactFormValues, method: 'whatsapp' | 'email') => {
    if (!result) return;
    setIsSending(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const subtotalMedicos = result.services.reduce((acc, s) => acc + s.price, 0);

    // Build plain text message using standard emojis (some systems strip custom markdown emojis)
    const rawMessage = `¡Hola! Mi nombre es *${contactData.contactName}*.
Me gustaría agendar una cita para tramitar el certificado de viaje de mi mascota. A continuación, comparto los detalles de nuestro viaje:

🐾 *Datos de la Mascota*
• Nombre: ${result.data.petName}
• Especie: ${result.data.species === 'dog' ? 'Perro' : 'Gato'}
• Peso: ${result.data.weight} kg
• Fecha de Nacimiento: ${format(result.data.birthDate, 'dd/MM/yyyy')}

✈️ *Detalles del Viaje*
• Destino: ${result.info.title.replace('Presupuesto de Viaje a ', '').replace('Pack Viaje a ', '')}
• Propietario/a: ${result.data.ownerName}

📱 *Mi Información de Contacto*
• Teléfono: ${contactData.contactPhone}
• Correo: ${contactData.contactEmail}

${result.info.budgetUnavailable ? `⚠️ *Presupuesto no disponible*: Requiere consultar al médico veterinario para esta región.` : `💰 *Desglose del Presupuesto*
${result.services.map(s => `• ${s.label}: $${s.price}`).join('\n')}
${result.info.extraFees ? result.info.extraFees.map(f => `• ${f.title}: $${f.price}`).join('\n') : ''}
*Total Estimado:* $${result.total}`}

Quedo atento/a para coordinar la disponibilidad. ¡Muchas gracias!`;

    if (method === 'whatsapp') {
      const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      try {
        await fetch(`https://formsubmit.co/ajax/${CLINIC_INFO.email}`, {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: contactData.contactName,
              phone: contactData.contactPhone,
              email: contactData.contactEmail,
              subject: `Presupuesto de Viaje - ${result.data.petName} - ${contactData.contactName}`,
              message: rawMessage,
          })
        });
        toast({
          title: "Información Enviada",
          description: "Los detalles del presupuesto han sido enviados al correo de la clínica.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo enviar la información al correo. Inténtalo mediante WhatsApp.",
        });
      }
    }

    setIsSending(false);
    setIsContactModalOpen(false);
    contactForm.reset();
  };

  const subtotal = result?.services.reduce((acc, item) => acc + item.price, 0) || 0;

  return (
    <section className="section-padding bg-background min-h-screen relative overflow-x-clip">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
      <div className="hidden md:block absolute top-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">

        {/* Header - Hidden on print */}
        <ScrollReveal direction="up" className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto print:hidden">
          <div className="inline-block p-3 sm:p-4 bg-primary/10 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 group cursor-default">
            <Plane className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold font-headline text-foreground mb-4 sm:mb-6 tracking-tight">Asesoría de <span className="text-gradient">Viajes</span></h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Obtén una guía personalizada de requisitos y costos para viajar con tu mascota. Completa el formulario y nosotros nos encargamos del resto.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-start">

          {/* Form Side - Hidden on print */}
          <ScrollReveal direction="left" className="lg:col-span-5 print:hidden">
            <Card className="border border-border/30 shadow-glow-lg bg-card rounded-2xl sm:rounded-3xl">
              <CardHeader className="bg-secondary/30 pb-5 sm:pb-8">
                <CardTitle className='font-headline text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3'>
                  <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Generar Presupuesto
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Dinos a dónde vas y con quién viajas.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 sm:pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-4 sm:space-y-5 bg-secondary/20 dark:bg-secondary/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Datos del Propietario
                      </div>
                      <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre completo" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Región de Destino</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl h-12 bg-background/60">
                                  <SelectValue placeholder="Selecciona el destino" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="europa">Europa (Unión Europea)</SelectItem>
                                <SelectItem value="norteamerica">Norteamérica (EE.UU. / Canadá)</SelectItem>
                                <SelectItem value="latinoamerica">Latinoamérica</SelectItem>
                                <SelectItem value="asia">Asia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="h-px bg-border/50 my-4 sm:my-6" />

                    <div className="space-y-4 sm:space-y-5 bg-secondary/20 dark:bg-secondary/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <PawPrint className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Datos de la Mascota
                      </div>

                      <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>¿Qué mascota viaja?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6 mt-2"
                              >
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl><RadioGroupItem value="dog" /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">Perro</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl><RadioGroupItem value="cat" /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">Gato</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="petName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl><Input placeholder="Nombre de tu mascota" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="breed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Raza</FormLabel>
                              <FormControl><Input placeholder="Ej: Poodle" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl><Input placeholder="Ej: Blanco" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Peso (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="decimal"
                                  pattern="[0-9]*\.?[0-9]*"
                                  placeholder="Ej: 5"
                                  className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors"
                                  {...field}
                                  onKeyDown={(e) => {
                                    // Allow: backspace, delete, tab, escape, enter, arrows, period/comma
                                    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', '.', ','];
                                    if (allowedKeys.includes(e.key)) return;
                                    // Allow Ctrl/Cmd + A, C, V, X
                                    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
                                    // Block anything that isn't a digit
                                    if (!/^\d$/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onPaste={(e) => {
                                    const pastedText = e.clipboardData.getData('text');
                                    if (!/^\d+(\.\d*)?$/.test(pastedText)) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <CustomDatePicker
                              date={field.value}
                              setDate={field.onChange}
                              minYear={1990}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold shadow-xl shadow-primary/20 rounded-xl sm:rounded-2xl group">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Plane className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      Generar Guía de Viaje
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Results Side */}
          <ScrollReveal direction="none" delay={200} className="lg:col-span-7 space-y-6 sm:space-y-8 print:col-span-12 w-full min-w-0">
            <Card ref={resultsRef} className={cn(
              "w-full min-w-0 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] border-2 border-dashed border-primary/20 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl transition-all duration-500 relative flex flex-col",
              result && "border-solid border-border/30 shadow-glow-lg",
              "print:border-none print:bg-white print:min-h-0"
            )}>
              {!isLoading && !result && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 print:hidden">
                  <div className="bg-primary/5 p-5 sm:p-6 md:p-8 rounded-full mb-4 sm:mb-6">
                    <Banknote className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-primary/30" />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground mb-2 sm:mb-3">Tu Guía de Viaje</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Completa el formulario para generar un presupuesto detallado y los requisitos sanitarios específicos.</p>
                  </div>
                </div>
              )}

              <CardContent className={cn('p-0', !result && 'invisible')}>
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 z-20 backdrop-blur-sm print:hidden">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-primary font-bold animate-pulse text-xl">Preparando tu presupuesto...</p>
                  </div>
                )}

                {result && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 w-full min-w-0">
                    {/* Visual Header */}
                    <div className="bg-gradient-to-r from-primary via-[#2aaadd] to-primary bg-[length:200%_100%] animate-gradient-shift p-3 sm:p-7 md:p-10 rounded-t-2xl sm:rounded-t-[2rem] text-primary-foreground print:bg-white print:text-black print:border-b-4 print:border-black print:p-0 w-full min-w-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 print:mb-4 gap-3">
                        <div>
                          <h1 className="hidden print:block text-4xl font-black uppercase mb-2">CENTRO VETERINARIO ZOÉ</h1>
                          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-headline mb-1.5 sm:mb-2 text-balance leading-tight'>{result.info.title}</h2>
                          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg print:text-gray-600 text-pretty">{result.info.description}</p>
                        </div>
                        <div className="hidden md:block bg-white/10 p-4 rounded-2xl backdrop-blur-md shrink-0 print:hidden">
                          <FileText className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 bg-white/10 p-2.5 sm:p-4 md:p-6 rounded-lg sm:rounded-2xl backdrop-blur-md border border-white/20 print:bg-gray-50 print:border-gray-300 print:text-black">
                        <div className="min-w-0">
                          <p className="text-white/60 text-[9px] sm:text-xs uppercase font-bold mb-0.5 print:text-gray-500">Mascota</p>
                          <p className="font-bold text-sm sm:text-base truncate">{result.data.petName} · {result.data.breed}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white/60 text-[9px] sm:text-xs uppercase font-bold mb-0.5 print:text-gray-500">Propietario</p>
                          <p className="font-bold text-sm sm:text-base truncate">{result.data.ownerName}</p>
                        </div>
                        <div className="sm:col-span-2 min-w-0">
                          <p className="text-white/60 text-[9px] sm:text-xs uppercase font-bold mb-0.5 print:text-gray-500">Inicio de Trámite</p>
                          <p className="font-bold text-sm sm:text-base md:text-lg">{result.info.estimatedTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-6 md:p-8 lg:p-12 space-y-4 sm:space-y-8 md:space-y-10 print:p-0 print:mt-8 w-full min-w-0">
                      {result.info.budgetUnavailable ? (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center">
                          <Info className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-4" />
                          <h3 className="font-bold text-lg sm:text-2xl text-foreground mb-2">Presupuesto no disponible en línea</h3>
                          <p className="text-muted-foreground text-sm sm:text-base max-w-md">Para organizar un viaje hacia esta región, por favor agenda una cita y consulta directamente con el Médico Veterinario los pasos a seguir y costos asociados.</p>
                        </div>
                      ) : (
                        <>
                          {/* Services List */}
                          <div className="space-y-3 sm:space-y-6 w-full min-w-0">
                            <h3 className='font-bold text-base sm:text-xl md:text-2xl flex items-center gap-2 text-foreground'>
                              <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-primary shrink-0" />
                              Desglose de Servicios
                            </h3>
                            <div className="rounded-xl sm:rounded-3xl border border-border/50 overflow-hidden w-full min-w-0 bg-card shadow-sm print:border-gray-300 print:shadow-none">
                              <div className="divide-y divide-border print:divide-gray-200">
                                {result.services.map((service, i) => (
                                  <div key={i} className="px-3 py-2.5 sm:p-5 md:p-6 flex justify-between items-center gap-2 hover:bg-secondary/20 transition-colors">
                                    <div className="min-w-0 flex-1">
                                      <p className="font-bold text-[13px] sm:text-base md:text-lg text-foreground">{service.label}</p>
                                      <p className="text-[10px] sm:text-sm text-muted-foreground truncate">{service.detail}</p>
                                    </div>
                                    <p className="font-bold text-[13px] sm:text-lg md:text-xl text-primary print:text-black shrink-0 tabular-nums">${service.price}</p>
                                  </div>
                                ))}
                                <div className="px-3 py-2.5 sm:p-5 md:p-6 bg-secondary/30 flex justify-between items-center print:bg-gray-100 gap-2">
                                  <p className="font-extrabold text-[13px] sm:text-lg md:text-xl">Total Servicios</p>
                                  <p className="font-black text-base sm:text-2xl md:text-3xl text-primary print:text-black shrink-0 tabular-nums">${result.services.reduce((acc, s) => acc + s.price, 0)}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Extra Fees */}
                          {result.info.extraFees && result.info.extraFees.length > 0 && (
                            <div className="space-y-3 sm:space-y-4 w-full min-w-0">
                              {result.info.extraFees.map((fee, i) => (
                                <div key={i} className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl sm:rounded-3xl p-2.5 sm:p-6 md:p-8 print:bg-white print:border-gray-200 w-full min-w-0">
                                  <div className="flex flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2">
                                    <h4 className="font-bold text-amber-900 dark:text-amber-300 text-[13px] sm:text-lg md:text-xl flex items-start sm:items-center gap-1 sm:gap-2">
                                      <Info className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600 print:hidden shrink-0 mt-0.5 sm:mt-0" />
                                      <span className="text-balance leading-tight">{fee.title}</span>
                                    </h4>
                                    <p className="font-black text-[15px] sm:text-2xl text-amber-900 dark:text-amber-300 shrink-0 tabular-nums">${fee.price}</p>
                                  </div>
                                  <p className="text-amber-800/80 dark:text-amber-400/80 leading-relaxed text-xs sm:text-base">
                                    {fee.note}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Total Breakdown */}
                          <div className="rounded-xl sm:rounded-3xl border border-border/50 overflow-hidden bg-card shadow-sm print:border-gray-300 print:shadow-none p-2.5 sm:p-5 md:p-6 w-full min-w-0">
                            <h3 className='font-bold text-base sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3 text-foreground mb-4'>
                              <Banknote className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                              Resumen
                            </h3>
                            <div className="flex justify-between items-center gap-2 text-[10px] sm:text-sm mb-2 text-muted-foreground w-full">
                              <span className="text-balance break-words">Servicios Clínica:</span>
                              <span className="font-semibold shrink-0 tabular-nums">${result.services.reduce((acc, s) => acc + s.price, 0)}</span>
                            </div>
                            {result.info.extraFees && result.info.extraFees.length > 0 && (
                              result.info.extraFees.map((fee, idx) => (
                                <div key={idx} className="flex justify-between items-center gap-2 text-[10px] sm:text-sm mb-3 sm:mb-4 text-muted-foreground pb-3 sm:pb-4 border-b border-border/10 w-full">
                                  <span className="text-balance break-words">{fee.title}:</span>
                                  <span className="font-semibold shrink-0 tabular-nums">${fee.price}</span>
                                </div>
                              ))
                            )}
                            <div className="flex justify-between items-center gap-2 font-bold text-sm sm:text-base md:text-xl text-primary w-full mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/10">
                              <span>Total:</span>
                              <span className="text-secondary dark:text-secondary-foreground glow-text shrink-0 tabular-nums">${result.total}</span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Final CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6 md:pt-8 border-t border-border print:hidden">
                        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              className='flex-grow min-h-[3rem] h-auto py-3 sm:py-4 md:py-5 px-4 text-sm sm:text-base md:text-xl font-bold shadow-2xl rounded-xl sm:rounded-2xl transition-transform active:scale-95 whitespace-normal break-words text-balance'
                              onClick={handleScheduleAppointment}
                            >
                              {result.info.budgetUnavailable ? "Agendar Cita y Consultar Presupuesto" : "Agendar Cita y Enviar Presupuesto"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-card border-border/50">
                            <DialogHeader>
                              <DialogTitle className="text-xl sm:text-2xl font-headline flex items-center gap-2">
                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                Datos de Contacto
                              </DialogTitle>
                              <DialogDescription>
                                Déjanos tus datos para coordinar la cita y enviarte la información.
                              </DialogDescription>
                            </DialogHeader>

                            <Form {...contactForm}>
                              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 py-4">
                                <FormField
                                  control={contactForm.control}
                                  name="contactName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nombre y Apellido</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Tu nombre" {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contactForm.control}
                                  name="contactPhone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Teléfono / WhatsApp</FormLabel>
                                      <FormControl>
                                        <Input placeholder="+58 412..." {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contactForm.control}
                                  name="contactEmail"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Correo Electrónico</FormLabel>
                                      <FormControl>
                                        <Input placeholder="tu@email.com" {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <DialogFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-4 w-full">
                                  <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)} className="w-full h-11 sm:h-auto whitespace-normal">
                                    Cancelar
                                  </Button>
                                  <Button 
                                    type="button" 
                                    disabled={isSending} 
                                    onClick={contactForm.handleSubmit((data) => submitContactForm(data, 'email'))}
                                    className="bg-slate-800 hover:bg-slate-700 text-white w-full h-11 sm:h-auto whitespace-normal px-2"
                                  >
                                    {isSending ? (
                                      <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin shrink-0" />
                                    ) : (
                                      <Mail className="mr-1.5 sm:mr-2 h-4 w-4 shrink-0" />
                                    )}
                                    <span className="truncate">Mensaje</span>
                                  </Button>
                                  <Button 
                                    type="button" 
                                    disabled={isSending} 
                                    onClick={contactForm.handleSubmit((data) => submitContactForm(data, 'whatsapp'))}
                                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full h-11 sm:h-auto whitespace-normal px-2"
                                  >
                                    {isSending ? (
                                      <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin shrink-0" />
                                    ) : (
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="mr-1.5 sm:mr-2 h-4 w-4 brightness-0 invert shrink-0" />
                                    )}
                                    <span className="truncate">WhatsApp</span>
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 hover:bg-secondary transition-colors" onClick={handlePrint} title="Imprimir o Guardar PDF">
                          <Printer className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                        </Button>
                      </div>

                      <div className="text-center pt-5 sm:pt-6 md:pt-8 border-t border-border/50">
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1.5 sm:mb-2">Presupuesto Referencial • Generado el {format(new Date(), "d 'de' MMMM, yyyy", { locale: es })}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                          Este documento es una estimación. Los precios finales pueden variar según el peso exacto de la mascota, su estado de salud previo y cambios en regulaciones internacionales.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      {/* Print styles removed — printing now handled via dedicated print window in handlePrint */}
    </section>
  );
}
