class Client
  include ActiveModel::SecurePassword
  include Mongoid::Document
  include Mongoid::Timestamps
  
  has_secure_password
  field :username, type: String
  field :password_digest, type: String
  has_and_belongs_to_many :services
  has_many :requests
end
