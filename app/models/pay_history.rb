class PayHistory
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  belongs_to :client
  # belongs_to :service
  belongs_to :unit

  field :start_date, type: Date
  field :end_date, type: Date
  field :type, type: String
  field :total, type: Float
  field :cash, type: Float
  field :credit, type: Float
  field :after_credit, type: Float
end
