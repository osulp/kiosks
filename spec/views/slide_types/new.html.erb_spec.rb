# frozen_string_literal: true

RSpec.describe 'slide_types/new', type: :view do
  before do
    assign(:slide_type, build(:slide_type))
    render
  end

  it 'renders new slide_type form' do
    assert_select 'form[action=?][method=?]', slide_types_path, 'post' do
      assert_select 'input#slide_type_name[name=?]', 'slide_type[name]'
    end
  end
end
