# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store, key: '_estate_agency_session'
Dir[File.join(Rails.root, "lib", "core_ext", "*.rb")].each {|l| require l }

