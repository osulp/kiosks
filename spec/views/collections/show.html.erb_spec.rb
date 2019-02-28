# frozen_string_literal: true

RSpec.describe 'collections/show', type: :view do
  let(:test_layout) { create(:kiosk_layout) }
  let(:default_kiosk) { create(:kiosk, name: 'touch', kiosk_layout: test_layout) }
  let(:default_slide_type) { create(:slide_type, name: 'Basic') }

  before do
    assign(:collection, create(:collection, name: 'Name'))
    assign(:default_kiosk, default_kiosk)
    assign(:default_slide_type, default_slide_type)
    assign(:kiosk_options, default_kiosk.name => default_kiosk.id)
    assign(:kiosks, [default_kiosk])
    assign(:slide_type_options, default_slide_type.name => default_slide_type.id)
    render
  end

  it { expect(rendered).to match(/Name/) }
end
