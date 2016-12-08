require "rails_helper"

RSpec.describe SlidesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/slides").to route_to("slides#index")
    end

    it "routes to #new" do
      expect(:get => "/slides/new").to route_to("slides#new")
    end

    it "routes to #show" do
      expect(:get => "/slides/1").to route_to("slides#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/slides/1/edit").to route_to("slides#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/slides").to route_to("slides#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/slides/1").to route_to("slides#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/slides/1").to route_to("slides#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/slides/1").to route_to("slides#destroy", :id => "1")
    end

  end
end
