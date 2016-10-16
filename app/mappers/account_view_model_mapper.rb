class AccountViewModelMapper < BaseMapper
  def map from
    if from == nil
      nil
    else
      view_model = AccountViewModel.new
      view_model.id = from.id
      view_model.login = from.login
      view_model.start_date = DateTimeFormatter.short_date from.start_date
      view_model.end_date = DateTimeFormatter.short_date from.end_date
      view_model.days_left = (from.end_date.beginning_of_day - Time.now.beginning_of_day).to_i / 1.day + 1 unless from.end_date == nil
      view_model.user_id = from.user_id
      view_model.fio = from.user.fio if from.user
      view_model.account_type = EnumHelper.get_enum_label Account.types, from.account_type
      view_model.account_type_enum = EnumHelper.get_enum_value Account.types, from.account_type
      view_model.is_manager = from.account_type == 1 || from.account_type == 3
      view_model.client_cost = from.client_cost
      view_model.estate_types = from.accounts_estate_types.collect do |account_estate_type|
        account_estate_type.estate_type
      end
      view_model
    end
  end
end