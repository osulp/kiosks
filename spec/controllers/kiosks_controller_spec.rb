require 'rails_helper'

RSpec.describe KiosksController, type: :controller do
  # This should return the minimal set of attributes required to create a valid
  # Kiosk. As you add validations to Kiosk, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    { name: "donor" }
  }

  let(:invalid_attributes) {
    { name: "" }
  }

  let(:user) do
    User.create(
      :email => 'user@example.com',
      :password => 'admin123123',
      :password_confirmation => 'admin123123',
      :admin => true
    )
  end
  before do
    sign_in(user) if user
  end

  describe "GET #index" do
    it "assigns all kiosks as @kiosks" do
      kiosk = Kiosk.create! valid_attributes
      get :index, params: {}
      expect(assigns(:kiosks)).to eq([kiosk])
    end
  end

  describe "GET #show" do
    it "assigns the requested kiosk as @kiosk" do
      kiosk = Kiosk.create! valid_attributes
      get :show, params: {id: kiosk.to_param}
      expect(assigns(:kiosk)).to eq(kiosk)
    end
  end

  describe "GET #new" do
    it "assigns a new kiosk as @kiosk" do
      get :new, params: {}
      expect(assigns(:kiosk)).to be_a_new(Kiosk)
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
        expect(response).to redirect_to kiosks_path
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
    it "assigns the requested kiosk as @kiosk" do
      kiosk = Kiosk.create! valid_attributes
      get :edit, params: {id: kiosk.to_param}
      expect(assigns(:kiosk)).to eq(kiosk)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Kiosk" do
        expect {
          post :create, params: {kiosk: valid_attributes}
        }.to change(Kiosk, :count).by(1)
      end

      it "assigns a newly created kiosk as @kiosk" do
        post :create, params: {kiosk: valid_attributes}
        expect(assigns(:kiosk)).to be_a(Kiosk)
        expect(assigns(:kiosk)).to be_persisted
      end

      it "redirects to the created kiosk" do
        post :create, params: {kiosk: valid_attributes}
        expect(response).to redirect_to(Kiosk.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved kiosk as @kiosk" do
        post :create, params: {kiosk: invalid_attributes}
        expect(assigns(:kiosk)).to be_a_new(Kiosk)
      end

      it "re-renders the 'new' template" do
        post :create, params: {kiosk: invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { name: "scarc" }
      }

      it "updates the requested kiosk" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: {id: kiosk.to_param, kiosk: new_attributes}
        kiosk.reload
        expect(kiosk.name).to eq("scarc")
      end

      it "assigns the requested kiosk as @kiosk" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: {id: kiosk.to_param, kiosk: valid_attributes}
        expect(assigns(:kiosk)).to eq(kiosk)
      end

      it "redirects to the kiosk" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: {id: kiosk.to_param, kiosk: valid_attributes}
        expect(response).to redirect_to(kiosk)
      end
    end

    context "with invalid params" do
      it "assigns the kiosk as @kiosk" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: {id: kiosk.to_param, kiosk: invalid_attributes}
        expect(assigns(:kiosk)).to eq(kiosk)
      end

      it "re-renders the 'edit' template" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: {id: kiosk.to_param, kiosk: invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end
end
