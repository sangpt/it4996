class Unit
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  belongs_to :client
  belongs_to :service

  field :type, type: String
  field :price, type: Float
end
