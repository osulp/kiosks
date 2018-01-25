require 'rails_helper'

RSpec.describe KioskLayoutsController, type: :controller do

  let(:valid_attributes) {
    { name: "touch" }
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

  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all kiosk_layouts as @kiosk_layouts" do
      kiosk_layout = KioskLayout.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(assigns(:kiosk_layouts)).to eq([kiosk_layout])
    end
  end

  describe "GET #show" do
    it "assigns the requested kiosk_layout as @kiosk_layout" do
      kiosk_layout = KioskLayout.create! valid_attributes
      get :show, params: {id: kiosk_layout.to_param}, session: valid_session
      expect(assigns(:kiosk_layout)).to eq(kiosk_layout)
    end
  end

  describe "GET #new" do
    it "assigns a new kiosk_layout as @kiosk_layout" do
      get :new, params: {}, session: valid_session
      expect(assigns(:kiosk_layout)).to be_a_new(KioskLayout)
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
    it "assigns the requested kiosk_layout as @kiosk_layout" do
      kiosk_layout = KioskLayout.create! valid_attributes
      get :edit, params: {id: kiosk_layout.to_param}, session: valid_session
      expect(assigns(:kiosk_layout)).to eq(kiosk_layout)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new KioskLayout" do
        expect {
          post :create, params: {kiosk_layout: valid_attributes}, session: valid_session
        }.to change(KioskLayout, :count).by(1)
      end

      it "assigns a newly created kiosk_layout as @kiosk_layout" do
        post :create, params: {kiosk_layout: valid_attributes}, session: valid_session
        expect(assigns(:kiosk_layout)).to be_a(KioskLayout)
        expect(assigns(:kiosk_layout)).to be_persisted
      end

      it "redirects to the created kiosk_layout" do
        post :create, params: {kiosk_layout: valid_attributes}, session: valid_session
        expect(response).to redirect_to(KioskLayout.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved kiosk_layout as @kiosk_layout" do
        post :create, params: {kiosk_layout: invalid_attributes}, session: valid_session
        expect(assigns(:kiosk_layout)).to be_a_new(KioskLayout)
      end

      it "re-renders the 'new' template" do
        post :create, params: {kiosk_layout: invalid_attributes}, session: valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { name: "touch" }
      }

      it "updates the requested kiosk_layout" do
        kiosk_layout = KioskLayout.create! valid_attributes
        put :update, params: {id: kiosk_layout.to_param, kiosk_layout: new_attributes}, session: valid_session
        kiosk_layout.reload
        expect(kiosk_layout.name).to eq("touch")
      end

      it "assigns the requested kiosk_layout as @kiosk_layout" do
        kiosk_layout = KioskLayout.create! valid_attributes
        put :update, params: {id: kiosk_layout.to_param, kiosk_layout: valid_attributes}, session: valid_session
        expect(assigns(:kiosk_layout)).to eq(kiosk_layout)
      end

      it "redirects to the kiosk_layout" do
        kiosk_layout = KioskLayout.create! valid_attributes
        put :update, params: {id: kiosk_layout.to_param, kiosk_layout: valid_attributes}, session: valid_session
        expect(response).to redirect_to(kiosk_layout)
      end
    end

    context "with invalid params" do
      it "assigns the kiosk_layout as @kiosk_layout" do
        kiosk_layout = KioskLayout.create! valid_attributes
        put :update, params: {id: kiosk_layout.to_param, kiosk_layout: invalid_attributes}, session: valid_session
        expect(assigns(:kiosk_layout)).to eq(kiosk_layout)
      end

      it "re-renders the 'edit' template" do
        kiosk_layout = KioskLayout.create! valid_attributes
        put :update, params: {id: kiosk_layout.to_param, kiosk_layout: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

end
