class Event < ActiveRecord::Base
  attr_accessible :cash, :date, :description, :dishes, :email, :emails, :guests, :howmuch, :location, :name, :time, :who

  validates :name, :date,  presence: true
end
