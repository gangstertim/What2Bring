require 'spec_helper'

describe Event do
	it "requires appropriate data" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.date = "2012-10-15"
		subject.location = "My Kitchen"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = false

		subject.should be_valid
	end
end


describe Event do
	it "howmuch is required with cash" do
		subject.should_not be_valid

		subject.name = "Tim"
		subject.date = "2012-10-15"
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
		subject.date = "2012-10-15"
		subject.location = "My Kitchen"
		subject.email = "hungryhungrytimo@gmail.com"
		subject.cash = true
		subject.howmuch = 7.25

		subject.should be_valid
	end
end
