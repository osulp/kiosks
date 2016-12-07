require 'rails_helper'

describe User, :type => :model do
  let(:user) { User.create(
    email: 'admin@example.com', 
    password: 'password123', 
    password_confirmation: 'password123')
  }

  it 'is databse authenticable' do
    expect(user.valid_password?('password123')).to be_truthy
  end
end
