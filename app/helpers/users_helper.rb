module UsersHelper
  def build_estate_query query_params

    query = User.where(:is_deleted => false)

    if query_params.has_key? :search and query_params[:search].length > 0
      search = query_params[:search]
      query = query.where("first_name like '%#{search}%' " +
                          " or last_name like '%#{search}%'" +
                          " or patronym like '%#{search}%'" +
                          " or phone_number like '%#{search}%'")
    end

    query
  end
end
