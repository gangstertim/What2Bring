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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121130212046) do

  create_table "events", :force => true do |t|
    t.string   "name"
    t.datetime "datec"
    t.string   "location"
    t.text     "description"
    t.string   "who"
    t.string   "email"
    t.integer  "how_many_guests"
    t.text     "emails"
    t.text     "dishes"
    t.text     "dishes_temp"
    t.boolean  "cash"
    t.decimal  "howmuch"
    t.integer  "event_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "guests", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "dishes"
    t.boolean  "bringing_cash"
    t.integer  "event_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "guests", ["event_id"], :name => "index_guests_on_event_id"

end
