import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('department')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(90)', (cb) => cb.notNull())
    .addColumn('created_at', 'timestamp', (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    ).addUniqueConstraint('name_unique', ['name'])
    .execute()
  await db.schema.createTable('employee')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(90)', (cb) => cb.notNull())
    .addColumn('department_id', 'integer')
    .addColumn('position', 'varchar(50)', (cb) => cb.notNull())
    .addColumn('bio', 'text', (cb) => cb.notNull())
    .addColumn('active', 'boolean', (cb) => cb.notNull())
    .addColumn('salary', 'integer', (cb) => cb.notNull())
    .addColumn('created_at', 'timestamp', (cb) =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute()
  //await db.schema
  //  .createIndex('pet_owner_id_index')
  //  .on('pet')
  //  .column('owner_id')
  //  .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('department').execute()
  await db.schema.dropTable('employee').execute()
}
