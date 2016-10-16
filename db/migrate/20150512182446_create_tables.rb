class CreateTables < ActiveRecord::Migration
  def change
    create_table "accounts", force: true do |t|
      t.string   "login",        limit: 2000, null: false
      t.string   "password",     limit: 2000, null: false
      t.datetime "created_at",                null: false
      t.integer  "account_type",              null: false
      t.integer  "user_id",                   null: false
      t.datetime "start_date"
      t.datetime "end_date"
      t.boolean "is_deleted", default: false, null: false
    end

    #add_index "accounts", ["user_id"], name: "FK_Reference_1", using: :btree

    create_table "accounts_estate_types", force: true do |t|
      t.integer "account_id",     null: false
      t.integer "estate_type_id", null: false
    end

    #add_index "accounts_estate_types", ["account_id"], name: "FK_Reference_4", using: :btree
    #add_index "accounts_estate_types", ["estate_type_id"], name: "FK_Reference_3", using: :btree

    create_table "estate_revisions", force: true do |t|
      t.integer  "account_id",      null: false
      t.integer  "estate_id",       null: false
      t.datetime "created_at",      null: false
      t.integer  "revision_result", null: false
      t.boolean "is_deleted",                  default: false, null: false
    end

    #add_index "estate_revisions", ["account_id"], name: "FK_Reference_6", using: :btree
    #add_index "estate_revisions", ["estate_id"], name: "FK_Reference_5", using: :btree

    create_table "estate_types", force: true do |t|
      t.string "title", limit: 2000, null: false
    end

    create_table "estates", force: true do |t|
      t.string  "owner_name",     limit: 2000,                 null: false
      t.string  "owner_phone",    limit: 2000,                 null: false
      t.string  "title",          limit: 2000,                 null: false
      t.string  "description",    limit: 2000
      t.integer "estate_type_id",                              null: false
      t.integer "status"
      t.boolean "is_deleted",                  default: false, null: false
    end

    #add_index "estates", ["estate_type_id"], name: "FK_Reference_2", using: :btree

    create_table "users", force: true do |t|
      t.string  "first_name", limit: 2000,                 null: false
      t.string  "last_name",  limit: 2000,                 null: false
      t.string  "patronym",   limit: 2000
      t.boolean "is_deleted",              default: false, null: false
    end
	
  	add_foreign_key :accounts, :users
  	add_foreign_key :accounts_estate_types, :accounts, column: :account_id
    add_foreign_key :accounts_estate_types, :estate_types, column: :estate_type_id
  	add_foreign_key :estate_revisions, :accounts
  	add_foreign_key :estate_revisions, :estates
  	add_foreign_key :estates, :estate_types
	
  end
end
