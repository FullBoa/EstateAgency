json.array!(@estates) do |estate|
  json.extract! estate, :id
  json.url estate_url(estate, format: :json)
end
