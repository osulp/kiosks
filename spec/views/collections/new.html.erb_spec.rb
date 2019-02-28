# frozen_string_literal: true

RSpec.describe 'collections/new', type: :view do
  before do
    assign(:collection, build(:collection))
    render
  end

  it 'renders new collection form' do
    assert_select 'form[action=?][method=?]', collections_path, 'post' do
      assert_select 'input#collection_name[name=?]', 'collection[name]'
    end
  end
end
