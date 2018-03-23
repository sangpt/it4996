class Server
  include Mongoid::Document
  include Mongoid::Timestamps

  field :server, type: String
  field :database, type: String
  field :username, type: String
  field :password, type: String
  has_many :requests, class_name: ServerRequest.name

  before_save ->{self.password = PasswordEncrypt::AES256.encode(password, server).bytes}

  def decode_password
    PasswordEncrypt::AES256.decode binary_password, server
  end

  private

  def binary_password
    eval(password).pack("c*")
  end
end
