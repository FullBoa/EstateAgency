class UserViewModelMapper < BaseMapper
  @account_mapper

  def initialize
    @account_mapper = AccountViewModelMapper.new
  end

  def map from
    view_model = UserViewModel.new
    view_model.id = from.id
    view_model.first_name = from.first_name
    view_model.last_name = from.last_name
    view_model.patronym = from.patronym
    view_model.phone_number = from.phone_number
    view_model.accounts = from.accounts.collect do |account|
      @account_mapper.map account
    end
    view_model
  end
end