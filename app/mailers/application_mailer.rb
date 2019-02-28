# frozen_string_literal: true

# ActionMailer basic application level class
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
