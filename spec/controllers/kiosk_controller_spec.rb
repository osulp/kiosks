require 'rails_helper'

RSpec.describe KioskController, type: :controller do
  # This should return the minimal set of attributes required to create a valid
  # Kiosk. As you add validations to Kiosk, be sure to
  # adjust the attributes here as well.

  let (:test_layout) { KioskLayout.create!(:name => "touch") }

  let(:restart_kiosk_at) {
    DateTime.tomorrow
  }

  let(:valid_attributes) {
    {
        name: "donor",
        kiosk_layout_id: test_layout.id,
        map_default_floor_number: 2,
        restart_at: restart_kiosk_at,
        restart_at_active: true
    }
  }

  let(:user) do
    User.create(
      :email => 'user@example.com',
      :admin => true
    )
  end

  let(:kiosk2_valid_attributes) {
    {
        name: "testtouch",
        kiosk_layout_id: test_layout.id,
        map_default_floor_number: 2,
        restart_at: Time.zone.parse("2018-01-17 07:30:00"),
        restart_at_active: true
    }
  }

  let(:kiosk2) {
    k = Kiosk.new(kiosk2_valid_attributes)
    k.save(validate: false)
    k
  }

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
      get :show, params: {id: kiosk.name}
      expect(assigns(:kiosk)).to eq(kiosk)
    end

    it "assigns the requested kiosk (it should restart now) as @kiosk" do
      now = Time.zone.parse("2018-01-17 07:30:10")
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      get :show, params: {id: kiosk2.name}
      expect(assigns(:kiosk)).to eq(kiosk2)
    end
  end
end
