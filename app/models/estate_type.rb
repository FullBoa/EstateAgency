class EstateType < ActiveRecord::Base
  has_many :estates
	has_many :accounts_estate_types, class_name: 'AccountEstateType'
  belongs_to :cost_category
  @@includes = [:cost_category]

  def self.includes
    @@includes
  end
end
