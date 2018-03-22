class Admin::PagesController < AdminController
  def index
    @clients = Client.all.to_a
  end
end
