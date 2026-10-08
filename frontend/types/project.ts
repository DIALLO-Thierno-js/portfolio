export type Project = {
  id: number
  title: string
  description: string
  imageUrl: string | null
  githubUrl: string | null
  demoUrl: string | null
  technologies: string[]
}

export type ProjectInput = {
  title: string
  description: string
  imageUrl?: string
  githubUrl?: string
  demoUrl?: string
  technologies: string[]
}