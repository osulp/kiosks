# frozen_string_literal: true

RSpec.describe 'Admin management', type: :feature, js: false do
  let(:current_user) { user }
  let(:dist_app) { Rails.root.join('app/assets/javascripts/dist-app.js') }
  let(:ticket) { CASClient::ServiceTicket.new('ST-test', nil) }

  context 'with a guest user' do
    let(:user) { create(:user) }

    before do
      allow(ticket).to receive(:extra_attributes).and_return(id: 10, email: 'guest@example.com')
      allow(ticket).to receive(:success).and_return(true)
      allow(ticket).to receive(:user).and_return('guest')

      Devise.cas_create_user = true
      User.authenticate_with_cas_ticket(ticket)

      dist_app.write('test') unless dist_app.exist?
    end

    it 'Guest user goes to the admin panel' do
      visit root_path
      expect(page).not_to have_text 'Admin Panel'
      login_as user
      visit rails_admin_path
      expect(page).to have_text('You do not have sufficient permissions to view this page')
    end

    it 'Guest user goes to collections page' do
      login_as user
      visit collections_path
      expect(page).not_to have_text 'Admin Panel'
      expect(page).to have_text('You do not have sufficient permissions to view this page')
    end

    it 'Guest user goes to slides page' do
      login_as user
      visit slides_path
      expect(page).not_to have_text 'Admin Panel'
      expect(page).to have_text('You do not have sufficient permissions to view this page')
    end

    it 'Guest user goes to kiosks page' do
      login_as user
      visit kiosks_path
      expect(page).not_to have_text 'Admin Panel'
      expect(page).to have_text('You do not have sufficient permissions to view this page')
    end
  end

  context 'with an admin user' do
    let(:user) { create(:admin_user) }

    before do
      allow(ticket).to receive(:extra_attributes).and_return(id: 10, email: 'admin@example.com')
      allow(ticket).to receive(:success).and_return(true)
      allow(ticket).to receive(:user).and_return('admin')

      Devise.cas_create_user = true
      User.authenticate_with_cas_ticket(ticket)

      allow(user).to receive(:admin?).and_return(true)
      allow(current_user).to receive(:admin?).and_return(true)

      dist_app.write('test') unless dist_app.exist?

      login_as user
      visit root_path
      click_link 'Admin Panel'
    end

    it { expect(page).to have_text('Site Administration') }

    it 'User goes to the list of kiosk layouts page' do
      within('body.rails_admin .content') do
        click_link 'Kiosk layouts'
      end
      expect(page).to have_text('List of Kiosk layouts')
    end

    it 'User goes to the list of slide types page' do
      within('body.rails_admin .content') do
        click_link 'Slide types'
      end
      expect(page).to have_text('List of Slide types')
    end

    it 'User goes to the list of users page' do
      within('body.rails_admin .content') do
        click_link 'Users'
      end
      expect(page).to have_text('List of Users')
    end
  end
end
