# frozen_string_literal: true

RSpec.describe 'collections/edit', type: :view do
  let(:collection) { create(:collection) }

  before do
    assign(:collection, collection)
    render
  end

  it 'renders the edit collection form' do
    assert_select 'form[action=?][method=?]', collection_path(collection), 'post' do
      assert_select 'input#collection_name[name=?]', 'collection[name]'
    end
  end
end
