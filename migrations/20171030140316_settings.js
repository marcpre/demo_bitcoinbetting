exports.up = function(knex, Promise) {
  return knex.schema.createTable("settings", function (t) {
      t.increments("id").unsigned().primary()
      t.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade')   
      t.string("image").notNull()
      t.text("description").nullable()
      t.boolean("deleted").nullable()       
      t.dateTime("createdAt").notNull()
      t.dateTime("updatedAt").nullable()
      t.dateTime("deletedAt").nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts")    
}
