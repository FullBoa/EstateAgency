class AddActualizedAtToEstates < ActiveRecord::Migration
  def change
    add_column :estates, :actualized_at, :datetime

    reversible do |t|

    	t.up do
	    	Estate.find_each do |estate|
	    		if estate.estate_revisions.any?
	    			estate.actualized_at = estate.estate_revisions.order(:created_at).last.created_at
	    		else
	    			estate.actualized_at = estate.created_at
	    		end
	    		estate.save
	    	end
	    end

	    t.down do
	    end

    end
  end
end
