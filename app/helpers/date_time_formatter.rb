class DateTimeFormatter
  def self.short_date formatted_date
    if formatted_date != nil
      formatted_date.strftime('%d.%m.%Y')
    else
      ''
    end
  end
end