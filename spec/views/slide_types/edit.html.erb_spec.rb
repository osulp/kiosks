# frozen_string_literal: true

RSpec.describe 'slide_types/edit', type: :view do
  let(:slide_type) { create(:slide_type) }

  before do
    assign(:slide_type, slide_type)
    render
  end

  it 'renders the edit slide_type form' do
    assert_select 'form[action=?][method=?]', slide_type_path(slide_type), 'post' do
      assert_select 'input#slide_type_name[name=?]', 'slide_type[name]'
    end
  end
end
