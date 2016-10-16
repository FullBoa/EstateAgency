class AddEmailToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :email, :string
    add_index :accounts, :email
  end
end
