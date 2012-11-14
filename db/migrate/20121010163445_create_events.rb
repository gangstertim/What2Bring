class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :datec
      t.string :location
      t.text :description
      t.string :who
      t.string :email
      t.integer :guests
      t.text :emails
      t.text :dishes
      t.boolean :cash
      t.decimal :howmuch

      t.timestamps
    end
  end
end
