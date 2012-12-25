require 'chronic'
class EventsController < ApplicationController
  # GET /events
  # GET /events.json
  def index
    @events = Event.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @events }
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])
    @guests_names = @event.guests.find(:all, :select => "name")
    @guests_dishes = @event.guests.find(:all, :select => "dishes")
    @guests_cash = @event.guests.find(:all, :select => "bringing_cash")

    @email_link = "mailto:?subject= " + @event.name + 
      "&body=Hey All,%0A%0AYour invited to " + @event.name + 
      ". I wan't to know who can make it.%0A%0APlease visit " + event_url(@event) +
      " to let me if you're coming and what you can pitch in.%0A%0AThanks,%0A" + 
      @event.who

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/new
  # GET /events/new.json
  def new
    @event = Event.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
  end


  # GET /events/1/rsvp
  def rsvp
    @event = Event.find(params[:id])
  end


  # POST /events
  # POST /events.json
  def create
     puts params[:event]

     Time.zone = "Eastern Time (US & Canada)"
     Chronic.time_class = Time.zone
     params[:event][:datec]=Chronic::parse(params[:event][:datec])
     puts "********flubderb****************"
     

    @event = Event.new(params[:event])

    


    respond_to do |format|
      if @event.save
        Notifications.new_event(@event).deliver
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render json: @event, status: :created, location: @event }
      else
        format.html { render action: "new" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end

  end

  # PUT /events/1
  # PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to @event, notice: 'Event was successfully updated.', share: 'sharing_time' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
    end
  end
end
