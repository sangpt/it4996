class Client
<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
  include ActiveModel::SecurePassword
  include Mongoid::Document
  include Mongoid::Timestamps
  
  has_secure_password
  field :username, type: String
  field :password_digest, type: String
=======
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  field :username, type: String
  field :email, type: String
  field :password_digest, type: String
  field :email, type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

>>>>>>> recreate project
  has_and_belongs_to_many :services
  has_many :requests
end
