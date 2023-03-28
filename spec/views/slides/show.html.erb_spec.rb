# frozen_string_literal: true

RSpec.describe 'slides/show', type: :view do
  before do
    assign(:slide, create(:slide))
    render
  end

  it { expect(rendered).to match(/title/) }
  it { expect(rendered).to match(/caption/) }
end
