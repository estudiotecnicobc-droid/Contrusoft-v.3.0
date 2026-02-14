'use client';
import React from 'react';
import { UserWithRole } from "./usuarios-columns";
import { EditUserRoleModal } from "./EditUserRoleModal";
import { DeleteResourceButton } from "../../../configuracion/components/DeleteResourceButton";

interface UserActionsProps {
  user: UserWithRole;
}

export function UserActions({ user }: UserActionsProps) {
  return (
    <div className="flex items-center space-x-2 justify-end">
      <EditUserRoleModal user={user} />
      <DeleteResourceButton
        apiUrl="/api/admin/users"
        resourceId={user.id}
        resourceLabel={user.name || user.email || ''}
        iconOnly
      />
    </div>
  );
}