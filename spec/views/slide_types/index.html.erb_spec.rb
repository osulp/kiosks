# frozen_string_literal: true

RSpec.describe 'slide_types/index', type: :view do
  before do
    assign(:slide_types, [create(:slide_type), create(:slide_type, name: 'Name2')])
    render
  end

  it { expect(rendered).to match(/Name2/) }
  it { expect(rendered).to match(/Basic/) }
end
