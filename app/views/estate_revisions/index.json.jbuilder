json.array!(@estate_revisions) do |estate_revision|
  json.extract! estate_revision, :id
  json.url estate_revision_url(estate_revision, format: :json)
end
