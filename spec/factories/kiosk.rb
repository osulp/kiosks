# frozen_string_literal: true

FactoryBot.define do
  factory :kiosk do
    name { 'circ' }
    map_default_floor_number { 2 }
    association :kiosk_layout, factory: :kiosk_layout
  end
end
