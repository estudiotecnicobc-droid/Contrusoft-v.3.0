import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { ObraFormValues, obraSchema, obraFormFields } from "../schemas";
import { ArrowUpDown, Pencil } from "lucide-react";
import { ResourceModal } from "../../configuracion/components/ResourceModal";
import { DeleteResourceButton } from "../../configuracion/components/DeleteResourceButton";
import { Button } from "../../../../components/ui/button";

export type Obra = ObraFormValues & { 
  id: string; 
  createdAt: string;
};

interface ObrasColumnsProps {
  onUpdate: (data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const getColumns = ({ onUpdate, onDelete }: ObrasColumnsProps): ColumnDef<Obra>[] => [
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("code")}</span>
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <button
            className="flex items-center hover:text-foreground font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        )
    },
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
       const status = row.getValue("status") as string;
       const colors: Record<string, string> = {
         DRAFT: "bg-slate-100 text-slate-700",
         IN_PROGRESS: "bg-blue-100 text-blue-700",
         COMPLETED: "bg-green-100 text-green-700",
         SUSPENDED: "bg-red-100 text-red-700"
       };
       const labels: Record<string, string> = {
         DRAFT: "Borrador",
         IN_PROGRESS: "En Progreso",
         COMPLETED: "Completado",
         SUSPENDED: "Suspendido"
       };
       return (
         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100"}`}>
           {labels[status] || status}
         </span>
       )
    }
  },
  {
    accessorKey: "startDate",
    header: "Inicio",
    cell: ({ row }) => {
      const date = row.getValue("startDate");
      if (!date) return "-";
      return new Date(date as string).toLocaleDateString();
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const obra = row.original;
      return (
        <div className="flex items-center gap-1 justify-end">
            <ResourceModal
              title="Editar Obra"
              description="Modifica los detalles del proyecto."
              trigger={
                <Button variant="ghost" size="icon" title="Editar">
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
              }
              formSchema={obraSchema}
              formFields={obraFormFields}
              initialData={obra}
              onSubmitCustom={onUpdate}
            />
            
            <DeleteResourceButton 
              resourceId={obra.id}
              resourceLabel={obra.name}
              onDeleteCustom={onDelete}
              iconOnly
            />
        </div>
      )
    },
  },
];