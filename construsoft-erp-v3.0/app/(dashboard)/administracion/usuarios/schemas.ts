import { z } from 'zod';

export const inviteUserSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Debe ser un email válido." }),
});

export const inviteUserFormFields = [
  { name: 'name', label: 'Nombre Completo', placeholder: 'Ej: Juan Pérez' },
  { name: 'email', label: 'Email de Invitación', placeholder: 'ej: juan.perez@empresa.com', type: 'email' },
];

export const editUserRoleSchema = z.object({
    roleId: z.string().min(1, { message: "Debe seleccionar un rol válido." }),
});

export const editUserRoleFormFields = [
    { name: 'roleId', label: 'Rol del Usuario', type: 'select' },
];