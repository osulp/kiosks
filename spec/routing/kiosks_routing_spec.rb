require "rails_helper"

RSpec.describe KiosksController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/kiosks").to route_to("kiosks#index")
    end

    it "routes to #new" do
      expect(:get => "/kiosks/new").to route_to("kiosks#new")
    end

    it "routes to #show" do
      expect(:get => "/kiosks/1").to route_to("kiosks#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/kiosks/1/edit").to route_to("kiosks#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/kiosks").to route_to("kiosks#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/kiosks/1").to route_to("kiosks#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/kiosks/1").to route_to("kiosks#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/kiosks/1").to route_to("kiosks#destroy", :id => "1")
    end

  end
end
