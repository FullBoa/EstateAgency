Rails.application.routes.draw do
  devise_for :accounts, controllers: { :sessions => "accounts/sessions"}, format: false
  resources :estates, format: false
  resources :users, format: false
  get '/accounts/my' => 'accounts#my'
 # resources :accounts, format: false
  resources :login, format: false
  resources :main, format: false
  namespace :api do
    get '/helpers/pagenumber', to: 'helpers#page_number', format: false
    resources :demo_estates, only: [:index], format: false
    resources :estate_types, only: [:index], format: false
    resources :estates, only: [:show, :index, :destroy, :update, :create], format: false do
      resources :estate_revisions, only: [:index], format: false
    end
    resources :estate_revisions, only: [:show, :destroy, :update, :create], format: false

    resources :users, only: [:show, :index, :destroy, :update, :create], format: false do
      resources :accounts, only: [:index], format: false
    end
    resources :accounts, only: [:show, :destroy, :update, :create], format: false
    resources :city_areas, only: [:index], format: false
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root to: "main#index"
   #after_sign_in_path_for to: 'estates#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
