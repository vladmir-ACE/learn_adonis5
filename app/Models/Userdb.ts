import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Bookdb from './Bookdb'

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

  @hasMany(() => Bookdb)
  declare bookdbs: HasMany<typeof Bookdb> 
  


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
