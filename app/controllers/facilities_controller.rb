class FacilitiesController < ApplicationController

  include Databasedotcom::Rails::Controller

  # GET /facilities
  def index
    @facilities = Facility__c.all
  end

  # GET /facilities/1
  def show
    @facility = Facility__c.find(params[:id])
  end

  # GET /facilities/new
  def new
    @facility = Facility__c.new
  end

  # GET /facilities/1/edit
  def edit
    @facility = Facility__c.find(params[:id])
  end

  # POST /facilities
  def create
    @facility = Facility__c.new(params[:facility])
    @facility.OwnerId = '005E0000001T9Nv'

    if @facility.save
      redirect_to facility_path(@facility), notice: 'Facility was successfully created.'
    else
      format.html { render action: "new" }
    end
  end

  # PUT /facilities/1
  def update
    @facility = Facility__c.find(params[:id])

    begin
      @facility.update_attributes Facility__c.coerce_params(params[:facility])
    rescue Databasedotcom::SalesForceError => e
      puts 'Issue updating with record'
    end

    redirect_to facility_path(@facility), notice: 'Facility was successfully updated.' 
  end

  # GET /favorites
  def favorites
    @facilities = Facility__c.all
  end

  # GET /favorite
  def favorite
    @facility = Facility__c.find(params[:id])
  end

end
