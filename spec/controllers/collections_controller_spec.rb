# frozen_string_literal:true

RSpec.describe CollectionsController, type: :controller do
  # This should return the minimal set of attributes required to create a valid
  # Collection. As you add validations to Collection, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) { { name: 'Impact' } }
  let(:invalid_attributes) { { name: '' } }
  let(:test_layout) { create(:kiosk_layout) }
  let(:user) { create(:admin_user) }
  let(:collection) { create(:collection) }

  before do
    sign_in(user) if user
  end

  describe 'GET #index' do
    before do
      get :index, params: {}
    end

    it { expect(assigns(:collections)).to eq([collection]) }
  end

  describe 'GET #show' do
    before do
      get :show, params: { id: collection.to_param }
    end

    it { expect(assigns(:collection)).to eq(collection) }
  end

  describe 'GET #new' do
    before do
      get :new, params: {}
    end

    it { expect(assigns(:collection)).to be_a_new(Collection) }

    context 'when not logged in' do
      let(:user) { nil }

      it { expect(flash[:alert]).to eq('You need to sign in or sign up before continuing.') }
      it { expect(response).to redirect_to user_session_path }
    end

    context 'when logged in as a user' do
      let(:user) { create(:user) }

      it { expect(flash[:alert]).to eq('You do not have sufficient permissions to view this page') }
      it { expect(response).to redirect_to root_path }
    end

    context 'when logged in as an admin' do
      it { expect(response).to be_success }
    end
  end

  describe 'GET #edit' do
    before do
      get :edit, params: { id: collection.to_param }
    end

    it { expect(assigns(:collection)).to eq(collection) }
  end

  describe 'POST #create' do
    context 'with valid params' do
      before do
        post :create, params: { collection: valid_attributes }
      end

      it { expect { post :create, params: { collection: valid_attributes } }.to change(Collection, :count).by(1) }
      it { expect(assigns(:collection)).to be_a(Collection) }
      it { expect(assigns(:collection)).to be_persisted }
      it { expect(response).to redirect_to(Collection.last) }
    end

    context 'with invalid params' do
      before do
        post :create, params: { collection: invalid_attributes }
      end

      it { expect(assigns(:collection)).to be_a_new(Collection) }
      it { expect(response).to render_template('new') }
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { name: 'Donors' } }
      let(:uploaded_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
      let(:test_kiosk) { create(:kiosk) }
      let(:uploaded_slide_valid_attributes) do
        {
          expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
          caption: 'test caption',
          title: 'test title',
          kiosk_ids: [test_kiosk.id],
          slide_type_id: create(:slide_type).id,
          collection_id: collection.id,
          image: uploaded_file
        }
      end
      let(:uploaded_slide) { create(:slide, uploaded_slide_valid_attributes) }
      let(:new_attributes_multiple_kiosks) do
        {
          name: 'my collection',
          slides_attributes: [
            { id: uploaded_slide.id, kiosk_ids: [test_kiosk.id] }
          ]
        }
      end
      let(:kiosk_slide) { create(:kiosk_slide, koisk: test_kiosk, slide: uploaded_slide) }

      context 'with new attributes' do
        before do
          put :update, params: { id: collection.to_param, collection: new_attributes }
          collection.reload
        end

        it { expect(collection.name).to eq('Donors') }
      end

      context 'with slides with multiple kiosks' do
        before do
          allow(collection).to receive(:slides).and_return([uploaded_slide])
          put :update, params: { id: collection.id, collection: new_attributes_multiple_kiosks }
          collection.reload
        end

        it { expect(collection.name).to eq('my collection') }
        it { expect(collection.slides.first.title).to eq('test title') }
        it { expect(collection.slides.first.kiosk_ids).to eq([test_kiosk.id]) }
      end

      context 'with slides with multiple kiosks uploading multiple files' do
        before do
          allow(collection).to receive(:slides).and_return([uploaded_slide])
          put :update, params: { id: collection.id, collection: new_attributes_multiple_kiosks, uploaded_files: [uploaded_slide.id], commit: 'Upload Slides' }
          collection.reload
        end

        it { expect(collection.name).to eq('my collection') }
        it { expect(collection.slides.first.title).to eq('test title') }
        it { expect(collection.slides.first.kiosk_ids).to eq([test_kiosk.id]) }
      end

      context 'with files in new slides so that they belong to the selected collection' do
        before do
          put :update, params: { id: collection.to_param, collection: new_attributes, uploaded_files: [uploaded_slide.id], commit: 'Upload Slides' }
          collection.reload
        end

        it { expect(collection.name).to eq('Donors') }
      end

      context 'with valid parameters' do
        before do
          put :update, params: { id: collection.to_param, collection: valid_attributes }
        end

        it { expect(assigns(:collection)).to eq(collection) }
        it { expect(response).to redirect_to(collection) }
      end
    end

    context 'with invalid params' do
      before do
        put :update, params: { id: collection.to_param, collection: invalid_attributes }
      end

      it { expect(assigns(:collection)).to eq(collection) }
      it { expect(response).to render_template('edit') }
    end
  end

  describe 'DELETE #destroy' do
    before do
      collection
    end

    it { expect { delete :destroy, params: { id: collection.to_param } }.to change(Collection, :count).by(-1) }

    it 'redirects to the collections list' do
      delete :destroy, params: { id: collection.to_param }
      expect(response).to redirect_to(collections_url)
    end
  end
end
