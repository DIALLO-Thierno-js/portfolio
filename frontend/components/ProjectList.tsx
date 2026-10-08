import { Project } from '@/types/project'
import { ProjectCard } from '@/components/ProjectCard'

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}