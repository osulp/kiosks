require 'rails_helper'

RSpec.describe "TouchSlides", type: :request do
  describe "GET /touch_slides" do
    it "works! (now write some real specs)" do
      get touch_slides_path
      expect(response).to have_http_status(200)
    end
  end
end
