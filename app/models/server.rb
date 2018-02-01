class Server
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :server, type: String
  field :database, type: String
  field :username, type: String
  field :password, type: String
  has_many :requests, class_name: ServerRequest.name
end
