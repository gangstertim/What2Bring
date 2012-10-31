class Event < ActiveRecord::Base
  attr_accessible :cash, :date, :description, :dishes, :email, :emails, :guests, :howmuch, :location, :name, :time, :who

  validates :name, :date, :location, :email, presence: true
  validates_presence_of :howmuch, :if => :cash_is_true?

  def cash_is_true?
  	cash == true
  end

end
