# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base

  helper :all # include all helpers, all the time
  
  # make methods available to views
  helper_method :logged_in?, :current_user_session, :current_user
  
  # See ActionController::RequestForgeryProtection for details
  protect_from_forgery
  
  rescue_from CanCan::AccessDenied do |exception|
    #TODO: three options. 1-throw 403. 2-message explaining problem. 3-need to log in page
    flash[:error] = exception.message
    current_user ? redirect_to(root_url) : redirect_to(login_url)
  end
  
  def logged_in?
    !current_user_session.nil?
  end

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end

private
  def require_user
    unless current_user
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to new_user_session_url
      return false
    end
  end

  def require_no_user
    if current_user
      store_location
      flash[:notice] = "You must be logged out to access this page"
      redirect_to account_url
      return false
    end
  end
  
  def store_location
    session[:return_to] = request.request_uri
  end
  
  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end
end
