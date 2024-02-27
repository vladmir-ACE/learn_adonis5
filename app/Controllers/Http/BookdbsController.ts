// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContext } from "@adonisjs/core/build/standalone";
import { BookdbService } from "App/Services/BookdbService";
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import Bookdb from "App/Models/Bookdb";



// cjld2cjxh0000qzrmn831i7rn


export default class BookdbsController {

    private bookService = new BookdbService()

 async index({response}: HttpContext) {
    // return list of book
     try {
      const data:any= await this.bookService.liste();

      if (data?.status==='server_error') {
        return response.status(500).json(data)
      }
      return response.ok(data)
    
     } catch (error) {
      response.send({statut:"error",
               message:"error when return list ",
  });
     }

  } 

  async store({request,response}: HttpContext) {[]
    // save book
    
      // get pdf
       const file= request.file('doc', {
        size: '50mb',
        extnames: ['pdf']
      });
      // validate 

      if(!file!.isValid) {
        return response.badRequest({
          message:"mauvais format; choisir un pdf",
          errors: file!.errors
        })
      }
       const filename=cuid()+'.'+file!.extname;
       console.log(filename)
      // move pdf
      await file!.move((Application.tmpPath('uploads')),{
        name:filename
      })
       
        let data:any=request.body();
        console.log(data);

        let newbook:Bookdb=new Bookdb();
        newbook.nom=data.nom;
        newbook.file=filename;
        newbook.userdbId=data.userdb_id;


        try{

            const book= await  this.bookService.create(newbook);
    
            if (book instanceof Bookdb) {
              return response.ok(book);
            } 
            if(book?.status === 'server_error'){
              return response.status(500).json(book)
        
            }           
            }

            catch (error) {
                console.error(error);
                return response.status(500).json({ status: 'server_error', message: "erreur serveur" });
            }
      

  }


  async show({params,response}: HttpContext) {
    // return book by id
    const idUser:number= params.id;
    console.log(idUser);


    try {
      const data= await this.bookService.listeDetail(idUser);
      if(data instanceof  Bookdb){
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
              message:"book not find",
              
    
       })
      
      
    }

    
 }


 async update({params,request,response}: HttpContext) {

    let filename:string="";

    // update book by id
     
    // get pdf
    const file= request.file('doc', {
      size: '50mb',
      extnames: ['pdf']
    });
    // validate 

    if(file!=null){
      if(!file!.isValid) {
        return response.badRequest({
          message:"mauvais format; choisir un pdf",
          errors: file!.errors
        })
      }   
         filename=cuid()+'.'+file!.extname;
        console.log(filename)
     // move pdf
       await file!.move(Application.tmpPath('uploads'),{
       name:filename
     })
        
    }

    const idbook:number= params.id;

    let data:any=request.body();
     
    let updateBook:Bookdb=new Bookdb();
        updateBook.nom=data.nom;
        updateBook.file=filename;
     try{

            const book= await  this.bookService.update(idbook,updateBook);
    
            if (book instanceof Bookdb) {
              return response.ok(book);
            } 
            if(book?.status === 'server_error'){
              return response.status(500).json(book)
        
            }           
            }

            catch (error) {
                console.error(error);
                return response.status(500).json({ status: 'server_error', message: "erreur serveur" });
            }
    
 }

 async delete({params,response}: HttpContext) {
    // delete book by id
    
    const idbook:number= params.id;

    try{

        const book= await  this.bookService.delete(idbook);

        if (book instanceof Bookdb) {
          return response.ok(book);
        } 
        if(book?.status === 'server_error'){
          return response.status(500).json(book)
    
        }           
        }

        catch (error) {
            console.error(error);
            return response.status(500).json({ status: 'server_error', message: "erreur serveur" });
        }

  }



}
