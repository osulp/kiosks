# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SlideTypesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/slide_types').to route_to('slide_types#index')
    end

    it 'routes to #new' do
      expect(get: '/slide_types/new').to route_to('slide_types#new')
    end

    it 'routes to #show' do
      expect(get: '/slide_types/1').to route_to('slide_types#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/slide_types/1/edit').to route_to('slide_types#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/slide_types').to route_to('slide_types#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/slide_types/1').to route_to('slide_types#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/slide_types/1').to route_to('slide_types#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/slide_types/1').to route_to('slide_types#destroy', id: '1')
    end
  end
end
