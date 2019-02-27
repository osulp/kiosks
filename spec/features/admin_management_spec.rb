# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Admin management', type: :feature, js: false do
  let(:user) { User.first }
  let(:current_user) { user }

  let(:dist_app) { Rails.root.join('app/assets/javascripts/dist-app.js') }

  context 'login as guest user' do
    before do
      @ticket = CASClient::ServiceTicket.new('ST-test', nil)
      @ticket.extra_attributes = { id: 10, email: 'guest@example.com' }
      @ticket.success = true
      @ticket.user = 'guest'
      Devise.cas_create_user = true
      User.authenticate_with_cas_ticket(@ticket)

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
      visit slides_path
      expect(page).not_to have_text 'Admin Panel'
      expect(page).to have_text('You do not have sufficient permissions to view this page')
    end
  end

  context 'login as admin user' do
    before do
      @ticket = CASClient::ServiceTicket.new('ST-test', nil)
      @ticket.extra_attributes = { id: 10, email: 'admin@example.com' }
      @ticket.success = true
      @ticket.user = 'admin'
      Devise.cas_create_user = true
      User.authenticate_with_cas_ticket(@ticket)

      allow_any_instance_of(User).to receive(:admin?).and_return(true)
      allow(current_user).to receive(:admin?).and_return(true)

      dist_app.write('test') unless dist_app.exist?
    end

    it 'User goes to the admin panel' do
      login_as user
      visit root_path
      click_link 'Admin Panel'
      expect(page).to have_text('Site Administration')
    end

    it 'User goes to the list of kiosk layouts page' do
      login_as user
      visit root_path
      click_link 'Admin Panel'
      within('body.rails_admin .content') do
        click_link 'Kiosk layouts'
      end
      expect(page).to have_text('List of Kiosk layouts')
    end

    it 'User goes to the list of slide types page' do
      login_as user
      visit root_path
      click_link 'Admin Panel'
      within('body.rails_admin .content') do
        click_link 'Slide types'
      end
      expect(page).to have_text('List of Slide types')
    end

    it 'User goes to the list of users page' do
      login_as user
      visit root_path
      click_link 'Admin Panel'
      within('body.rails_admin .content') do
        click_link 'Users'
      end
      expect(page).to have_text('List of Users')
    end
  end
end
