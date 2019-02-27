# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'slide_types/edit', type: :view do
  before do
    @slide_type = assign(:slide_type, SlideType.create!(
                                        name: 'MyString'
                                      ))
  end

  it 'renders the edit slide_type form' do
    render

    assert_select 'form[action=?][method=?]', slide_type_path(@slide_type), 'post' do
      assert_select 'input#slide_type_name[name=?]', 'slide_type[name]'
    end
  end
end
