class Subservice
  include Mongoid::Document
  include Mongoid::Timestamps
<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
  
  field :name, type: String
  field :key, type: String
  field :start_time, type: Time
  embedded_in :server
=======

  field :name, type: String
  field :key, type: String
  field :start_time, type: Time
  belongs_to :service
>>>>>>> recreate project
  has_many :requests
end
