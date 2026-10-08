import { Project } from '@/types/project'
import { ProjectInput } from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)

  if (!response.ok) {
    throw new Error(`erreur http ! status ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

export async function getProject(id: number): Promise<Project | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`erreur http! status ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

export async function createProject(data: ProjectInput): Promise<Project> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`erreur http! status ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

export async function updateProject(id: number, data: ProjectInput): Promise<Project> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`erreur http! status ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

export async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`erreur http! status ${response.status}`)
  }
}