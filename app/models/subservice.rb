class Subservice
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :key, type: String
  field :start_time, type: Time
  embedded_in :server
  has_many :requests
end
