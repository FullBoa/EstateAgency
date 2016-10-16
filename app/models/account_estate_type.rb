class AccountEstateType < ActiveRecord::Base
  self.table_name = 'accounts_estate_types'
  belongs_to :account
  belongs_to :estate_type
end
