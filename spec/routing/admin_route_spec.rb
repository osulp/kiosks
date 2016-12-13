require 'rails_helper'
require 'spec_helper'

RSpec.describe 'admin panel' do
  it 'routes /admin to admin#index' do
    expect(get("/admin")).to route_to :controller => 'admin', :action => 'index'
  end
end
