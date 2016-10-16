# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

# StyleSheetsBundles
Rails.application.config.assets.precompile += %w( Bundles/users.css )
Rails.application.config.assets.precompile += %w( Bundles/estates.css )
Rails.application.config.assets.precompile += %w( Bundles/authorization-page.css )
Rails.application.config.assets.precompile += %w( Bundles/main.css )

#JavaScriptBundles
Rails.application.config.assets.precompile += %w( Bundles/users.js )
Rails.application.config.assets.precompile += %w( Bundles/estates.js )
Rails.application.config.assets.precompile += %w( Bundles/main.js )

