require "rails_helper"

RSpec.describe KioskLayoutsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/kiosk_layouts").to route_to("kiosk_layouts#index")
    end

    it "routes to #new" do
      expect(:get => "/kiosk_layouts/new").to route_to("kiosk_layouts#new")
    end

    it "routes to #show" do
      expect(:get => "/kiosk_layouts/1").to route_to("kiosk_layouts#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/kiosk_layouts/1/edit").to route_to("kiosk_layouts#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/kiosk_layouts").to route_to("kiosk_layouts#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/kiosk_layouts/1").to route_to("kiosk_layouts#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/kiosk_layouts/1").to route_to("kiosk_layouts#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/kiosk_layouts/1").to route_to("kiosk_layouts#destroy", :id => "1")
    end

  end
end
