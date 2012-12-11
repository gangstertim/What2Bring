class Guest < ActiveRecord::Base
  belongs_to :event
  attr_accessible :email, :name, :event_id, :event
end
