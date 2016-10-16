module AccountsHelper
  def generate_account_credentials params
    credentials = {}
    user = User.find_by(id: params[:user_id])
    credentials[:login] = 'Alkor'
    generated_password = generate_password
    credentials[:password] = generated_password
    credentials
  end

  def generate_password
    Devise.friendly_token.first(8)
  end
end
