"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { SectionCard } from "@/components/ui/section-card"
import { DataTable } from "@/components/ui/data-table"

interface Contribution {
    id: string
    house: string
    month: string
    amount: number
    status: "Pagado" | "Pendiente" | "Vencido"
}

const mockContributions: Contribution[] = [
    {
        id: "1",
        house: "A-101",
        month: "Diciembre 2025",
        amount: 1500,
        status: "Pagado",
    },
    {
        id: "2",
        house: "A-102",
        month: "Diciembre 2025",
        amount: 1500,
        status: "Pendiente",
    },
    {
        id: "3",
        house: "A-103",
        month: "Noviembre 2025",
        amount: 1500,
        status: "Vencido",
    },
    {
        id: "4",
        house: "B-201",
        month: "Diciembre 2025",
        amount: 1500,
        status: "Pagado",
    },
]

const statusColors: Record<Contribution["status"], string> = {
    Pagado: "text-green-600 bg-green-50 border-green-200",
    Pendiente: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Vencido: "text-red-600 bg-red-50 border-red-200",
}

const columns: ColumnDef<Contribution>[] = [
    {
        accessorKey: "house",
        header: "Casa",
    },
    {
        accessorKey: "month",
        header: "Mes",
    },
    {
        accessorKey: "amount",
        header: "Monto",
        cell: ({ row }) => {
            const amount = row.getValue("amount") as number
            return (
                <span className="font-medium">
                    ${amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as Contribution["status"]
            return (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status]}`}
                >
                    {status}
                </span>
            )
        },
    },
]

export function ContributionsSection() {
    const handleViewMore = () => {
        console.log("Navigate to contributions page")
        // TODO: Add navigation to /gestionar/aportaciones
    }

    return (
        <SectionCard
            title="Aportaciones"
            description="Estado de pagos de los residentes"
            onViewMore={handleViewMore}
        >
            <DataTable columns={columns} data={mockContributions} />
        </SectionCard>
    )
}
