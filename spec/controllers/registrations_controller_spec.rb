require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  before(:each) {
    @request.env["devise.mapping"] = Devise.mappings[:user]
  }
  before do
    login_as nil
  end

  describe "GET #new" do
    it "show an alert" do
      get :new
      expect(flash[:alert]).to eq "Registrations are not open."
      expect(response).to redirect_to root_path
    end
  end

  describe "POST #create" do
    it "show an alert" do
      post :create
      expect(flash[:alert]).to eq "Registrations are not open."
      expect(response).to redirect_to root_path
    end
  end
end
