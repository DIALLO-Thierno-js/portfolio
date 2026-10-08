'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ProjectInput } from '@/types/project'

type Props = {
  onSubmit: (data: ProjectInput) => Promise<void>
}

export function ProjectForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [technologies, setTechnologies] = useState<string[]>([])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    onSubmit({
      title,
      description,
      imageUrl: imageUrl || undefined,
      githubUrl: githubUrl || undefined,
      demoUrl: demoUrl || undefined,
      technologies: technologies.map((tech) => tech.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre</label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="description">Description</label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label htmlFor="imageUrl">URL de l'image</label>
      <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <label htmlFor="githubUrl">URL du dépôt GitHub</label>
      <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
      <label htmlFor="demoUrl">URL de la démonstration</label>
      <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} />
      <label htmlFor="technologies">Technologies</label>
      <Input
        value={technologies.join(',')}
        onChange={(e) => setTechnologies(e.target.value.split(','))}
      />
      <Button type="submit">Enregistrer</Button>
    </form>
  )
}