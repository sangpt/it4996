class Api::V1::SearchController < ApplicationController
  def search_request
    @requests = Request.full_text_search(params[:q], match: :all)
  end
end