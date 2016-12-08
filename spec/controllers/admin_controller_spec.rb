require 'rails_helper'
require 'spec_helper'
RSpec.describe AdminController, type: :controller do
  describe "#index" do
    let(:user) {nil}
    before do
      sign_in(user) if user
      get :index
    end

    context "When not logged in" do
      it "should display an insufficient permissions error" do
        expect(flash[:alert]).to eq("You do not have sufficient permissions to view this page")
      end
      it "should redirect" do
        expect(response).to redirect_to kiosks_path
      end
    end
    context "When logged in as a user" do
      let(:user) do
        User.create(
          :email => 'user@example.com',
          :password => 'admin123',
          :password_confirmation => 'admin123'
        )
      end
      it "should display an insufficient permissions error" do
        expect(flash[:alert]).to eq("You do not have sufficient permissions to view this page")
      end
      it "should redirect" do
        expect(response).to redirect_to kiosks_path
      end
    end
    context "When logged in as an admin" do
      let(:user) do
        User.create(
          :email => 'user@example.com',
          :password => 'admin123',
          :password_confirmation => 'admin123',
          :admin => true
        )
      end
      it 'should display the admin panel' do
        expect(response).to be_success
      end
    end
  end
end
