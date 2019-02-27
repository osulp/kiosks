# frozen_string_literal: true

RSpec.describe 'collections/edit', type: :view do
  let(:collection) { create(:collection, name: 'MyString') }

  before do
    assign(:collection, collection)
  end

  it 'renders the edit collection form' do
    render
    assert_select 'form[action=?][method=?]', collection_path(collection), 'post' do
      assert_select 'input#collection_name[name=?]', 'collection[name]'
    end
  end
end
