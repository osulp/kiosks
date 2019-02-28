# frozen_string_literal: true

RSpec.describe User, type: :model do
  let(:user) { User.first }
  let(:ticket) { CASClient::ServiceTicket.new('ST-test', nil) }

  before do
    allow(ticket).to receive(:extra_attributes).and_return(id: 10, email: 'admin@example.com')
    allow(ticket).to receive(:success).and_return(true)
    allow(ticket).to receive(:user).and_return('cas_username')

    Devise.cas_create_user = true
    User.authenticate_with_cas_ticket(ticket)
  end

  it 'user has cas username' do
    expect(user.username).to be_present
    Devise.cas_user_identifier = nil
  end

  it 'assigns extra attributes' do
    expect(user.email).to eq('admin@example.com')
    Devise.cas_user_identifier = nil
  end
end
