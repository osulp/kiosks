# frozen_string_literal: true

RSpec.describe 'slide_types/show', type: :view do
  before do
    assign(:slide_type, create(:slide_type))
    render
  end

  it { expect(rendered).to match(/Basic/) }
end
