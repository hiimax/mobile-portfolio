import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Project } from "@/types"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

// Mock Data
const projects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        tagline: "A modern shopping experience",
        role: "Full Stack Developer",
        timeline: "Active",
        stack: ["React", "Node.js", "PostgreSQL"],
        heroColor: "#3b82f6",
        videoUrl: "",
        links: {},
        challenge: "",
        solution: "",
        gallery: [],
    },
    {
        id: "2",
        title: "Portfolio v1",
        tagline: "My previous personal site",
        role: "Frontend Developer",
        timeline: "2022",
        stack: ["HTML", "CSS", "JS"],
        heroColor: "#10b981",
        videoUrl: "",
        links: {},
        challenge: "",
        solution: "",
        gallery: [],
    },
]

function Projects() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <Button asChild>
                    <Link to="/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Stack</TableHead>
                            <TableHead>Timeline</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.role}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {project.stack.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{project.timeline}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to={`/projects/${project.id}`}>Edit</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Projects
