require 'test_helper'

class EstateTypesControllerTest < ActionController::TestCase
  setup do
    @estate_type = estate_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:estate_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create estate_type" do
    assert_difference('EstateType.count') do
      post :create, estate_type: {  }
    end

    assert_redirected_to estate_type_path(assigns(:estate_type))
  end

  test "should show estate_type" do
    get :show, id: @estate_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @estate_type
    assert_response :success
  end

  test "should update estate_type" do
    patch :update, id: @estate_type, estate_type: {  }
    assert_redirected_to estate_type_path(assigns(:estate_type))
  end

  test "should destroy estate_type" do
    assert_difference('EstateType.count', -1) do
      delete :destroy, id: @estate_type
    end

    assert_redirected_to estate_types_path
  end
end
