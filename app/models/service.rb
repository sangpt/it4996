class Service
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :apps
  has_many :units
  has_many :pay_histories

  field :name, type: String
end
