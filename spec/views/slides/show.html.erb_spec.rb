# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'slides/show', type: :view do
  before do
    @slide = assign(:slide, Slide.create!(
                              title: 'title test 1',
                              caption: 'caption test 1',
                              slide_type: SlideType.create(name: 'test slide type'),
                              collection: Collection.create(name: 'generic'),
                              image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
                            ))
  end

  it 'renders attributes in <p>' do
    render
    expect(rendered).to match(/title test 1/)
    expect(rendered).to match(/caption test 1/)
  end
end
