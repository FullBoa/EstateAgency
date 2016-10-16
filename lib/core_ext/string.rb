class String
  def self.is_nil_or_empty? value
    value == nil or value.blank? or value.empty?
  end
end