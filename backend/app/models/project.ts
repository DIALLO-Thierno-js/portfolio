import { ProjectSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class Project extends ProjectSchema {
  @column({ prepare: (value: string[]) => JSON.stringify(value) })
  declare technologies: string[]
}