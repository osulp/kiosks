require 'rails_helper'

RSpec.describe "collections/show", type: :view do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }
  before(:each) do
    @collection = assign(:collection, Collection.create!(
      :name => "Name"
    ))
    @default_kiosk = assign(:default_kiosk, Kiosk.create!(
      :name => "touch", kiosk_layout_id: test_layout.id
    ))
    @default_slide_type = assign(:default_slide_type, SlideType.create!(
      :name => "Basic"
    ))
    @kiosk_options = assign(:kiosk_options, {@default_kiosk.name => @default_kiosk.id } )
    @kiosks = assign(:kiosks, [@default_kiosk])
    @slide_type_options = assign(:slide_type_options, {@default_slide_type.name => @default_slide_type.id})
  end

  it "renders attributes in <p>" do
    # set default values
    Kiosk.create!(:name => "touch", :kiosk_layout_id => test_layout.id)
    SlideType.create!(:name => "Basic")
    render
    expect(rendered).to match(/Name/)
  end
end
