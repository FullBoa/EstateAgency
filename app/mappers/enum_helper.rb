  class EnumHelper
    def self.get_enum_value enum, hash_value
      value = enum[hash_value][:value] if enum.has_key? hash_value
      value
    end
    def self.get_enum_label enum, hash_value
      label = enum[hash_value][:label] if enum.has_key? hash_value
      label
    end

    def self.get_enum_hash_by_value enum, value
      hash_value = enum.keys.find{|key| enum[key][:value] == value}
      hash_value
    end
  end
