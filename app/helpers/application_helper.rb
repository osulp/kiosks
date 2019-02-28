# frozen_string_literal: true

# Helpers to generate links and partials
module ApplicationHelper
  def link_to_add_date_ranges(name, f, association)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render partial: 'slides/' + association.to_s.singularize + '_fields', locals: { f: builder }
    end
    link_to(name, '#', class: 'add_fields btn btn-success', data: { id: id, fields: fields.delete("\n") })
  end

  def link_to_add_date_ranges_new_collection(name, f, association, fid)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render partial: 'slides/' + association.to_s.singularize + '_fields', locals: { f: builder }
    end

    # this link is customized given the id of the uploaded file (fid) and the newly
    # generated instance, also extended, taking into account the collection-slide
    # relationship
    link_to(name, '#', class: 'add_fields btn btn-success', data: {
              id: id,
              fields: fields.delete("\n").gsub('slide_date_ranges_attributes', 'collection_slides_attributes_' + fid + '_date_ranges_attributes').gsub('slide[date_ranges_attributes]', 'collection[slides_attributes][' + fid + '][date_ranges_attributes]')
            })
  end
end
