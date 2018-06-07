class App
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  belongs_to :client
  belongs_to :service
  has_many :requests, dependent: :destroy
  # has_many :requests, class_name: Request.name, inverse_of: :app_id
  field :app_id, type: String
  field :name, type: String

  # def requests
  #   Request.where app_id: app_id
  # end
end
