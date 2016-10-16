class AddAccountCreator < ActiveRecord::Migration
  def change
    add_column :accounts, :creator_id, :integer

    add_foreign_key :accounts, :accounts, column: :creator_id

  end
end
