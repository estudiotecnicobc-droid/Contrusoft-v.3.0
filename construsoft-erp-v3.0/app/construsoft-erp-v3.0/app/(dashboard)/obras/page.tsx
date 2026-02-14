'use client';

import React, { useState } from 'react';
import { Plus, HardHat } from 'lucide-react';
import { DataTable } from '../../../components/data-table';
import { getColumns, Obra } from './components/obras-columns';
import { ResourceModal } from '../configuracion/components/ResourceModal';
import { Button } from '../../../components/ui/button';
import { obraSchema, obraFormFields } from './schemas';

// Mock data initialization
// Changed to empty array to demonstrate Empty State, uncomment to see data
const INITIAL_DATA: Obra[] = [
  // {
  //   id: '1',
  //   code: 'PRO-2024-001',
  //   name: 'Torre Residencial Altos',
  //   description: 'Edificio de 20 pisos zona norte',
  //   location: 'Monterrey, NL',
  //   status: 'IN_PROGRESS',
  //   startDate: new Date('2024-01-15') as any,
  //   endDate: new Date('2025-06-30') as any,
  //   createdAt: new Date().toISOString()
  // }
];

export default function ObrasPage() {
  const [data, setData] = useState<Obra[]>(INITIAL_DATA);

  // Handlers for simulating API operations locally
  const handleCreate = async (values: any) => {
    const newObra: Obra = {
      ...values,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setData([newObra, ...data]);
  };

  const handleUpdate = async (values: any) => {
    const updatedData = data.map(item => 
      item.id === values.id 
        ? { ...item, ...values }
        : item
    );
    setData(updatedData);
  };

  const handleDelete = async (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  const columns = getColumns({
    onUpdate: handleUpdate,
    onDelete: handleDelete
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Obras</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tus obras y proyectos de construcción.
          </p>
        </div>
        
        {data.length > 0 && (
          <ResourceModal
            title="Nuevo Proyecto"
            description="Ingresa los datos para registrar una nueva obra."
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Proyecto
              </Button>
            }
            formSchema={obraSchema}
            formFields={obraFormFields}
            onSubmitCustom={handleCreate}
          />
        )}
      </div>

      <div className="flex-1 bg-card rounded-lg border shadow-sm p-2 overflow-hidden flex flex-col">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in zoom-in duration-300">
              <div className="bg-muted/50 p-6 rounded-full mb-4">
                <HardHat className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Aún no tienes obras cargadas</h2>
              <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                Comienza creando tu primera obra para poder asignarle presupuestos y certificaciones.
              </p>
              <ResourceModal
                  title="Crear Nueva Obra"
                  description="Completa los detalles para registrar una nueva obra en tu tenant."
                  trigger={<Button size="lg">Crea tu primera Obra</Button>}
                  formSchema={obraSchema}
                  formFields={obraFormFields}
                  onSubmitCustom={handleCreate}
              />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={data} 
          />
        )}
      </div>
    </div>
  );
}