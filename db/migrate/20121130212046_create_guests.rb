class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.string :name
      t.integer :guest_id
      t.string :email
      t.belongs_to :event

      t.timestamps
    end
    add_index :guests, :event_id
  end
end


