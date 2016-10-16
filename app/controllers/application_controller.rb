class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  public

  protect_from_forgery with: :exception
  # after_action :set_cookies

  def after_sign_in_path_for(resource)
    estates_path
  end

  protected

  def manager_account!
    unless current_account and current_account.manager?
      render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false)
    end
  end

  def active_account!
    unless current_account and current_account.active?
      render(:file => File.join(Rails.root, 'public/401.html'), :status => 401, :layout => false)
    end
  end

  def set_cookies
    if account_signed_in?
      account_mapper = AccountViewModelMapper.new
      account = account_mapper.map current_account
      cookies[:account] = {:value => {
          :id => current_account.id,
          :type => EnumHelper.get_enum_value(Account.types, current_account.account_type)
      }.to_json, :expires => 2.months.from_now}
    else
      cookies.delete(:account)
    end
  end

  def render_json (result, includes = nil)
    render json: result, include: includes
  end
end
