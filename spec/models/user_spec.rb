require 'rails_helper'
describe User, :type => :model do
  let(:user) { User.first }
  before (:each) do
    @ticket = CASClient::ServiceTicket.new("ST-test", nil)
    @ticket.extra_attributes = {:id => 10, :email => "admin@example.com"}
    @ticket.success = true
    @ticket.user = "cas_username"

    Devise.cas_create_user = true
    User.authenticate_with_cas_ticket(@ticket)
  end

  it 'user has cas username' do
    expect(user.username.present?).to be_truthy
    Devise.cas_user_identifier = nil
  end

  it 'assigns extra attributes' do
    expect(user.email).to eq('admin@example.com')
    Devise.cas_user_identifier = nil
  end
end
