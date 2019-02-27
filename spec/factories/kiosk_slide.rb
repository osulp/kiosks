# frozen_string_literal: true

FactoryBot.define do
  factory :kiosk_slide do
    association :kiosk, factory: :kiosk
    association :slide, factory: :slide
  end
end
