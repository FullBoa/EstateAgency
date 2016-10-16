require 'test_helper'

class EstateRevisionsControllerTest < ActionController::TestCase
  setup do
    @estate_revision = estate_revisions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:estate_revisions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create estate_revision" do
    assert_difference('EstateRevision.count') do
      post :create, estate_revision: {  }
    end

    assert_redirected_to estate_revision_path(assigns(:estate_revision))
  end

  test "should show estate_revision" do
    get :show, id: @estate_revision
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @estate_revision
    assert_response :success
  end

  test "should update estate_revision" do
    patch :update, id: @estate_revision, estate_revision: {  }
    assert_redirected_to estate_revision_path(assigns(:estate_revision))
  end

  test "should destroy estate_revision" do
    assert_difference('EstateRevision.count', -1) do
      delete :destroy, id: @estate_revision
    end

    assert_redirected_to estate_revisions_path
  end
end
