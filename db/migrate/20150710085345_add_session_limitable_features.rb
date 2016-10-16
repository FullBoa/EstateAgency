class AddSessionLimitableFeatures < ActiveRecord::Migration
  change_table(:accounts) do |t|

  t.string :unique_session_id, :limit => 20
	end
end
