# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { 'user@example.com' }
    admin { false }
    factory :admin_user do
      admin { true }
    end
  end
end
