import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'userdbs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom',255)
      table.string('prenom',255)
      table.string('sexe',255)
      table.integer('age')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
