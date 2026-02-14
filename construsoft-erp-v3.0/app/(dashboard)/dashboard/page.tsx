'use client';

import React from 'react';
import { KpiCard } from '../components/KpiCard';
import { Building, ClipboardCheck, DollarSign, AlertTriangle, LucideIcon } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '../../../lib/utils';

const iconMap: { [key: string]: LucideIcon } = {
  Building,
  ClipboardCheck,
  DollarSign,
  AlertTriangle,
};

interface ApiKpi {
  title: string;
  value: string;
  icon: string;
  description?: string;
  isLoading?: boolean;
}

export default function DashboardPage() {
  const { data: kpiData, error, isLoading } = useSWR<ApiKpi[]>('/api/dashboard/kpis', fetcher, {
    refreshInterval: 60000, // Actualiza cada minuto
  });

  if (error) return <div className="p-8 text-red-500">Error al cargar los datos del dashboard.</div>;

  const dataToDisplay: any[] = isLoading || !kpiData
    ? Array(4).fill({ isLoading: true })
    : kpiData;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard General</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dataToDisplay.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title || ''}
            value={kpi.value || ''}
            icon={iconMap[kpi.icon] || AlertTriangle}
            description={kpi.description}
            isLoading={kpi.isLoading}
          />
        ))}
      </div>
      <div className="mt-8 p-6 border-dashed border-2 rounded-lg text-center">
        <h2 className="text-xl font-semibold">Próximamente</h2>
        <p className="text-muted-foreground mt-2">Aquí se mostrarán gráficos de avance de obra, flujo de costos y más analíticas.</p>
      </div>
    </div>
  );
}