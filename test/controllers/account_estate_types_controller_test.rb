require 'test_helper'

class AccountEstateTypesControllerTest < ActionController::TestCase
  setup do
    @account_estate_type = account_estate_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:account_estate_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create account_estate_type" do
    assert_difference('AccountEstateType.count') do
      post :create, account_estate_type: {  }
    end

    assert_redirected_to account_estate_type_path(assigns(:account_estate_type))
  end

  test "should show account_estate_type" do
    get :show, id: @account_estate_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @account_estate_type
    assert_response :success
  end

  test "should update account_estate_type" do
    patch :update, id: @account_estate_type, account_estate_type: {  }
    assert_redirected_to account_estate_type_path(assigns(:account_estate_type))
  end

  test "should destroy account_estate_type" do
    assert_difference('AccountEstateType.count', -1) do
      delete :destroy, id: @account_estate_type
    end

    assert_redirected_to account_estate_types_path
  end
end
