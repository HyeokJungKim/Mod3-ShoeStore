class ReviewsController < ApplicationController
  
  def create
    @shoe = Shoe.find_by(id: params[:shoe_id])
    if @shoe
      @review = Review.create(content: params[:content], shoe: @shoe)
      render json: @review, status: 201
    else
      render json: {error: "Shoe not found"}, status: 404
    end
  end

end
