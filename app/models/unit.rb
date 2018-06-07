class Unit
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  # belongs_to :client
  # belongs_to :service
  has_many :pay_histories

  field :type, type: String
  field :price, type: Float
end
