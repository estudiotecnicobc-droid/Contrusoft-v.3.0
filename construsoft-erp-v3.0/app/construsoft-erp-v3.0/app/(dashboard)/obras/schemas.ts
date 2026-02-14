import { z } from "zod";

export const obraSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  status: z.enum(["DRAFT", "IN_PROGRESS", "COMPLETED", "SUSPENDED"]).default("DRAFT"),
});

export type ObraFormValues = z.infer<typeof obraSchema>;

export const obraFormFields = [
  { name: 'code', label: 'Código', placeholder: 'PRO-2024-001' },
  { name: 'name', label: 'Nombre del Proyecto', placeholder: 'Construcción Edificio...' },
  { 
    name: 'status', 
    label: 'Estado', 
    type: 'select', 
    options: [
      { label: 'Borrador', value: 'DRAFT' },
      { label: 'En Progreso', value: 'IN_PROGRESS' },
      { label: 'Completado', value: 'COMPLETED' },
      { label: 'Suspendido', value: 'SUSPENDED' }
    ]
  },
  { name: 'location', label: 'Ubicación', placeholder: 'Ciudad...' },
  { name: 'startDate', label: 'Fecha Inicio', type: 'date' },
  { name: 'endDate', label: 'Fecha Fin', type: 'date' },
  { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Detalles...' },
];