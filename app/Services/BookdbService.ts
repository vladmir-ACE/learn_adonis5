import Bookdb from "App/Models/Bookdb";
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs-extra';


export class BookdbService{


       // save Book
       async create(newBook:any) {
        
                try {
                await newBook.save();
                return  newBook;
                } catch (error) {
    
                return {status:'server_error',message : "erreur serveur"}
                
                }
      
            }
      
            // Liste Book
            async liste() {
              
                try {

                    const books= await Bookdb.all();   
                    return books;                  
                } catch (error) {
                    console.log(error);
                    return {status:'server_error',message : "erreur serveur"}                   
                  }
              
      
      
            }
      
      
            // detail Book
      
            async listeDetail(id: number){
    
              //new 
              try {
                const book=await Bookdb.query().where('id', id).first();
                if(!book) {
                return {status:'not_found',message : 	'Book not found'}
                }
              // console.log(book);
              return book;
              } catch (error) {
                console.log(error);
                return {status:'server_error',message : "erreur serveur"}
                
              }
              
            
            }
      
            //update book
            async update(id: number, data: any) {
                try {
                    const book = await Bookdb.findOrFail(id);
            
                    let oldFile = book.file; 
            
                    // Mise à jour des informations du livre
                    book.nom = data.nom;
                    book.file = data.file;
            
                    console.log(book);
            
                    await book.save();
            
                    // Supprimer l'ancien fichier s'il existe
                    if (oldFile) {
                        const oldFilePath = Application.tmpPath('uploads') + '/' + oldFile;
                        await fs.unlink(oldFilePath); // Supprimez l'ancien fichier du système de fichiers
                    }
            
                    return book;
                } catch (error) {
                    console.error(error);
                    return { status: 'server_error', message: "erreur serveur" };
                }
          };
            //delete book 
    
            async delete(id: number){
      
              try {
                const book= await Bookdb.findOrFail(id);
                let oldFile = book.file;
                if (oldFile) {
                    const oldFilePath = Application.tmpPath('uploads') + '/' + oldFile;
                    await fs.unlink(oldFilePath); 
                }
                await book.delete();
    
                return book
                
              } catch (error) {
                return {status:'server_error',message : "erreur serveur"}
              }
              
            }
    
    
    }
    


