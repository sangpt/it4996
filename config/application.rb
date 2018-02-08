require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
# require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
# require "sprockets/railtie"
=======
require "sprockets/railtie"
>>>>>>> recreate project
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
module Hust
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    # config.autoload_paths << "#{Rails.root}/lib"
=======
module NoApiHust
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
>>>>>>> recreate project
    config.autoload_paths += [Rails.root.join("lib")]

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
<<<<<<< b953c1f04488544f75764d6e9405cd732880740c

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
=======
>>>>>>> recreate project
  end
end
