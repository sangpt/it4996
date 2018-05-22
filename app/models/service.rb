class Service
  include Mongoid::Document
  include Mongoid::Timestamps

  field :type, type: String
  field :name, type: String
  has_many :subservices
  has_and_belongs_to_many :clients
end
