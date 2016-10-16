class PasswordRotationJob < ActiveJob::Base
  def perform
    managers = Account.where(:account_type => 1)
    sending_data = {}
    managers.each do |manager|
      new_password = Account.generate_password
      manager.password = new_password
      sending_data[manager.id] = new_password
      manager.save
    end

    AgencyMailer.manager_password_rotated_email(sending_data).deliver_now
  end
end