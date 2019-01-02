require 'rails_helper'
require 'rack/test'

RSpec.describe SlidesController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Slide. As you add validations to Slide, be sure to
  # adjust the attributes here as well.
  #
  let(:slide_type_test) { SlideType.create(name: "Basic") }
  let(:kiosk_layout_test) { KioskLayout.create(name: "circulation") }
  let(:kiosk_test) { Kiosk.create(name: "touch", kiosk_layout_test_id: kiosk_layout_test.id) }

  let(:collection_test) { Collection.create(name: "generic") }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
  let(:valid_attributes) {
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: "test caption", title: "test title", 
      slide_type_id: slide_type_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  }

  let(:invalid_attributes) {
    { caption: "", title: "" }
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
    it "assigns all slides as @slides" do
      slide = Slide.create! valid_attributes
      get :index, params: {}
      expect(assigns(:slides)).to eq([slide])
    end
  end

  describe "GET #show" do
    it "assigns the requested slide as @slide" do
      slide = Slide.create! valid_attributes
      get :show, params: {id: slide.to_param}
      expect(assigns(:slide)).to eq(slide)
    end
  end

  describe "GET #new" do
    it "assigns a new slide as @slide" do
      get :new, params: {}
      expect(assigns(:slide)).to be_a_new(Slide)
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
    it "assigns the requested slide as @slide" do
      slide = Slide.create! valid_attributes
      get :edit, params: {id: slide.to_param}
      expect(assigns(:slide)).to eq(slide)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      let(:valid_attributes) {
        {
          expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
          caption: "test caption", title: "test title",
          slide_type_id: slide_type_test.id,
          collection_id: collection_test.id
        }
      }
      let(:test_files) {
        [test_file]
      }

      it "creates a new Slide" do
        expect {
          post :create, params: {slide: valid_attributes, files: test_files}
        }.to change(Slide, :count).by(1)
      end

      it "assigns a newly created slide as @slide" do
        post :create, params: {slide: valid_attributes, files: test_files, :format => 'json'}
        expect(assigns(:slide)).to be_a(Slide)
        expect(assigns(:slide)).to be_persisted
      end

      it "redirects to the created slide" do
        post :create, params: {slide: valid_attributes, files: test_files}
        expect(response).to redirect_to(Slide.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved slide as @slide" do
        post :create, params: {slide: invalid_attributes}
        expect(assigns(:slide)).to be_a_new(Slide)
      end

      it "re-renders the 'new' template" do
        post :create, params: {slide: invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        {
          expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
          caption: "test update caption", title: "test update title", 
          slide_type_id: slide_type_test.id,
          kiosk_ids: [test_kiosk.id],
          image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
        }
      }

      let(:test_kiosk) {
        Kiosk.create(name: "touch", kiosk_layout_id: kiosk_layout_test.id)
      }

      it "updates the requested slide" do
        slide = Slide.create! valid_attributes
        put :update, params: {id: slide.to_param, slide: new_attributes}
        slide.reload
        expect(slide.caption).to eq("test update caption")
        expect(slide.title).to eq("test update title")
        expect(slide.kiosk_ids).to eq([test_kiosk.id])
      end

      it "assigns the requested slide as @slide" do
        slide = Slide.create! valid_attributes
        put :update, params: {id: slide.to_param, slide: valid_attributes}
        expect(assigns(:slide)).to eq(slide)
      end

      it "redirects to the slide" do
        slide = Slide.create! valid_attributes
        put :update, params: {id: slide.to_param, slide: valid_attributes}
        expect(response).to redirect_to(slide)
      end
    end

    context "with invalid params" do
      it "assigns the slide as @slide" do
        slide = Slide.create! valid_attributes
        put :update, params: {id: slide.to_param, slide: invalid_attributes}
        expect(assigns(:slide)).to eq(slide)
      end

      it "re-renders the 'edit' template" do
        slide = Slide.create! valid_attributes
        put :update, params: {id: slide.to_param, slide: invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested slide" do
      slide = Slide.create! valid_attributes
      expect {
        delete :destroy, params: {id: slide.to_param}
      }.to change(Slide, :count).by(-1)
    end

    it "redirects to the slides list" do
      slide = Slide.create! valid_attributes
      delete :destroy, params: {id: slide.to_param}
      expect(response).to redirect_to(slides_url)
    end
  end

end
