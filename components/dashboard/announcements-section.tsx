"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { SectionCard } from "@/components/ui/section-card"
import { DataTable } from "@/components/ui/data-table"

interface Announcement {
    id: string
    title: string
    date: string
    preview: string
}

const mockAnnouncements: Announcement[] = [
    {
        id: "1",
        title: "Reunión de vecinos - Enero 2026",
        date: "2025-12-15",
        preview: "Se convoca a todos los residentes a la reunión mensual...",
    },
    {
        id: "2",
        title: "Mantenimiento de áreas verdes",
        date: "2025-12-10",
        preview: "El próximo lunes se realizará mantenimiento...",
    },
    {
        id: "3",
        title: "Cambio de horario de vigilancia",
        date: "2025-12-05",
        preview: "A partir del 1 de enero, el horario de vigilancia...",
    },
]

const columns: ColumnDef<Announcement>[] = [
    {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        },
    },
    {
        accessorKey: "title",
        header: "Título",
    },
    {
        accessorKey: "preview",
        header: "Vista previa",
        cell: ({ row }) => {
            const preview = row.getValue("preview") as string
            return <span className="text-muted-foreground">{preview}</span>
        },
    },
]

export function AnnouncementsSection() {
    const handleViewMore = () => {
        console.log("Navigate to announcements page")
        // TODO: Add navigation to /gestionar/anuncios
    }

    return (
        <SectionCard
            title="Últimos Anuncios"
            description="Comunicados recientes de la administración"
            onViewMore={handleViewMore}
        >
            <DataTable columns={columns} data={mockAnnouncements} />
        </SectionCard>
    )
}
