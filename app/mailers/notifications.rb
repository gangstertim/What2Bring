class Notifications < ActionMailer::Base
  default from: "events@what2bring.org"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifications.new_event.subject
  #
  def new_event(event)
    # @greeting = "Hi"
    @greeting = "Hello " + event.who + ","
    @event = event

    mail( to: event.email, subject: event.name)
  end
end
