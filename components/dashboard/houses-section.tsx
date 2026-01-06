"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { SectionCard } from "@/components/ui/section-card"
import { DataTable } from "@/components/ui/data-table"

interface House {
    id: string
    number: string
    owner: string
    status: "Ocupada" | "Vacía" | "En venta"
}

const mockHouses: House[] = [
    {
        id: "1",
        number: "A-101",
        owner: "María García",
        status: "Ocupada",
    },
    {
        id: "2",
        number: "A-102",
        owner: "Juan Pérez",
        status: "Ocupada",
    },
    {
        id: "3",
        number: "A-103",
        owner: "Sin asignar",
        status: "Vacía",
    },
    {
        id: "4",
        number: "B-201",
        owner: "Roberto Sánchez",
        status: "En venta",
    },
]

const statusColors: Record<House["status"], string> = {
    Ocupada: "text-green-600 bg-green-50 border-green-200",
    Vacía: "text-gray-600 bg-gray-50 border-gray-200",
    "En venta": "text-blue-600 bg-blue-50 border-blue-200",
}

const columns: ColumnDef<House>[] = [
    {
        accessorKey: "number",
        header: "N° Casa",
    },
    {
        accessorKey: "owner",
        header: "Propietario",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as House["status"]
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

export function HousesSection() {
    const handleViewMore = () => {
        console.log("Navigate to houses page")
        // TODO: Add navigation to /gestionar/casas
    }

    return (
        <SectionCard
            title="Casas"
            description="Información de las unidades del fraccionamiento"
            onViewMore={handleViewMore}
        >
            <DataTable columns={columns} data={mockHouses} />
        </SectionCard>
    )
}
