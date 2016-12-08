require "rails_helper"

RSpec.describe TouchSlidesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/touch_slides").to route_to("touch_slides#index")
    end

    it "routes to #new" do
      expect(:get => "/touch_slides/new").to route_to("touch_slides#new")
    end

    it "routes to #show" do
      expect(:get => "/touch_slides/1").to route_to("touch_slides#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/touch_slides/1/edit").to route_to("touch_slides#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/touch_slides").to route_to("touch_slides#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/touch_slides/1").to route_to("touch_slides#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/touch_slides/1").to route_to("touch_slides#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/touch_slides/1").to route_to("touch_slides#destroy", :id => "1")
    end

  end
end
