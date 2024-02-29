import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Bookdb from './Bookdb'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Userdb extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  declare nom:string

  @column()
  declare prenom:string

  @column()
  declare sexe:string

  @column()
  declare age:number

  @column()
  declare email:string

  @column()
  declare tel:string


  @column()
  declare password:string

  @column()
  declare rememberMeToken?:string


  @hasMany(() => Bookdb)
  declare bookdbs: HasMany<typeof Bookdb> 
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user:Userdb){
    if (user.$dirty.password) {
      user.password =await Hash.make(user.password)
    }
  }


}
