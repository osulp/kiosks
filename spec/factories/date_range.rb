
# frozen_string_literal: true

FactoryBot.define do
  factory :date_range do
    start_date { Time.utc(2015, 1, 1, 12, 0, 0) }
    end_date { Time.utc(2015, 1, 1, 12, 0, 0) }
    association :slide, factory: :slide
  end
end
