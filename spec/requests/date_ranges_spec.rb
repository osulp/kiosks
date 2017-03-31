require 'rails_helper'

RSpec.describe "DateRanges", type: :request do
  describe "GET /date_ranges" do
    it "works! (now write some real specs)" do
      get date_ranges_path
      expect(response).to have_http_status(200)
    end
  end
end
