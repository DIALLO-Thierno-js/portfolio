import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Project from '#models/project' 
export default class extends BaseSeeder {
  async run() {
      await Project.createMany([
        {title: 'Wano', description: 'depuis un bon moment je travail sur le bail', imageUrl: 'https://picsum.photos/seed/wano/600/400', githubUrl: 'https://github.com/theo/wano' , technologies: ['HTML','CSS', 'JS']},
        {title: 'portfolio', description: 'pour apprendre', imageUrl: 'https://picsum.photos/seed/portfolio/600/400', githubUrl: 'https://github.com/walkerportfolio' , technologies: ['PHP','Next', 'Adonis']}
    ])
  }
}