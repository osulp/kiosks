# frozen_string_literal: true

RSpec.describe 'kiosks/show', type: :view do
  before do
    assign(:kiosk, create(:kiosk))
    render
  end

  it { expect(rendered).to match(/touch/) }
  it { expect(rendered).to match(/2/) }
  it { expect(rendered).to match(/circ/) }
end
