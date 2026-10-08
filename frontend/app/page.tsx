import Link from 'next/link'
import { getProjects } from '@/lib/api'
import { ProjectList } from '@/components/ProjectList'

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ProjectList projects={projects} />
    </div>
  )
}