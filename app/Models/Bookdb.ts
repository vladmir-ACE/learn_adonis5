import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bookdb extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  declare nom:string

  @column()
  declare file:string

  @column()
  declare userdbId:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
