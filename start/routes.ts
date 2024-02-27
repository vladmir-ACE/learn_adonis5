/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UserdbsController from 'App/Controllers/Http/UserdbsController'

//user
Route.get( '/listUser', "UserdbsController.index")
Route.get( '/listUser/:id','UserdbsController.show')
Route.post( '/addUser',"UserdbsController.store")
Route.put( '/updateUser/:id', "UserdbsController.update")
Route.delete( '/deleteUser/:id', "UserdbsController.delete")

// book
Route.post( '/addBook', "BookdbsController.store")
Route.post( 'user/:id/addBook', "BookdbsController.addByUser")
Route.get( '/listBook/', "BookdbsController.index")
Route.get( '/listBook/:id', "BookdbsController.show")
Route.put('updateBook/:id',"BookdbsController.update")
Route.delete("/deleteBook/:id","BookdbsController.delete")
