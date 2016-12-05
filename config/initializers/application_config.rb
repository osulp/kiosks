APPLICATION_CONFIG = YAML.load(ERB.new(File.read("#{Rails.root}/config/application_config.yml.erb")).result)
