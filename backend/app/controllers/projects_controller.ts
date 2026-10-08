import type { HttpContext } from '@adonisjs/core/http'
import  Project from "#models/project";
import { createProjectValidator, updateProjectValidator } from '#validators/project'


export default class ProjectsController {
  async  index({response}:HttpContext) {
    const projects = await Project.all()
    return response.ok({
        success : true,
        data : projects,

    })
    
  }
  async show ({params, response}: HttpContext){
    const project = await Project.find(params.id)
    if (!project) {
        return response.notFound({
            success: false,
            message: 'Projet introuvable'
        })
        
    }
    return response.ok({
        success : true,
        data: project, 
    })
  }
  async destroy({response, params}:HttpContext){
    const project = await Project.find(params.id)
    if (!project) {
        return response.notFound({
            success: false,
            message: 'Projet introuvable'
           
        })
        
    }
    await project.delete()
    return response.ok({
        success: true,
        data: null,
    })
  }
  async store ({request, response}:HttpContext){
    const data = await request.validateUsing(createProjectValidator)
    const project = await Project.create(data)
    return response.created({
      success: true,
      data: project

    })
    


  }
  async update ({request, response, params}: HttpContext){
    const project = await Project.find(params.id)
    if(!project){
      return  response.notFound({
        success:false,
        message:'Projet introuvable'
      })
      }
       const data = await request.validateUsing(updateProjectValidator)
      project.merge(data)
      await project.save()
      return response.ok({
        success : true,
        data : project
      })
      
    
  }
        
    
}