class Subservice
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :key, type: String
  field :start_time, type: Time
  belongs_to :service
  has_many :requests
end
