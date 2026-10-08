import vine from '@vinejs/vine'

    export const createProjectValidator =vine.compile(vine.object({
      title : vine.string().trim().minLength(3).maxLength(30),
      description : vine.string().trim(),
      imageUrl : vine.string().url().optional() ,
      githubUrl : vine.string().url().optional(),
      demoUrl : vine.string().url().optional(),
      technologies : vine.array(vine.string())

    }))
   export const updateProjectValidator = createProjectValidator