class Client
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # field :username, type: String
  field :name, type: String
  # field :email, type: String
  field :email, type: String, default: ""
  field :encrypted_password, type: String, default: ""
  field :access_token, type: String, default: ""

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

  def apps
    App.where(client_id: client_id) if client_id
  end

  def requests
    Request.where(:app_id.in => apps.pluck(:app_id)) if apps
  end

  class << self
    def test
      find_by email: 'client@gmail.com'
    end
  end
end
