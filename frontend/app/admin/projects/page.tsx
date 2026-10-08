'use client'

import { useEffect, useState } from 'react'
import { getProjects, createProject } from '@/lib/api'
import { Project, ProjectInput } from '@/types/project'
import { ProjectForm } from '@/components/ProjectForm'
import { Button } from '@/components/ui/button'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then((data) => setProjects(data))
  }, [])

  const [showForm, setShowForm] = useState(false)

  async function handleCreate(data: ProjectInput) {
    await createProject(data)
    setShowForm(false)
    getProjects().then((projects) => setProjects(projects))
  }

  return (
    <div>
      <Button onClick={() => setShowForm(true)}>Nouveau Projet</Button>
      {showForm && <ProjectForm onSubmit={handleCreate} />}
    </div>
  )
}