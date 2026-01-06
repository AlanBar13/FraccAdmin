"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { SectionCard } from "@/components/ui/section-card"
import { DataTable } from "@/components/ui/data-table"
import { FileText, FileImage, FileSpreadsheet } from "lucide-react"

interface Document {
    id: string
    name: string
    type: "PDF" | "Imagen" | "Excel"
    uploadDate: string
}

const mockDocuments: Document[] = [
    {
        id: "1",
        name: "Reglamento interno 2025",
        type: "PDF",
        uploadDate: "2025-11-01",
    },
    {
        id: "2",
        name: "Presupuesto anual",
        type: "Excel",
        uploadDate: "2025-11-15",
    },
    {
        id: "3",
        name: "Plano del fraccionamiento",
        type: "Imagen",
        uploadDate: "2025-10-20",
    },
]

const documentIcons = {
    PDF: FileText,
    Imagen: FileImage,
    Excel: FileSpreadsheet,
}

const columns: ColumnDef<Document>[] = [
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            const type = row.getValue("type") as Document["type"]
            const Icon = documentIcons[type]
            return (
                <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-xs">{type}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "uploadDate",
        header: "Fecha de subida",
        cell: ({ row }) => {
            const date = new Date(row.getValue("uploadDate"))
            return date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        },
    },
]

export function DocumentsSection() {
    const handleViewMore = () => {
        console.log("Navigate to documents page")
        // TODO: Add navigation to /gestionar/documentos
    }

    return (
        <SectionCard
            title="Documentos"
            description="Documentos importantes del fraccionamiento"
            onViewMore={handleViewMore}
        >
            <DataTable columns={columns} data={mockDocuments} />
        </SectionCard>
    )
}
