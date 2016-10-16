class EstateTypeViewModelMapper
  def map from
    view_model = EstateTypeViewModel.new
    view_model.title = from.title
    view_model.id = from.id
    view_model.client_cost =  from.cost_category.cost
    view_model
  end
end