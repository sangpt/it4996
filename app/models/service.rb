class Service
  include Mongoid::Document
  include Mongoid::Timestamps
<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
  
  field :type, type: String
  field :name, type: String
  field :subservices, type: String
  field :clients, type: String
  embeds_many :subservices
=======

  field :type, type: String
  field :name, type: String
  has_many :subservices
>>>>>>> recreate project
  has_and_belongs_to_many :clients
end
