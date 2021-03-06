class GlobalDataObjectsController < ApplicationController

  def index
    if logged_in?
      @user = User.find_by(id: session[:user_id])
      @global_data_object = GlobalDataObject.last
      @local_data_object = LocalDataObject.last
    else
      render 'shared/404'
    end
  end

  def create
    if logged_in?
      if params[:response][:data_valid] == "true"
        @global_data_object = GlobalDataObject.create(global_data_object_params)
        @global_data_object.city = params[:city]
        @global_data_object.state = params[:state]
        @global_data_object.save
        redirect_to root_path
      else
        redirect_to root_path
      end
    end
  end

  def show
    @global_data_object = GlobalDataObject.find(params[:id])
  end

private
  def global_data_object_params
    params.require(:response).permit(
                                     :country_name,
                                     :datetime,
                                     :breezometer_aqi,
                                     :breezometer_description,
                                     :dominant_pollutant_description,
                                     dominant_pollutant_text: [:effects])
  end
end
