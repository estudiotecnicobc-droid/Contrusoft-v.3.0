import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Database, 
  Users, 
  Settings, 
  Building2 
} from 'lucide-react';
import { useRoute } from '../../providers';
import { cn } from '../../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Obras', icon: Briefcase, path: '/obras' },
  { label: 'Presupuestos', icon: FileText, path: '/presupuestos' },
  { label: 'Base de Datos', icon: Database, path: '/base-datos' },
  { label: 'Usuarios', icon: Users, path: '/usuarios' },
  { label: 'Configuración', icon: Settings, path: '/configuracion' },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const { path, navigate } = useRoute();

  return (
    <aside 
      className={cn(
        "border-r bg-card transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      <div className="p-6 border-b flex items-center gap-2 min-w-max">
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight">Construsoft</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-max">
          Plataforma
        </div>
        
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium min-w-max",
              path.startsWith(item.path)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t bg-muted/20 min-w-max">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Juan Pérez</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}