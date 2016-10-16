# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150710085345) do

  create_table "accounts", force: :cascade do |t|
    t.string   "login",              limit: 2000,                               null: false
    t.datetime "created_at",                                                    null: false
    t.integer  "account_type",       limit: 4,                                  null: false
    t.integer  "user_id",            limit: 4,                                  null: false
    t.datetime "start_date"
    t.datetime "end_date"
    t.boolean  "is_deleted",         limit: 1,                  default: false, null: false
    t.string   "encrypted_password", limit: 255,                default: "",    null: false
    t.integer  "sign_in_count",      limit: 4,                  default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip", limit: 255
    t.string   "last_sign_in_ip",    limit: 255
    t.decimal  "client_cost",                     precision: 8
    t.integer  "creator_id",         limit: 4
    t.string   "email",              limit: 255
    t.string   "unique_session_id",  limit: 20
  end

  add_index "accounts", ["creator_id"], name: "fk_rails_c19d6d1c5b", using: :btree
  add_index "accounts", ["email"], name: "index_accounts_on_email", using: :btree
  add_index "accounts", ["user_id"], name: "fk_rails_d0ddfdd78f", using: :btree

  create_table "accounts_estate_types", force: :cascade do |t|
    t.integer "account_id",     limit: 4, null: false
    t.integer "estate_type_id", limit: 4, null: false
  end

  add_index "accounts_estate_types", ["account_id"], name: "fk_rails_3e9ce9d2fa", using: :btree
  add_index "accounts_estate_types", ["estate_type_id"], name: "fk_rails_0bef7bfe9a", using: :btree

  create_table "city_areas", force: :cascade do |t|
    t.string "title", limit: 255, null: false
  end

  create_table "cost_categories", force: :cascade do |t|
    t.decimal "cost", precision: 8
  end

  create_table "crono_jobs", force: :cascade do |t|
    t.string   "job_id",            limit: 255,   null: false
    t.text     "log",               limit: 65535
    t.datetime "last_performed_at"
    t.boolean  "healthy",           limit: 1
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "crono_jobs", ["job_id"], name: "index_crono_jobs_on_job_id", unique: true, using: :btree

  create_table "estate_revisions", force: :cascade do |t|
    t.integer  "account_id",      limit: 4,                 null: false
    t.integer  "estate_id",       limit: 4,                 null: false
    t.datetime "created_at",                                null: false
    t.integer  "revision_result", limit: 4,                 null: false
    t.boolean  "is_deleted",      limit: 1, default: false, null: false
  end

  add_index "estate_revisions", ["account_id"], name: "fk_rails_46a200c005", using: :btree
  add_index "estate_revisions", ["estate_id"], name: "fk_rails_e898bdab8a", using: :btree

  create_table "estate_types", force: :cascade do |t|
    t.string  "title",            limit: 2000,             null: false
    t.integer "cost_category_id", limit: 4,    default: 0, null: false
  end

  add_index "estate_types", ["cost_category_id"], name: "fk_rails_9a59bccda6", using: :btree

  create_table "estates", force: :cascade do |t|
    t.string   "owner_name",     limit: 2000,                                               null: false
    t.string   "owner_phone",    limit: 2000,                                               null: false
    t.string   "description",    limit: 2000
    t.integer  "estate_type_id", limit: 4,                                                  null: false
    t.integer  "status",         limit: 4
    t.boolean  "is_deleted",     limit: 1,                  default: false,                 null: false
    t.string   "address",        limit: 2000
    t.decimal  "cost",                        precision: 8
    t.float    "footage",        limit: 24
    t.integer  "city_area_id",   limit: 4
    t.datetime "created_at",                                default: '2016-04-03 21:52:39', null: false
    t.datetime "actualized_at"
  end

  add_index "estates", ["city_area_id"], name: "fk_rails_356ab5c76a", using: :btree
  add_index "estates", ["estate_type_id"], name: "fk_rails_97562a9318", using: :btree

  create_table "users", force: :cascade do |t|
    t.string  "first_name",   limit: 2000,                 null: false
    t.string  "last_name",    limit: 2000,                 null: false
    t.string  "patronym",     limit: 2000
    t.boolean "is_deleted",   limit: 1,    default: false, null: false
    t.string  "phone_number", limit: 255
  end

  add_foreign_key "accounts", "accounts", column: "creator_id"
  add_foreign_key "accounts", "users"
  add_foreign_key "accounts_estate_types", "accounts"
  add_foreign_key "accounts_estate_types", "estate_types"
  add_foreign_key "estate_revisions", "accounts"
  add_foreign_key "estate_revisions", "estates"
  add_foreign_key "estate_types", "cost_categories"
  add_foreign_key "estates", "city_areas"
  add_foreign_key "estates", "estate_types"
end
