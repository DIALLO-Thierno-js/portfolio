import { getProjects } from '@/lib/api'
import { ProjectList } from '@/components/ProjectList'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold mb-4">Mes Projets</h1>
      <ProjectList projects={projects} />
    </div>
  )
}