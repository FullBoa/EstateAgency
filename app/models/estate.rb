class Estate < ActiveRecord::Base
  extend EstatesHelper
  #include ActiveModel::Dirty
  belongs_to :estate_type
  belongs_to :city_area
  has_many :estate_revisions
  before_create :record_date


  def self.default_order
    {:actualized_at => 'DESC'}
  end

=begin
  def self.default_scope
    order self.default_order
  end
=end


  @@includes = [:estate_type, :city_area]
  @@statuses = {
      1 => { :value => 'actual', :label => 'актуальный'},
      2 => { :value => 'archive', :label => 'архивный'}
  }

  def self.includes
  	@@includes
  end

  def self.statuses
    @@statuses
  end

  protected
  def record_date
    self.created_at = Time.now
    self.actualized_at = self.created_at
  end
end
