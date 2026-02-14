'use client';
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../components/data-table-column-header";
import { UserActions } from "./user-actions";

// Mock types since we cannot access Prisma generated types in client directly
export type Role = { id: string; name: string };
export type UserWithRole = { 
  id: string; 
  name: string | null; 
  email: string; 
  roleId: string | null; 
  role?: Role | null 
};

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role.name",
    header: "Rol Asignado",
    cell: ({ row }) => {
      const roleName = row.original.role?.name;
      return roleName ? (
        <span className="px-2 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full">
          {roleName}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">Sin rol</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
    enableHiding: false,
  },
];