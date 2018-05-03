class App
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :client
  # has_many :requests, class_name: Request.name, inverse_of: :app_id
  field :app_id, type: String
  field :app_name, type: String
  field :service_id, type: String
  field :sub_service_id, type: String

  def requests
    Request.where app_id: app_id
  end
end
