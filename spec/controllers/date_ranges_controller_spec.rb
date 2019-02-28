# frozen_string_literal: true

RSpec.describe DateRangesController, type: :controller do
  let(:slide_type_test) { SlideType.create(name: 'Basic') }
  let(:kiosk_test) { Kiosk.create(name: 'touch') }
  let(:collection_test) { Collection.create(name: 'generic') }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
  let(:valid_slide_attributes) do
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: 'test caption', title: 'test title',
      slide_type_id: slide_type_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  end
  let(:valid_slide) { Slide.create! valid_slide_attributes }
  let(:valid_attributes) do
    {
      start_date: Time.utc(2015, 1, 1, 12, 0, 0),
      end_date: Time.utc(2015, 1, 1, 12, 0, 0),
      slide_id: valid_slide.id
    }
  end
  let(:invalid_attributes) do
    { slide_id: '' }
  end
  let(:user) do
    User.create(
      email: 'user@example.com',
      admin: true
    )
  end

  before do
    sign_in(user) if user
  end

  describe 'GET #index' do
    it 'assigns all date_ranges as @date_ranges' do
      date_range = DateRange.create! valid_attributes
      get :index, params: {}
      expect(assigns(:date_ranges)).to eq([date_range])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested date_range as @date_range' do
      date_range = DateRange.create! valid_attributes
      get :show, params: { id: date_range.to_param }
      expect(assigns(:date_range)).to eq(date_range)
    end
  end

  describe 'GET #new' do
    it 'assigns a new date_range as @date_range' do
      get :new, params: {}
      expect(assigns(:date_range)).to be_a_new(DateRange)
    end

    context 'when not logged in' do
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

    context 'when logged in as a user' do
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

    context 'when logged in as an admin' do
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
    it 'assigns the requested date_range as @date_range' do
      date_range = DateRange.create! valid_attributes
      get :edit, params: { id: date_range.to_param }
      expect(assigns(:date_range)).to eq(date_range)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new DateRange' do
        expect do
          post :create, params: { date_range: valid_attributes }
        end.to change(DateRange, :count).by(1)
      end

      it 'assigns a newly created date_range as @date_range' do
        post :create, params: { date_range: valid_attributes }
        expect(assigns(:date_range)).to be_a(DateRange)
        expect(assigns(:date_range)).to be_persisted
      end

      it 'redirects to the created date_range' do
        post :create, params: { date_range: valid_attributes }
        expect(response).to redirect_to(DateRange.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved date_range as @date_range' do
        post :create, params: { date_range: invalid_attributes }
        expect(assigns(:date_range)).to be_a_new(DateRange)
      end

      it "re-renders the 'new' template" do
        post :create, params: { date_range: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_start_date) { Time.utc(2016, 1, 1, 12, 0, 0) }
      let(:new_end_date) { Time.utc(2016, 1, 1, 12, 0, 0) }
      let(:new_attributes) do
        {
          start_date: new_start_date,
          end_date: new_end_date
        }
      end

      it 'updates the requested date_range' do
        date_range = DateRange.create! valid_attributes
        put :update, params: { id: date_range.to_param, date_range: new_attributes }
        date_range.reload
        expect(date_range.start_date).to eq new_start_date
        expect(date_range.end_date).to eq new_end_date
      end

      it 'assigns the requested date_range as @date_range' do
        date_range = DateRange.create! valid_attributes
        put :update, params: { id: date_range.to_param, date_range: valid_attributes }
        expect(assigns(:date_range)).to eq(date_range)
      end

      it 'redirects to the date_range' do
        date_range = DateRange.create! valid_attributes
        put :update, params: { id: date_range.to_param, date_range: valid_attributes }
        expect(response).to redirect_to(date_range)
      end
    end

    context 'with invalid params' do
      it 'assigns the date_range as @date_range' do
        date_range = DateRange.create! valid_attributes
        put :update, params: { id: date_range.to_param, date_range: invalid_attributes }
        expect(assigns(:date_range)).to eq(date_range)
      end

      it "re-renders the 'edit' template" do
        date_range = DateRange.create! valid_attributes
        put :update, params: { id: date_range.to_param, date_range: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested date_range' do
      date_range = DateRange.create! valid_attributes
      expect do
        delete :destroy, params: { id: date_range.to_param }
      end.to change(DateRange, :count).by(-1)
    end

    it 'redirects to the date_ranges list' do
      date_range = DateRange.create! valid_attributes
      delete :destroy, params: { id: date_range.to_param }
      expect(response).to redirect_to(date_ranges_url)
    end
  end
end
