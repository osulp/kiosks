require 'rails_helper'

RSpec.describe CollectionsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Collection. As you add validations to Collection, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    { name: "Impact" }
  }

  let(:invalid_attributes) {
    { name: "" }
  }

  let(:uploaded_files_attributes) {
    { name: "my collection"}
  }

  let(:user) do
    User.create(
      :email => 'user@example.com',
      :password => 'admin123',
      :password_confirmation => 'admin123',
      :admin => true
    )
  end
  before do
    sign_in(user) if user
  end

  describe "GET #index" do
    it "assigns all collections as @collections" do
      collection = Collection.create! valid_attributes
      get :index, params: {}
      expect(assigns(:collections)).to eq([collection])
    end
  end

  describe "GET #show" do
    it "assigns the requested collection as @collection" do
      collection = Collection.create! valid_attributes
      get :show, params: {id: collection.to_param}
      expect(assigns(:collection)).to eq(collection)
    end
  end

  describe "GET #new" do
    it "assigns a new collection as @collection" do
      get :new, params: {}
      expect(assigns(:collection)).to be_a_new(Collection)
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
          :password => 'admin123',
          :password_confirmation => 'admin123'
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
          :password => 'admin123',
          :password_confirmation => 'admin123',
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
    it "assigns the requested collection as @collection" do
      collection = Collection.create! valid_attributes
      get :edit, params: {id: collection.to_param}
      expect(assigns(:collection)).to eq(collection)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Collection" do
        expect {
          post :create, params: {collection: valid_attributes}
        }.to change(Collection, :count).by(1)
      end

      it "assigns a newly created collection as @collection" do
        post :create, params: {collection: valid_attributes}
        expect(assigns(:collection)).to be_a(Collection)
        expect(assigns(:collection)).to be_persisted
      end

      it "redirects to the created collection" do
        post :create, params: {collection: valid_attributes}
        expect(response).to redirect_to(Collection.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved collection as @collection" do
        post :create, params: {collection: invalid_attributes}
        expect(assigns(:collection)).to be_a_new(Collection)
      end

      it "re-renders the 'new' template" do
        post :create, params: {collection: invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { name: "Donors" }
      }

      let(:uploaded_file) {
        Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
      }

      let(:uploaded_slide_valid_attributes) {
        {
          expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
          caption: "test caption",
          title: "test title",
          slide_type_id: SlideType.create(name: "Basic").id,
          kiosk_id: Kiosk.create(name: "touch").id,
          collection_id: Collection.create(name: "generic").id,
          image: uploaded_file
        }
      }

      let(:uploaded_slide) {
        Slide.create! uploaded_slide_valid_attributes
      }

      it "updates the requested collection" do
        collection = Collection.create! valid_attributes
        put :update, params: {id: collection.to_param, collection: new_attributes}
        collection.reload
        expect(collection.name).to eq("Donors")
      end

      it "updates uploaded files in new slides so that they belong to the selected collection" do
        collection = Collection.create! valid_attributes
        # uploaded_slide.reload
        put :update, params: {id: collection.to_param, collection: new_attributes, uploaded_files: [uploaded_slide.id], commit: "Upload Slides"}
        collection.reload
        expect(collection.name).to eq("Donors")
      end

      it "assigns the requested collection as @collection" do
        collection = Collection.create! valid_attributes
        put :update, params: {id: collection.to_param, collection: valid_attributes}
        expect(assigns(:collection)).to eq(collection)
      end

      it "redirects to the collection" do
        collection = Collection.create! valid_attributes
        put :update, params: {id: collection.to_param, collection: valid_attributes}
        expect(response).to redirect_to(collection)
      end
    end

    context "with invalid params" do
      it "assigns the collection as @collection" do
        collection = Collection.create! valid_attributes
        put :update, params: {id: collection.to_param, collection: invalid_attributes}
        expect(assigns(:collection)).to eq(collection)
      end

      it "re-renders the 'edit' template" do
        collection = Collection.create! valid_attributes
        put :update, params: {id: collection.to_param, collection: invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested collection" do
      collection = Collection.create! valid_attributes
      expect {
        delete :destroy, params: {id: collection.to_param}
      }.to change(Collection, :count).by(-1)
    end

    it "redirects to the collections list" do
      collection = Collection.create! valid_attributes
      delete :destroy, params: {id: collection.to_param}
      expect(response).to redirect_to(collections_url)
    end
  end

end


