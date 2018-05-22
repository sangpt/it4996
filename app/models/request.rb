class Request
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search
  include Mongoid::Paranoia

  belongs_to :app

  field :device_id, type: String
  field :start_time, type: DateTime
  field :end_time, type: DateTime
  field :voice_name, type: String
  field :input_type, type: String
  field :output_type, type: String
  field :sample_rate, type: String
  field :bit_rate, type: String
  field :status, type: Integer
  field :message, type: String
  field :token_number, type: Integer
  field :duration, type: Float
  field :tts_engine_ip, type: String
  field :app_id, type: String
  field :number_of_words, type: Integer
  field :service_name, type: String
  field :origin_text, type: String

  search_in *attribute_names

  scope :success, -> do
    # where(:start_time.ne => nil, :end_time.ne => nil)
    where(status: 1)
  end
  scope :error, -> do
    # any_of({start_time: nil}, {end_time: nil})
    where(status: 2)
  end
  scope :today, -> {where(:start_time.gte => Time.zone.now.beginning_of_day.to_i*1000)}
  scope :in_date, ->(date){
    where(:start_time => date.beginning_of_day..date.end_of_day)
  }
  scope :between_date, ->(start_date, end_date) do
    where(:start_time => start_date.beginning_of_day.to_i*1000..end_date.end_of_day.to_i*1000)
  end
  scope :from_beginning_of_month, -> do
    where(:start_time => Time.zone.now.beginning_of_month..Time.zone.now.end_of_day)
  end

  def success?
    # !(start_time == nil || end_time == nil)
    status == 1
  end

  def error?
    !success?
  end
end
