class ServerRequest
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :request
  belongs_to :server
  field :action, type: String
  field :start_time, type: Time
  field :end_time, type: Time
  field :input_type, type: String
  field :output_type, type: String
  field :result_type, type: String
  field :message, type: String
  field :input, type: String
end
