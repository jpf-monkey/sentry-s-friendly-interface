export type TrayStatus = "ok" | "error" | "unknown";

export type Tray = {
  label: string;
  value: string;
  status: TrayStatus;
  fill: string;
};

export type TraceRow = {
  time: string;
  event: string;
  state: "Success" | "Failed" | "Reintento";
  code: string;
};

export type Report = {
  id: string;
  verdict: string;
  summary: string;
  badge: string;
  trays: Tray[];
  trace: TraceRow[];
  sources: string[];
};

export type Investigation = {
  id: string;
  title: string;
  question: string;
  country: string;
  status: TrayStatus;
  when: string;
  report: Report;
};

export const countries = ["Paraguay", "Chile", "México", "Colombia", "Costa Rica", "Guatemala"];

export const investigations: Investigation[] = [
  {
    id: "PY-5385",
    title: "Rechazo DTE 006-42",
    question:
      "¿Por qué fue rechazada la factura 006-42 (documento 5385f0fe) si xPOS la envió correctamente?",
    country: "Paraguay",
    status: "error",
    when: "Hace 12 min · PRD",
    report: {
      id: "5385f0fe · factura 006-42",
      verdict: "El rechazo no se originó en xPOS",
      summary:
        "El DTE se armó y firmó correctamente antes del envío: Signature, X509Certificate y DigestValue son válidos. SIFEN rechazó el lote completo con código 0301 (lote no encolado para procesamiento) y xPOS reintentó 10 veces entre 19:02 y 19:49 sin éxito.",
      badge: "Rechazado por SIFEN",
      trays: [
        { label: "Firma y armado", value: "Correcto · xPOS", status: "ok", fill: "w-full" },
        { label: "Lote enviado", value: "Rechazado · code 0301", status: "error", fill: "w-2/3" },
        { label: "Visibilidad capa SDTA", value: "Sin datos · escalar", status: "unknown", fill: "w-0" },
      ],
      trace: [
        { time: "19:02:02", event: "Autorización del DE por enviar (asíncrono)", state: "Success", code: "200" },
        { time: "19:02:14", event: "Lote no encolado para procesamiento", state: "Failed", code: "0301" },
        { time: "19:08:44", event: "Reintento automático (mismo mensaje)", state: "Reintento", code: "0301" },
        { time: "19:24:05", event: "Reintento automático (mismo mensaje)", state: "Reintento", code: "0301" },
        { time: "19:49:46", event: "Último reintento, sin cambio de respuesta", state: "Failed", code: "0301" },
      ],
      sources: ["Cosmos", "realm b1f3992d", "IoT device log"],
    },
  },
  {
    id: "CL-9023",
    title: "Consulta SIFEN pendiente",
    question: "¿Quedó algún documento sin acuse del receptor esta semana?",
    country: "Chile",
    status: "unknown",
    when: "Ayer · SBX",
    report: {
      id: "lote CL-9023",
      verdict: "Dos documentos siguen sin acuse del receptor",
      summary:
        "El envío al SII fue aceptado y firmado sin observaciones. Falta únicamente el acuse de recibo del receptor, por lo que el estado permanece en espera y no corresponde reenviar.",
      badge: "En espera",
      trays: [
        { label: "Firma y armado", value: "Correcto · xPOS", status: "ok", fill: "w-full" },
        { label: "Envío al SII", value: "Aceptado · 200", status: "ok", fill: "w-full" },
        { label: "Acuse receptor", value: "Pendiente", status: "unknown", fill: "w-1/3" },
      ],
      trace: [
        { time: "11:04:10", event: "Generación de XML", state: "Success", code: "200" },
        { time: "11:04:21", event: "Firma electrónica", state: "Success", code: "0" },
        { time: "11:05:02", event: "Recepción SII", state: "Success", code: "0300" },
      ],
      sources: ["Log de transmisión", "Metadata SII"],
    },
  },
  {
    id: "CO-4471",
    title: "Error de firma XML",
    question: "Revisar el error de firma reportado por el emisor 900.412",
    country: "Colombia",
    status: "error",
    when: "Hace 2 días · PRD",
    report: {
      id: "emisor 900.412 · lote 4471",
      verdict: "El certificado del emisor expiró antes del envío",
      summary:
        "El armado del documento es correcto, pero la firma se generó con un certificado vencido el día anterior. La DIAN rechazó el lote en validación previa; se requiere renovar el certificado y reenviar.",
      badge: "Acción requerida",
      trays: [
        { label: "Armado del documento", value: "Correcto · xPOS", status: "ok", fill: "w-full" },
        { label: "Certificado de firma", value: "Expirado", status: "error", fill: "w-1/2" },
        { label: "Validación DIAN", value: "Rechazado", status: "error", fill: "w-2/3" },
      ],
      trace: [
        { time: "08:12:44", event: "Generación de XML", state: "Success", code: "200" },
        { time: "08:12:59", event: "Firma electrónica con certificado vencido", state: "Failed", code: "CERT-04" },
        { time: "08:13:20", event: "Validación previa DIAN", state: "Failed", code: "FAJ23" },
      ],
      sources: ["Cosmos", "Bóveda de certificados"],
    },
  },
];