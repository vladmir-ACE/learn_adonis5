import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bookdbs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('userdb_id')
        .unsigned()
        .references('userdbs.id')

      table.string('nom',255)
      table.string('file',255)

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
