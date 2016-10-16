class Accounts::SessionsController < Devise::SessionsController
before_filter :configure_sign_in_params, only: [:create]
before_action :set_account, only: [:create]

  def new
    super
  end

  def create
    if @account and @account.active?
      super
      set_cookies
    else
    	if not @account or not @account.valid_password?(params[:account][:password])
    		flash[:alert] = I18n.t "devise.failure.not_found_in_database" 
    	elsif @account and not @account.active?  
    		flash[:alert] = 'Истёк срок действия аккаунта' 
    	end	
      redirect_to new_account_session_path
    end
  end

  def destroy
    super
    set_cookies
  end

  protected
  # You can put the params you want to permit in the empty array.
  def configure_sign_in_params
    devise_parameter_sanitizer.for(:sign_in) << :attribute
  end

  private
  def set_account
    @account = Account.find_by login: params[:account][:login] if params.has_key? :account
  end
end
