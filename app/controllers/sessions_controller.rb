class SessionsController < ApplicationController
	def index
		client = User.find_by access_token: params[:access_token]
		# binding.pry
		render json: {
			status: 1,
			client: client
		}
	rescue
		# binding.pry
		render json: {
			status: 0
		}
	end

	def create
		return unless params[:access_token]
		user = User.find_or_create_by user_id: params[:user_id]
		user.update_attributes access_token: params[:access_token]
		render json: {
			user: user
		}
	end
end