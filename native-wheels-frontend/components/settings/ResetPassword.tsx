import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import StyledInput from '@/components/StyledInput';
import StyledButton from '@/components/StyledButton';
import { showErrorToast, showSuccessToast } from '@/components/toast';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/contexts/AuthContext';
import { resetPassword } from '@/axios/settings/api';
import { showInfoToast } from '@/components/toast';

export default function ResetPasswordScreen() {
  const { logout } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleLogout = async () => {
    logout();
    showInfoToast('Logged out', 'You have been successfully logged out.');
  };

  const validateInputs = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      showErrorToast('Validation Error', 'Please fill in all fields.');
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      showErrorToast('Validation Error', 'New passwords do not match.');
      return false;
    }
    return true;
  };

  const handlePasswordReset = async () => {
    if (!validateInputs()) return;

    try {
      await resetPassword(oldPassword, newPassword);
      showSuccessToast('Success', 'Password has been reset successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      showErrorToast(
        'Error',
        errorMessage || 'Failed to reset password. Please try again.'
      );
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Reset Password
      </ThemedText>

      <StyledInput
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <StyledInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <StyledInput
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />

      <View style={{ marginTop: 16 }}>
        <StyledButton
          title="Change Password"
          onPress={handlePasswordReset}
          icon={<MaterialIcons name="lock-reset" />}
          type="primary"
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <StyledButton
          title="Logout"
          onPress={handleLogout}
          type="secondary"
          icon={<MaterialIcons name="logout" />}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
