require 'rails_helper'

RSpec.describe KiosksController, type: :controller do
  before do
    login_as nil
  end

  describe "GET #new" do
    it "show an alert" do
      get :new
      expect(flash[:alert]).to be_present
    end
  end

  describe "POST #create" do
    it "show an alert" do
      post :create
      expect(flash[:alert]).to be_present
    end
  end
end
