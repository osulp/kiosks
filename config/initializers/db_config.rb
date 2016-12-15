DB_CONFIG = YAML.load(ERB.new(File.read("#{Rails.root}/config/database.yml")).result)
