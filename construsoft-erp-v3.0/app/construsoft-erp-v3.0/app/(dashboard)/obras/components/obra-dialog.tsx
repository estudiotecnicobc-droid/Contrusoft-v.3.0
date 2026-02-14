import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { obraSchema, ObraFormValues } from '../schemas';
import { Obra } from './obras-columns';
import { DatePicker } from '../../../../components/ui/date-picker';

interface ObraDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ObraFormValues) => void;
  initialData?: Obra | null;
}

export default function ObraDialog({ isOpen, onClose, onSubmit, initialData }: ObraDialogProps) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ObraFormValues>({
    resolver: zodResolver(obraSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      location: '',
      status: 'DRAFT',
      startDate: undefined,
      endDate: undefined
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          ...initialData,
          startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
          endDate: initialData.endDate ? new Date(initialData.endDate) : undefined
        });
      } else {
        reset({
          code: '',
          name: '',
          description: '',
          location: '',
          status: 'DRAFT',
          startDate: undefined,
          endDate: undefined
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData ? 'Editar Obra' : 'Nueva Obra'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Código</label>
              <input
                {...register('code')}
                className="w-full h-9 px-3 rounded-md border bg-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="PRO-2024-001"
              />
              {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <select
                {...register('status')}
                className="w-full h-9 px-3 rounded-md border bg-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="DRAFT">Borrador</option>
                <option value="IN_PROGRESS">En Progreso</option>
                <option value="COMPLETED">Completado</option>
                <option value="SUSPENDED">Suspendido</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre del Proyecto</label>
            <input
              {...register('name')}
              className="w-full h-9 px-3 rounded-md border bg-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Construcción Edificio Central"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ubicación</label>
            <input
              {...register('location')}
              className="w-full h-9 px-3 rounded-md border bg-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Ciudad de México"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha Inicio</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker 
                    date={field.value} 
                    setDate={field.onChange} 
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha Fin</label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker 
                    date={field.value} 
                    setDate={field.onChange} 
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full p-3 rounded-md border bg-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              placeholder="Detalles adicionales del proyecto..."
            />
          </div>

          <div className="flex justify-end pt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {initialData ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}