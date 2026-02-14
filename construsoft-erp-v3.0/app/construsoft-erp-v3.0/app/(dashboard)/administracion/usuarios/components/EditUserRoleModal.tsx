'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { editUserRoleSchema } from '../schemas';
import { UserWithRole, Role } from './usuarios-columns';
import { Button } from '../../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

interface EditUserRoleModalProps {
  user: UserWithRole;
}

// Mock Roles for Demo
const MOCK_ROLES: Role[] = [
    { id: 'role-1', name: 'Administrador' },
    { id: 'role-2', name: 'Ingeniero' },
    { id: 'role-3', name: 'Residente' },
    { id: 'role-4', name: 'Usuario' },
];

export function EditUserRoleModal({ user }: EditUserRoleModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);

  const form = useForm({
    resolver: zodResolver(editUserRoleSchema),
    defaultValues: { roleId: user.roleId || "" },
  });

  async function onSubmit(values: { roleId: string }) {
    // Simulation of API Call
    console.log("Updating role for", user.id, values);
    // const response = await fetch(`/api/admin/users/${user.id}`, ...);
    
    // Simulate success
    setTimeout(() => {
        setOpen(false);
        router.refresh();
        alert("Rol actualizado correctamente (Simulación)");
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Editar Rol</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol para {user.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol Asignado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Seleccionar un rol" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Guardando..." : "Guardar Rol"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}