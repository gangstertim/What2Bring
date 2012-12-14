class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.string :name
      t.string :email
      t.string :dishes
      t.belongs_to :event

      t.timestamps
    end
    add_index :guests, :event_id
  end
end


