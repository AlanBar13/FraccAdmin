import { AnnouncementsSection } from "@/components/dashboard/announcements-section"
import { HousesSection } from "@/components/dashboard/houses-section"
import { DocumentsSection } from "@/components/dashboard/documents-section"
import { ContributionsSection } from "@/components/dashboard/contributions-section"

export default function AdminSubdomainPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
                <p className="text-muted-foreground">
                    Resumen de la administración del fraccionamiento
                </p>
            </div>

            <div className="flex gap-6">
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6">
                    <section id="announcements">
                        <AnnouncementsSection />
                    </section>

                    <section id="houses">
                        <HousesSection />
                    </section>

                    <section id="documents">
                        <DocumentsSection />
                    </section>

                    <section id="contributions">
                        <ContributionsSection />
                    </section>
                </div>
            </div>
        </div>
    )
}