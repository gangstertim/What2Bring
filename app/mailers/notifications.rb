class Notifications < ActionMailer::Base
  default from: "MillerSchaffer@What2Bring.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifications.new_event.subject
  #
  def new_event(event)
    # @greeting = "Hi"
    @event = event

    mail to: event.email
  end
end
