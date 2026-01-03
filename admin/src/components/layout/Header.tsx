import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
                {/* Breadcrumbs or Title could go here */}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </header>
    )
}
