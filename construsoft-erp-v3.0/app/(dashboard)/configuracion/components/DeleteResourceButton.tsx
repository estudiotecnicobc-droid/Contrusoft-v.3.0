'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteResourceButtonProps {
  apiUrl?: string;
  resourceId: string;
  resourceLabel: string;
  onDeleteCustom?: (id: string) => Promise<void>;
  iconOnly?: boolean;
}

export function DeleteResourceButton({ apiUrl, resourceId, resourceLabel, onDeleteCustom, iconOnly = false }: DeleteResourceButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${resourceLabel}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      if (onDeleteCustom) {
        await onDeleteCustom(resourceId);
      } else if (apiUrl) {
        const response = await fetch(`${apiUrl}/${resourceId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudo eliminar el recurso.');
        }
        router.refresh();
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (iconOnly) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        title="Eliminar"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </Button>
  );
}