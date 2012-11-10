	require 'chronic'

class Event < ActiveRecord::Base

	attr_accessible :cash, :description, :dishes, :email, :emails, :guests, :howmuch, :location, :name, :datec, :who

	# before_validation :parse_date

	validates :name, :location, :email, :datec, presence: true
	validates_presence_of :howmuch, :if => :cash_is_true?

	def cash_is_true?
		cash == true
	end
	

    
    #  def date
    #  	validates_presence_of :date
    #      self.date
    #  end
    #  def date=(s)
    #     self.date = Chronic.parse(s)
    # end

 	# def parse_date
 	# puts "***********************************"
 	#   puts self.date
  #     self.date = Chronic::parse(self.date_before_type_cast) if attribute_present?("date")
  #   end
end
