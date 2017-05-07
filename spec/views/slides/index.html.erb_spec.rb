require 'rails_helper'

RSpec.describe "slides/index", type: :view do
  before(:each) do
    assign(:slides, [
      Slide.create!(
        :title => "title test 1",
        :caption => "caption test 1",
        :slide_type => SlideType.create(name: "test slide type"),
        :collection => Collection.create(name: "generic"),
        :image => Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg'),
      ),
      Slide.create!(
        :title => "title test 2",
        :caption => "caption test 2",
        :slide_type => SlideType.create(name: "test slide type"),
        :collection => Collection.create(name: "generic"),
        :image => Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg'),
      )
    ])
  end

  it "renders a list of slides" do
    render
    expect(rendered).to match /caption test 1/
    expect(rendered).to match /caption test 2/
    expect(rendered).to match /title test 1/
    expect(rendered).to match /title test 2/
    expect(rendered).to match /generic/
  end
end
