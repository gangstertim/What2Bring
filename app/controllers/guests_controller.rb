class GuestsController < ApplicationController

  # before_filter :authenticate_event!

  #before_filter do 
  #  @events=Event.all
  # end

  #def guests
  #  @event.guests.create
  #end

  
  def guests
    @event = Event.find(params[:event_id]);
    @event.guests
  end

  # GET /guests
  # GET /guests.json
  def index
    @guests = Guest.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @guests }
    end
  end

  # GET /guests/1
  # GET event/:event_id/guests/1.json
  def show
    @guest = Guest.find(params[:event_id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @guest }
    end
  end


  # GET events/:event_id/guests/new
  # GET /guests/new.json
  def new
   @guest = guests.build
   # @event = Event.find(params[:event_id]);
   #@guest = @event.guests.build #@event_guests.build
   
   # @guest = Guest.new(@event.id)

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @guest }
    end
  end

  # GET /guests/1/edit
  def edit
    @guest = Guest.find(params[:id])
    @events = Event.all
  end

  # POST /guests
  # POST event/:event_id/guests.json
  def create
    
    #@guest = Guest.find(params[:id])
    @guest = Guest.new(params[:guest])
    @guest.event = Event.find(params[:event_id])
    
    @event = Event.find(params[:event_id])
    temp =  @event.dishes_temp
    @event.dishes_temp = @event.dishes_temp + params[:guest][:dishes]
    @event.save

    respond_to do |format|
      if @guest.save
        format.html { redirect_to @guest.event, notice: 'Guest was successfully created.' }
        format.json { render json: @guest.event, status: :created, location: @event }
      else
        format.html { render action: "new" }
        format.json { render json: @guest.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /guests/1
  # PUT /guests/1.json
  def update
    @guest = Guest.find(params[:id])

    respond_to do |format|
      if @guest.update_attributes(params[:guest])
        format.html { redirect_to @guest, notice: 'Guest was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @guest.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guests/1
  # DELETE /guests/1.json
  def destroy
    @guest = Guest.find(params[:id])
    @guest.destroy

    respond_to do |format|
      format.html { redirect_to guests_url }
      format.json { head :no_content }
    end
  end
end
