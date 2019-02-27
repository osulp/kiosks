# frozen_string_literal: true

FactoryBot.define do
  factory :kiosk do
    name { 'circ' }
    association :kiosk_layout, factory: :kiosk_layout
  end
end
