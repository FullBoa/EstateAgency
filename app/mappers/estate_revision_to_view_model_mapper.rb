class EstateRevisionToViewModelMapper < BaseMapper
  def map from
    view_model = EstateRevisionViewModel.new
    view_model.id = from.id
    view_model.created_at = from.created_at.strftime('%d.%m.%Y') unless from.created_at == nil
    view_model.account_id = from.account_id
    view_model.estate_id = from.estate_id
    view_model.revision_result = EnumHelper.get_enum_label EstateRevision.results, from.revision_result
    view_model.result_enum = EnumHelper.get_enum_value EstateRevision.results, from.revision_result
    view_model
  end
end