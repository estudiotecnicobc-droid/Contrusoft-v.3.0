'use client';
import React, { useState } from 'react';
import { DataTable } from "../../../../components/data-table";
import { columns, UserWithRole } from "./components/usuarios-columns";
import { ResourceModal } from "../../configuracion/components/ResourceModal";
import { inviteUserSchema, inviteUserFormFields } from "./schemas";
import { Button } from "../../../../components/ui/button";

// Mock Initial Data for Client-Side Demo
const INITIAL_USERS: UserWithRole[] = [
  { 
    id: '1', 
    name: 'Juan Pérez', 
    email: 'admin@construsoft.com', 
    roleId: 'role-1', 
    role: { id: 'role-1', name: 'Administrador' }
  },
  { 
    id: '2', 
    name: 'Ana López', 
    email: 'ana.lopez@construsoft.com', 
    roleId: 'role-2', 
    role: { id: 'role-2', name: 'Ingeniero' }
  },
  { 
    id: '3', 
    name: 'Carlos Ruiz', 
    email: 'carlos.ruiz@construsoft.com', 
    roleId: null, 
    role: null
  }
];

export default function GestionUsuariosPage() {
  const [users, setUsers] = useState<UserWithRole[]>(INITIAL_USERS);

  const handleInvite = async (values: any) => {
    // Mock invite simulation
    const newUser: UserWithRole = {
        id: Math.random().toString(36).substr(2, 9),
        name: values.name,
        email: values.email,
        roleId: null,
        role: null
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="container mx-auto py-10 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-1">
            Administra los miembros del equipo y sus permisos.
          </p>
        </div>
        <ResourceModal
          formSchema={inviteUserSchema}
          formFields={inviteUserFormFields}
          trigger={<Button>Invitar Nuevo Usuario</Button>}
          title="Invitar Nuevo Usuario"
          description="El usuario recibirá una notificación para unirse a tu equipo."
          onSubmitCustom={handleInvite}
        />
      </div>
      <div className="flex-1 bg-card rounded-lg border shadow-sm p-2 overflow-hidden flex flex-col">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}