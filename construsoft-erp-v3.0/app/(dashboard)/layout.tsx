// Ruta: /app/(dashboard)/layout.tsx

import { Header } from "@/components/Header"; // Asumiendo que moviste los componentes a la raíz
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Este layout ahora solo se encarga de la estructura visual.
  // La protección de rutas se hará en cada página o con un middleware.
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:pl-64">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
