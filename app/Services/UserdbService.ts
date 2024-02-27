import Userdb from "App/Models/Userdb";

export default class UserdbService{

    // save User
    async create(data:any) {
    const newUser:Userdb= new  Userdb();
             newUser.nom=data.nom;
             newUser.prenom= data.prenom;
             newUser.age= data.age;
             newUser.sexe= data.sexe;
  
            try {
            await newUser.save();
            return  newUser;
            } catch (error) {

            return {status:'server_error',message : "erreur serveur"}
            
            }
  
        }
  
        // Liste User
        async liste() {
          
          try {
            const users= await Userdb.all();
  
            return users;
            
          } catch (error) {
            console.log(error);
            return {status:'server_error',message : "erreur serveur"}
            
          }
          
  
  
        }
  
  
        // detail User
  
        async listeDetail(id: number){

          //new 
          try {
            const user=await Userdb.query().where('id', id).preload('bookdbs').first();
            if(!user) {
            return {status:'not_found',message : 	'User not found'}
            }
          // console.log(user);
          return user;
          } catch (error) {
            console.log(error);
            return {status:'server_error',message : "erreur serveur"}
            
          }
          
        
        }
  
        //update user
        async update(id: number, data: any) {
          try {
              const user = await Userdb.findOrFail(id);
      
              user.nom = data.nom;
              user.prenom = data.prenom;
              user.age = data.age;
              user.sexe = data.sexe;
      
              console.log(user);
      
              await user.save();
              return user;
          } catch (error) {
              console.error(error);
              return { status: 'server_error', message: "erreur serveur" };
          }
      };
        //delete user 

        async delete(id: number){
  
          try {
            const user= await Userdb.findOrFail(id);
            await user.delete();

            return user
            
          } catch (error) {
            return {status:'server_error',message : "erreur serveur"}
          }
          
        }


}

