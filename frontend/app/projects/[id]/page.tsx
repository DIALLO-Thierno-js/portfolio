import { getProject } from '@/lib/api'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = await getProject(Number(id))

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {project.technologies.map((tech) => (
        <Badge key={tech}>{tech}</Badge>
      ))}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          Code source
        </a>
      )}
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          Voir la demo
        </a>
      )}
    </div>
  )
}