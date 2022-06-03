import MyButton from "@/components/MyCustoms/MyButton";
import MyModal from "@/components/MyCustoms/MyModal";
import ChangeNameDesBirth from "@/components/MyProfile/EditProfile/ChangeNameDesBirth";
import ChangePassword from "@/components/MyProfile/EditProfile/ChangePassword";
import LogoutUser from "@/components/MyProfile/EditProfile/LogoutUser";
import RemoveAccount from "@/components/MyProfile/EditProfile/RemoveAccount";
import VerifyEmail from "@/components/MyProfile/EditProfile/VerifyEmail";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

interface EditProfileScreenProps {
  route: {
    params: {
      shownChgNameDesBirth: boolean;
    };
  };
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ route }) => {
  const [visibleChangeNameDesBirthModal, setVisibleChangeNameDesBirthModal] =
    useState(route.params.shownChgNameDesBirth);
  const [visibleChangePasswordModal, setVisibleChangePasswordModal] =
    useState(false);
  const [visibleVerifyEmailModal, setVisibleVerifyEmailModal] = useState(false);
  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false);
  const [visibleRemoveAccountModal, setVisibleRemoveAccountModal] =
    useState(false);

  const showChangeNameDesBirthModal = () =>
    setVisibleChangeNameDesBirthModal(true);
  const showChangePasswordModal = () => setVisibleChangePasswordModal(true);
  const showVerifyEmailModal = () => setVisibleVerifyEmailModal(true);
  const showLogoutModal = () => setVisibleLogoutModal(true);
  const showRemoveAccountModal = () => setVisibleRemoveAccountModal(true);
  const hideChangeNameDesBirthModal = () =>
    setVisibleChangeNameDesBirthModal(false);
  const hideChangePasswordModal = () => setVisibleChangePasswordModal(false);
  const hideVerifyEmailModal = () => setVisibleVerifyEmailModal(false);
  const hideLogoutModal = () => setVisibleLogoutModal(false);
  const hideRemoveAccountModal = () => setVisibleRemoveAccountModal(false);

  return (
    <KeyboardAvoidingView style={[styles.container]} behavior="height">
      <MyButton
        text="Change name/description/date of birth"
        iconName=""
        onPress={showChangeNameDesBirthModal}
        bgcolor="#35524a"
      />
      <MyButton
        text="Change password"
        iconName=""
        onPress={showChangePasswordModal}
        bgcolor="#466441"
      />
      <MyButton
        text="Verify email/recaptcha"
        iconName=""
        onPress={showVerifyEmailModal}
        bgcolor="#96967d"
      />
      <MyButton
        text="Logout"
        iconName=""
        onPress={showLogoutModal}
        bgcolor="#b86450"
      />
      <MyButton
        text="Remove account"
        iconName=""
        onPress={showRemoveAccountModal}
        bgcolor="#ef5350"
      />
      <MyModal
        visible={visibleChangeNameDesBirthModal}
        showModal={showChangeNameDesBirthModal}
        hideModal={hideChangeNameDesBirthModal}
        children={
          <ChangeNameDesBirth hideModal={hideChangeNameDesBirthModal} />
        }
      />
      <MyModal
        visible={visibleChangePasswordModal}
        showModal={showChangePasswordModal}
        hideModal={hideChangePasswordModal}
        children={<ChangePassword hideModal={hideChangePasswordModal} />}
      />
      <MyModal
        visible={visibleVerifyEmailModal}
        showModal={showVerifyEmailModal}
        hideModal={hideVerifyEmailModal}
        children={<VerifyEmail hideModal={hideVerifyEmailModal} />}
      />
      <MyModal
        visible={visibleLogoutModal}
        showModal={showLogoutModal}
        hideModal={hideLogoutModal}
        children={<LogoutUser hideModal={hideLogoutModal} />}
      />
      <MyModal
        visible={visibleRemoveAccountModal}
        showModal={showRemoveAccountModal}
        hideModal={hideRemoveAccountModal}
        children={<RemoveAccount hideModal={hideRemoveAccountModal} />}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default EditProfileScreen;
