import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Site Vists</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Admin panel initiated.</p>
            </div>
        </div>
    )
}



export default Dashboard
