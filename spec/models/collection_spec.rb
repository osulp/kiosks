require 'rails_helper'

RSpec.describe Collection, type: :model do
  it "is valid with valid attributes" do
    expect(Collection.new(name: "test")).to be_valid
  end
  it "is not valid without a title" do
    collection = Collection.new(name: nil)
    expect(collection).to_not be_valid
  end

end
