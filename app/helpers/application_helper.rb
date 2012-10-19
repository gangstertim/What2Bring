module ApplicationHelper
	def time_format (time)
		return time.strftime("%I:%M %p")
	end
end
