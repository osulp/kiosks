require 'spec_helper'

RSpec.describe "admin/index.html.erb" do
  it 'should display a link to review entries' do
    render
    expect(rendered).to match /Manage Slides/
    expect(rendered).to match /Manage Slide Types/
    expect(rendered).to match /Manage Kiosks/
  end
end
