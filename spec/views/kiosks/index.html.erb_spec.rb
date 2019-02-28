# frozen_string_literal: true

RSpec.describe 'kiosks/index', type: :view do
  before do
    assign(:kiosks, [create(:kiosk), create(:kiosk, name: 'Name2')])
    render
  end

  it { expect(rendered).to match(/Name2/) }
  it { expect(rendered).to match(/circ/) }
end
