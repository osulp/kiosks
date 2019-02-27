# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'collections/new', type: :view do
  before do
    assign(:collection, Collection.new(
                          name: 'MyString'
                        ))
  end

  it 'renders new collection form' do
    render

    assert_select 'form[action=?][method=?]', collections_path, 'post' do
      assert_select 'input#collection_name[name=?]', 'collection[name]'
    end
  end
end
