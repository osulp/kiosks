require 'rails_helper'

RSpec.describe "KioskLayouts", type: :request do
  describe "GET /kiosk_layouts" do
    it "works! (now write some real specs)" do
      get kiosk_layouts_path
      expect(response).to have_http_status(200)
    end
  end
end
