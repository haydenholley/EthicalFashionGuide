import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BrandInfoDialogue = ({ visible, onClose, data }) => {
  if (!data) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>{data.name}</Text>
          <Text style={styles.dialogContent}>{data.statement}</Text>

          <Text style={styles.spotlight_issue_category}>Trace Raw Materials</Text>
          <Text style={styles.dialogContent}>{data.grade_policies}</Text>

          <Text style={styles.spotlight_issue_category}>Pay Living Wage</Text>
          <Text style={styles.dialogContent}>{data.grade_wage}</Text>

          <Text style={styles.spotlight_issue_category}>Listen to Workers</Text>
          <Text style={styles.dialogContent}>{data.grade_rights}</Text>

          <Text style={styles.spotlight_issue_category}>Remediate Exploitation</Text>
          <Text style={styles.dialogContent}>{data.grade_workers}</Text>

          <Text style={styles.spotlight_issue_category}>Use Sustainable Fibres</Text>
          <Text style={styles.dialogContent}>{data.grade_environment}</Text>

          <Text style={styles.spotlight_issue_category}>Climate Commitment</Text>
          <Text style={styles.dialogContent}>{data.grade_climate}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  spotlight_issue_category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BrandInfoDialogue;
