class Request
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :subservice
  belongs_to :client
  field :device_id, type: String
  field :content, type: String
  field :start_time, type: Time
  field :end_time, type: Time
  field :voice_name, type: String
  field :input_type, type: String
  field :output_type, type: String
  field :smaple_rate, type: String
  field :bit_rate, type: String
  field :status, type: String
  field :message, type: String
  field :token_number, type: Integer
  field :tts_engine_ip, type: String
  field :is_streaming, type: Mongoid::Boolean
  has_many :requests, class_name: ServerRequest.name
end
