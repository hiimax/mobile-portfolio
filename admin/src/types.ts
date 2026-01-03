export interface Project {
    id: string
    title: string
    tagline: string
    role: string
    timeline: string
    stack: string[]
    heroColor: string
    videoUrl: string
    links: Record<string, string>
    challenge: string
    solution: string
    gallery: GalleryItem[]
    next?: NextProject
}

export interface GalleryItem {
    type: "image" | "color"
    url?: string
    val?: string
}

export interface NextProject {
    id: string
    name: string
}

export interface SiteConfig {
    accentColor: string
    bgColor: string
    fontHeading: string
    fontMono: string
}
