class EstateRevision < ActiveRecord::Base
	belongs_to :account
	belongs_to :estate
  after_create :set_estate_actualized_date

  @@includes = [:estate, :account => [:user]]
  @@revision_results = {
      1 => { :value => 'for_rent', :label => 'Сдается'},
      3 => { :value => 'not_rent_more', :label => 'Не сдается'}
  }
  def self.includes
    @@includes
  end

  def self.results
    @@revision_results
  end

  protected

  def set_estate_actualized_date
    self.estate.actualized_at = self.created_at
    self.estate.save
  end
end
