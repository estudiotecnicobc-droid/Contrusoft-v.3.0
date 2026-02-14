import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, X, FileText, Users, Briefcase } from 'lucide-react';
import { useRoute } from '../../providers';

// Mock Search Data
const MOCK_DATABASE = [
  { id: '1', title: 'Torre Residencial Altos', type: 'Project', category: 'Obras', url: '/obras', icon: Briefcase },
  { id: '2', title: 'Ampliación Planta Norte', type: 'Project', category: 'Obras', url: '/obras', icon: Briefcase },
  { id: '3', title: 'Juan Pérez', type: 'User', category: 'Usuarios', url: '/usuarios', icon: Users },
  { id: '4', title: 'Ana López', type: 'User', category: 'Usuarios', url: '/usuarios', icon: Users },
  { id: '5', title: 'Presupuesto 2024-Q1', type: 'Budget', category: 'Presupuestos', url: '/presupuestos', icon: FileText },
  { id: '6', title: 'Edificio Central', type: 'Project', category: 'Obras', url: '/obras', icon: Briefcase },
  { id: '7', title: 'Carlos Ruiz', type: 'User', category: 'Usuarios', url: '/usuarios', icon: Users },
];

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { navigate } = useRoute();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof MOCK_DATABASE>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = MOCK_DATABASE.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase()) || 
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (url: string) => {
    navigate(url);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-accent rounded-md text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Search Component */}
        <div ref={wrapperRef} className="relative hidden md:block w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              value={query}
              onChange={handleSearch}
              onFocus={() => query.length > 0 && setIsOpen(true)}
              placeholder="Buscar proyectos, usuarios..." 
              className="w-full h-9 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {query.length > 0 && (
              <button 
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="absolute right-2 top-2.5 hover:text-foreground text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isOpen && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-md shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95">
              <div className="py-2">
                <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                  Resultados
                </div>
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result.url)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-3 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <result.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{result.title}</p>
                      <p className="text-xs text-muted-foreground">{result.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
           {isOpen && query.length > 0 && results.length === 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-md shadow-lg p-4 text-center z-50">
               <p className="text-sm text-muted-foreground">No se encontraron resultados para "{query}"</p>
             </div>
           )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-accent rounded-full relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border border-card" />
        </button>
      </div>
    </header>
  );
}