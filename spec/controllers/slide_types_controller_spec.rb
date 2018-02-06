require 'rails_helper'

RSpec.describe SlideTypesController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # SlideType. As you add validations to SlideType, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    { name: "Impact" }
  }

  let(:invalid_attributes) {
    { name: "" }
  }

  let(:user) do
    User.create(
      :email => 'user@example.com',
      :admin => true
    )
  end
  before do
    sign_in(user) if user
  end

  describe "GET #index" do
    it "assigns all slide_types as @slide_types" do
      slide_type = SlideType.create! valid_attributes
      get :index, params: {}
      expect(assigns(:slide_types)).to eq([slide_type])
    end
  end

  describe "GET #show" do
    it "assigns the requested slide_type as @slide_type" do
      slide_type = SlideType.create! valid_attributes
      get :show, params: {id: slide_type.to_param}
      expect(assigns(:slide_type)).to eq(slide_type)
    end
  end

  describe "GET #new" do
    it "assigns a new slide_type as @slide_type" do
      get :new, params: {}
      expect(assigns(:slide_type)).to be_a_new(SlideType)
    end

    context "When not logged in" do
      let(:user) { nil }
      it "should display an insufficient permissions error" do
        get :new, params: {}
        expect(flash[:alert]).to eq("You need to sign in or sign up before continuing.")
      end
      it "should redirect" do
        get :new, params: {}
        expect(response).to redirect_to user_session_path
      end
    end
    context "When logged in as a user" do
      let(:user) do
        User.create(
          :email => 'user@example.com',
        )
      end
      it "should display an insufficient permissions error" do
        get :new, params: {}
        expect(flash[:alert]).to eq("You do not have sufficient permissions to view this page")
      end
      it "should redirect" do
        get :new, params: {}
        expect(response).to redirect_to root_path
      end
    end
    context "When logged in as an admin" do
      let(:user) do
        User.create(
          :email => 'user@example.com',
          :admin => true
        )
      end
      it 'should display the admin panel' do
        get :new, params: {}
        expect(response).to be_success
      end
    end

  end

  describe "GET #edit" do
    it "assigns the requested slide_type as @slide_type" do
      slide_type = SlideType.create! valid_attributes
      get :edit, params: {id: slide_type.to_param}
      expect(assigns(:slide_type)).to eq(slide_type)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new SlideType" do
        expect {
          post :create, params: {slide_type: valid_attributes}
        }.to change(SlideType, :count).by(1)
      end

      it "assigns a newly created slide_type as @slide_type" do
        post :create, params: {slide_type: valid_attributes}
        expect(assigns(:slide_type)).to be_a(SlideType)
        expect(assigns(:slide_type)).to be_persisted
      end

      it "redirects to the created slide_type" do
        post :create, params: {slide_type: valid_attributes}
        expect(response).to redirect_to(SlideType.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved slide_type as @slide_type" do
        post :create, params: {slide_type: invalid_attributes}
        expect(assigns(:slide_type)).to be_a_new(SlideType)
      end

      it "re-renders the 'new' template" do
        post :create, params: {slide_type: invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { name: "Donors" }
      }

      it "updates the requested slide_type" do
        slide_type = SlideType.create! valid_attributes
        put :update, params: {id: slide_type.to_param, slide_type: new_attributes}
        slide_type.reload
        expect(slide_type.name).to eq("Donors")
      end

      it "assigns the requested slide_type as @slide_type" do
        slide_type = SlideType.create! valid_attributes
        put :update, params: {id: slide_type.to_param, slide_type: valid_attributes}
        expect(assigns(:slide_type)).to eq(slide_type)
      end

      it "redirects to the slide_type" do
        slide_type = SlideType.create! valid_attributes
        put :update, params: {id: slide_type.to_param, slide_type: valid_attributes}
        expect(response).to redirect_to(slide_type)
      end
    end

    context "with invalid params" do
      it "assigns the slide_type as @slide_type" do
        slide_type = SlideType.create! valid_attributes
        put :update, params: {id: slide_type.to_param, slide_type: invalid_attributes}
        expect(assigns(:slide_type)).to eq(slide_type)
      end

      it "re-renders the 'edit' template" do
        slide_type = SlideType.create! valid_attributes
        put :update, params: {id: slide_type.to_param, slide_type: invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end
end
