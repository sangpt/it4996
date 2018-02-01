class Service
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :type, type: String
  field :name, type: String
  field :subservices, type: String
  field :clients, type: String
  embeds_many :subservices
  has_and_belongs_to_many :clients
end
