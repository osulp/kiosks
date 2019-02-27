# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'collections/index', type: :view do
  before do
    assign(:collections, [
             Collection.create!(
               name: 'Name'
             ),
             Collection.create!(
               name: 'Name'
             )
           ])
  end

  it 'renders a list of collections' do
    render
    assert_select 'tr>td', text: 'Name'.to_s, count: 2
  end
end
