import { Project } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div>
      {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {project.technologies.map((tech) => (
        <Badge key={tech}>{tech}</Badge>
      ))}

      <Button asChild>
        <Link href={`/projects/${project.id}`}>Voir le projet</Link>
      </Button>
    </div>
  )
}