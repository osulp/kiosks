Honeycomb.configure do |config|
  config.write_key = ENV.fetch('HONEYCOMB_WRITEKEY', 'hereisareallylonglookingkey')
  config.dataset = ENV.fetch('HONEYCOMB_DATASET', 'kiosks-dev')
  #config.presend_hook do |fields|
  #  if fields["name"] == "redis" && fields.has_key?("redis.command")
  #    # remove potential PII from the redis command
  #    if fields["redis.command"].respond_to? :split
  #      fields["redis.command"] = fields["redis.command"].split.first
  #    end
  #  end
  #  if fields["name"] == "sql.active_record"
  #    # remove potential PII from the active record events
  #    fields.delete("sql.active_record.binds")
  #    fields.delete("sql.active_record.type_casted_binds")
  #  end
  #end
  config.notification_events = %w[
    sql.active_record
    render_template.action_view
    render_collection.action_view
    process_action.action_controller
    send_file.action_controller
    send_data.action_controller
    deliver.action_mailer
  ].freeze

  config.client = Libhoney::NullClient.new if Rails.env.development? || ENV.key?("HONEYCOMB_DEBUG")
end
