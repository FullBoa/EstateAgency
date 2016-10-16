class User < ActiveRecord::Base
  extend UsersHelper
	has_many :accounts

	def fio
		fio = self.last_name + ' ' + self.first_name
    fio += (' ' + self.patronym) if self.patronym
    fio
	end
end