class Account < ActiveRecord::Base  
  extend AccountsHelper

  devise :database_authenticatable, :trackable, :session_limitable#, :timeoutable, :timeout_in => 10.minutes

	belongs_to :user
	has_many :accounts_estate_types, class_name: 'AccountEstateType'
  has_many :estate_revisions

  @@types = {
      1 => { :value => 'manager', :label => 'Менеджер'},
      2 => { :value => 'client', :label => 'Клиент'},
      3 => { :value => 'director', :label => 'Директор'}
  }

  def active?
    self and (Account.management_types.keys.include?(self.account_type) or (self.end_date.beginning_of_day > DateTime.now.beginning_of_day))
  end

  def manager?
    Account.management_types.keys.include? self.account_type 
  end

  def self.types
    @@types
  end

  def fio
    (user.last_name.to_s + ' ' + user.first_name.to_s + ' ' + user.patronym.to_s) unless user == nil
  end


  def self.management_types
    management_types = {}
    management_types[1] = @@types[1]
    management_types[3] = @@types[3]
    management_types
  end
end
