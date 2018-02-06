require 'rails_helper'

describe User, :type => :model do
  let(:user) { User.create(email: 'admin@example.com', username: 'cas_username') }

  it 'is databse authenticable' do
    expect(user.username.present?).to be_truthy
  end
end
