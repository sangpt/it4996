class User
	include Mongoid::Document

	field :email, type: String
	field :access_token, type: String
	field :user_id, type: String
end