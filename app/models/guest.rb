class Guest < ActiveRecord::Base
  belongs_to :event
  attr_accessible :email, :guest_id, :name
end
