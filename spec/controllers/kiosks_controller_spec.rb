# frozen_string_literal: true

RSpec.describe KiosksController, type: :controller do
  let(:test_layout) { KioskLayout.create!(name: 'touch') }

  let(:valid_attributes) do
    { name: 'donor', kiosk_layout_id: test_layout.id, map_default_floor_number: 2 }
  end

  let(:invalid_attributes) do
    { name: '', kiosk_layout_id: nil }
  end

  let(:user) do
    User.create(
      email: 'user@example.com',
      admin: true
    )
  end

  let(:kiosk1_valid_attributes) do
    { name: 'kiosk1', kiosk_layout_id: test_layout.id, map_default_floor_number: 2 }
  end

  let(:kiosk2_valid_attributes) do
    { name: 'kiosk2', kiosk_layout_id: test_layout.id, map_default_floor_number: 2 }
  end

  let(:kiosk1) do
    Kiosk.create! kiosk1_valid_attributes
  end

  let(:kiosk2) do
    Kiosk.create! kiosk2_valid_attributes
  end

  let(:kiosk_ids) do
    [kiosk1.id, kiosk2.id]
  end

  before do
    sign_in(user) if user
  end

  describe 'GET #index' do
    it 'assigns all kiosks as @kiosks' do
      kiosk = Kiosk.create! valid_attributes
      get :index, params: {}
      expect(assigns(:kiosks)).to eq([kiosk])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested kiosk as @kiosk' do
      kiosk = Kiosk.create! valid_attributes
      get :show, params: { id: kiosk.to_param }
      expect(assigns(:kiosk)).to eq(kiosk)
    end
  end

  describe 'GET #new' do
    it 'assigns a new kiosk as @kiosk' do
      get :new, params: {}
      expect(assigns(:kiosk)).to be_a_new(Kiosk)
    end

    context 'When not logged in' do
      let(:user) { nil }

      it 'displays an insufficient permissions error' do
        get :new, params: {}
        expect(flash[:alert]).to eq('You need to sign in or sign up before continuing.')
      end
      it 'redirects' do
        get :new, params: {}
        expect(response).to redirect_to user_session_path
      end
    end

    context 'When logged in as a user' do
      let(:user) do
        User.create(
          email: 'user@example.com'
        )
      end

      it 'displays an insufficient permissions error' do
        get :new, params: {}
        expect(flash[:alert]).to eq('You do not have sufficient permissions to view this page')
      end
      it 'redirects' do
        get :new, params: {}
        expect(response).to redirect_to root_path
      end
    end

    context 'When logged in as an admin' do
      let(:user) do
        User.create(
          email: 'user@example.com',
          admin: true
        )
      end

      it 'displays the admin panel' do
        get :new, params: {}
        expect(response).to be_success
      end
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested kiosk as @kiosk' do
      kiosk = Kiosk.create! valid_attributes
      get :edit, params: { id: kiosk.to_param }
      expect(assigns(:kiosk)).to eq(kiosk)
    end
  end

  describe 'GET #edit_multiple' do
    let(:restart_kiosk_at) do
      DateTime.now
    end
    let(:new_attributes) do
      {
        restart_at: restart_kiosk_at,
        restart_at_active: true
      }
    end
    let(:kiosks) do
      [kiosk1, kiosk2]
    end

    it 'assigns the requested kiosks as @kiosks' do
      get :edit_multiple, params: { kiosk_ids: kiosk_ids, kiosk: new_attributes }
      expect(assigns(:kiosks)).to eq(kiosks)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Kiosk' do
        expect do
          post :create, params: { kiosk: valid_attributes }
        end.to change(Kiosk, :count).by(1)
      end

      it 'assigns a newly created kiosk as @kiosk' do
        post :create, params: { kiosk: valid_attributes }
        expect(assigns(:kiosk)).to be_a(Kiosk)
        expect(assigns(:kiosk)).to be_persisted
      end

      it 'redirects to the created kiosk' do
        post :create, params: { kiosk: valid_attributes }
        expect(response).to redirect_to(Kiosk.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved kiosk as @kiosk' do
        post :create, params: { kiosk: invalid_attributes }
        expect(assigns(:kiosk)).to be_a_new(Kiosk)
      end

      it "re-renders the 'new' template" do
        post :create, params: { kiosk: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        { name: 'scarc', map_default_floor_number: 14 }
      end

      it 'updates the requested kiosk' do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: { id: kiosk.to_param, kiosk: new_attributes }
        kiosk.reload
        expect(kiosk.name).to eq('scarc')
        expect(kiosk.map_default_floor_number).to eq(14)
      end

      it 'assigns the requested kiosk as @kiosk' do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: { id: kiosk.to_param, kiosk: valid_attributes }
        expect(assigns(:kiosk)).to eq(kiosk)
      end

      it 'redirects to the kiosk' do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: { id: kiosk.to_param, kiosk: valid_attributes }
        expect(response).to redirect_to(kiosk)
      end
    end

    context 'with invalid params' do
      it 'assigns the kiosk as @kiosk' do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: { id: kiosk.to_param, kiosk: invalid_attributes }
        expect(assigns(:kiosk)).to eq(kiosk)
      end

      it "re-renders the 'edit' template" do
        kiosk = Kiosk.create! valid_attributes
        put :update, params: { id: kiosk.to_param, kiosk: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'PUT #update_multiple' do
    context 'with valid params' do
      let(:restart_kiosk_at) do
        DateTime.tomorrow
      end
      let(:new_attributes) do
        {
          restart_at: restart_kiosk_at,
          restart_at_active: true
        }
      end

      it 'updates the requested kiosks' do
        put :update_multiple, params: { kiosk_ids: kiosk_ids, kiosk: new_attributes }
        kiosk1.reload
        kiosk2.reload
        # check kiosk1
        expect(kiosk1.restart_at_active).to eq(true)
        expect(Time.zone.local(kiosk1.restart_at.to_s)).to eq(Time.zone.local(restart_kiosk_at.to_s))
        # check kiosk2
        expect(kiosk2.restart_at_active).to eq(true)
        expect(Time.zone.local(kiosk2.restart_at.to_s)).to eq(Time.zone.local(restart_kiosk_at.to_s))
      end

      it 'redirects to the kiosks page' do
        put :update_multiple, params: { kiosk_ids: kiosk_ids, kiosk: new_attributes }
        expect(response).to redirect_to(kiosks_url)
      end
    end

    context 'with invalid params' do
      let(:restart_kiosk_at) do
        DateTime.yesterday
      end
      let(:new_attributes) do
        {
          restart_at: restart_kiosk_at,
          restart_at_active: true
        }
      end

      let(:kiosk1_valid_attributes) do
        { name: 'kiosk1', kiosk_layout_id: test_layout.id }
      end

      let(:kiosk2_valid_attributes) do
        { name: 'kiosk2', kiosk_layout_id: test_layout.id }
      end

      let(:kiosk1) do
        Kiosk.create! kiosk1_valid_attributes
      end

      let(:kiosk2) do
        Kiosk.create! kiosk2_valid_attributes
      end

      let(:kiosk_ids) do
        [kiosk1.id, kiosk2.id]
      end

      it "re-renders the 'edit' template" do
        put :update_multiple, params: { kiosk_ids: kiosk_ids, kiosk: new_attributes }
        expect(response).to render_template('edit_multiple')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested slide' do
      kiosk = Kiosk.create! valid_attributes
      expect do
        delete :destroy, params: { id: kiosk.to_param }
      end.to change(Kiosk, :count).by(-1)
    end

    it 'redirects to the slides list' do
      kiosk = Kiosk.create! valid_attributes
      delete :destroy, params: { id: kiosk.to_param }
      expect(response).to redirect_to(kiosks_url)
    end
  end
end
