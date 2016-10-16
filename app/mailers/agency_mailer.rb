class AgencyMailer < ActionMailer::Base
	default from: 'alkor62.notification@gmail.com'
	before_action :set_director_emails

	def account_registered_email account, creator_account
		@account = account
		@creator_account = creator_account
		mail(to: @director_emails, subject: 'Новый аккаунт создан')
	end

  def manager_password_rotated_email manager_passwords
		@managers = {}
		manager_passwords.each do |id, password|
			manager = Account.find id
			@managers[manager.login] = {:password => password, :user_name => manager.user.fio}
		end
		mail(to: @director_emails, subject: 'Изменение паролей')
	end

  private

  def set_director_emails
		director_accounts = Account.where(:account_type => 3)
		@director_emails = director_accounts.collect do |account|
		  account.email if account.email.present?
		end
	end
end