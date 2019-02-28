# frozen_string_literal: true

RSpec.describe 'collections/index', type: :view do
  before do
    assign(:collections, [create(:collection), create(:collection, name: 'Name2')])
    render
  end

  it { expect(rendered).to match(/Name2/) }
  it { expect(rendered).to match(/Impact/) }
end
