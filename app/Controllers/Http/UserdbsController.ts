// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import { HttpContext } from "@adonisjs/core/build/standalone";
import Userdb from "App/Models/Userdb";
import UserdbService from "App/Services/UserdbService";
import UserdbValidator from "App/Validators/UserdbValidator";

export default class UserdbsController {
    private userService = new UserdbService()


 async index({response}: HttpContext) {
    // return list of user
      
  try {
    const data:any= await this.userService.liste();

      if (data?.status==='server_error') {
        return response.status(500).json(data)
      }
      return response.ok(data)
    
  } catch (error) {
    response.send({statut:"error",
               message:"error when list user "
  });
     
  }

  } 

  async store({request,response}: HttpContext) {
    // save user
        
    const data= await request.validate(UserdbValidator);
    console.log(data);

    const user= await  this.userService.create(data);
    
    if (user instanceof Userdb) {
      return response.ok(user);
    } 
    if(user?.status === 'server_error'){
      return response.status(500).json(user)

    }

        
    
  }

  async show({response,params}: HttpContext) {
    // return user by id
    
    const idUser:number= params.id;
    console.log(idUser);


    try {
      const data= await this.userService.listeDetail(idUser);
      if(data instanceof  Userdb){
       return response.ok(data)
      }
      if(data?.status === 'server_error'){
        return response.status(500).json(data)

      }
      if(data?.status === 'not_found'){
        return response.notFound(data)

      }
      
    } catch (error) {

      response.send({
        statut:"error",
              message:"user not find",
              
       })
      
      
    }
    
  }
  

  async update({ params, request, response }: HttpContext) {
    try {
        const idUser: number = params.id;

        const data = await request.validate(UserdbValidator);

        const userUpdate = await this.userService.update(idUser, data);

        if (userUpdate instanceof Userdb) {
            return response.send(data);
        }

        if (userUpdate?.status === 'server_error') {
            return response.status(500).json(userUpdate);
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ status: 'server_error', message: "erreur serveur" });
    }
}


  async delete({params,response}: HttpContext) {
    // delete user by id2
    try {
    const idUser:number= params.id;
 
     const user= await this.userService.delete(idUser);
    if (user instanceof Userdb) {
     return response.ok(user)
      
    } if(user?.status === 'server_error') {
      return response.status(500).json(user)
    }
    } catch (error) {
      return response.status(500).json({ status: 'server_error', message: "erreur serveur" });
    }

    
  }



}
