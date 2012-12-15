require 'spec_helper'

describe Event do
	it "requires only necessary data" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.datec = "2012-10-15"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = false
		subject.location = "The neighbor's patio"

		subject.should be_valid
	end
end


describe Event do
	it "has a dumb date" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.datec = "dead fish"
		subject.location = "My Kitchen"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = true

		subject.should_not be_valid

	end
end

describe Event do
	it "howmuch is required with cash" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.datec = "next thrusday at noon"
		subject.location = "My Kitchen"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = false
		subject.howmuch = 7.25

		subject.should_not be_valid

		subject.cash = true
	end
end

describe Event do
	it "has some really nice dishes" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.datec = "2012-10-15"
		subject.location = "My Kitchen"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = true
		subject.dishes ="cats, dogs, robots, fried eggs, one large vanille latte"
		subject.howmuch = 7.25

		subject.should be_valid
	end
end