class DataObjectsController < ApplicationController

  def create
    # parse JSON?
    binding.pry
    @data_object = Data_object.new()
    redirect_to root
  end


end
