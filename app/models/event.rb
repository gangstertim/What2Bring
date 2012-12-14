	require 'chronic'

class Event < ActiveRecord::Base

	attr_accessible :cash, :description, :dishes, :email, :emails, :how_many_guests, :howmuch, :location, :name, :datec, :who, :dishes_temp

	has_many :guests#, :dependent => :destroy
	# before_validation :parse_date

	validates :name, :location, :email, :datec, presence: true
	validates_presence_of :howmuch, :if => :cash_is_true?

	def cash_is_true?
		cash == true
	end
	
end

class Guests < ActiveRecord::Base
	belongs_to :event, :foreign_key => "event_id"
end
