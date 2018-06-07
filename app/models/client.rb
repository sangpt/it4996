class Client
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :apps
  has_many :users
  has_many :pay_histories
  has_many :units
  # has_many :units

  # field :username, type: String
  field :name, type: String
  # field :email, type: String
  field :email, type: String, default: ""
  field :encrypted_password, type: String, default: ""
  field :credit, type: Float, default: 0

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  # field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  field :client_id, type: Integer

  has_and_belongs_to_many :services
  # has_many :requests
  # has_many :apps, class_name: App.name, inverse_of: :client_id

  def requests
    Request.where(:app.in => apps.pluck(:id)) if apps
  end

  class << self
    def test
      find_by email: 'client@gmail.com'
    end
  end
end
