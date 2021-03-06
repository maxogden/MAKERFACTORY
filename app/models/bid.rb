class Bid < ActiveRecord::Base
  belongs_to :creator, :class_name => 'User'
  belongs_to :job
  
  validates_uniqueness_of :job_id, :scope => :creator_id, :message => "You can't bid on the same job more than once."
  validates_presence_of :message, :message => 'shouldn\'t be empty'
  validates_length_of :message, :within => 0..333, :message => 'must be less than 333 characters.'
  validates_presence_of :quantity
  validates_numericality_of :quantity, :greater_than => 0
  validate :validate_quantity, :validate_nonownership
  
  after_create :notify_job_owner
  
  def notify_job_owner
    Notifier.bid_notification(self).deliver
  end
  
  def validate_quantity
    if self.quantity && (self.quantity > self.job.quantity_needed)
      errors.add(:quantity, "can't be more than the job is asking for")
    end
  end
  
  def validate_nonownership
    if self.job.creator == self.creator
      errors.add(:creator, "You can't bid on your own job.")
    end
  end
  
  def award!
    self.awarded = true
    if self.save
      Notifier.bid_award_notification(self).deliver
    end
  end
end
