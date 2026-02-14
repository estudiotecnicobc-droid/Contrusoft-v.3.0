import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useRoute } from '../../providers';

export default function Breadcrumbs() {
  const { path } = useRoute();
  const segments = path.split('/').filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      <div className="flex items-center hover:text-foreground transition-colors cursor-pointer">
        <Home className="h-4 w-4 mr-1" />
        <span>Inicio</span>
      </div>
      {segments.map((segment, index) => (
        <React.Fragment key={segment}>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="capitalize font-medium text-foreground">
            {segment.replace(/-/g, ' ')}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
