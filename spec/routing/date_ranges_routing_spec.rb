require "rails_helper"

RSpec.describe DateRangesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/date_ranges").to route_to("date_ranges#index")
    end

    it "routes to #new" do
      expect(:get => "/date_ranges/new").to route_to("date_ranges#new")
    end

    it "routes to #show" do
      expect(:get => "/date_ranges/1").to route_to("date_ranges#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/date_ranges/1/edit").to route_to("date_ranges#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/date_ranges").to route_to("date_ranges#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/date_ranges/1").to route_to("date_ranges#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/date_ranges/1").to route_to("date_ranges#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/date_ranges/1").to route_to("date_ranges#destroy", :id => "1")
    end

  end
end
